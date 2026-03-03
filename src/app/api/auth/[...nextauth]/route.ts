import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { rateLimiter } from "@/lib/rate-limit";
import { headers } from "next/headers";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Apply IP Rate Limiting for Login attempts
                const headersList = await headers();
                const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

                try {
                    const { success } = await rateLimiter.limit(`login_${ip}`);
                    if (!success) {
                        return null; // Reject authorization
                    }
                } catch (error) {
                    console.error("Rate Limiter Error:", error);
                }

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Check Environment Variable Bypass First (ONLY IN DEVELOPMENT)
                if (process.env.NODE_ENV === "development") {
                    if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
                        return {
                            id: "admin-bypass-id",
                            name: "Admin",
                            email: credentials.email,
                            role: "admin"
                        };
                    }
                }

                // Normal Database Login
                await dbConnect();
                const user = await User.findOne({ email: credentials.email }).select("+password");

                if (!user) {
                    return null; // Invalid email
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) {
                    return null; // Invalid password
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };
