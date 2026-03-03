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
                console.log(`[AUTH_DEBUG] Attempt from IP: ${ip}`);

                try {
                    const { success, limit, remaining } = await rateLimiter.limit(`login_${ip}`);
                    console.log(`[AUTH_DEBUG] Rate Limiter - success: ${success}, limit: ${limit}, remaining: ${remaining}`);
                    if (!success) {
                        console.warn(`[AUTH_DEBUG] Rate limit exceeded for IP: ${ip}`);
                        return null; // Reject authorization
                    }
                } catch (error) {
                    console.error("[AUTH_DEBUG] Rate Limiter Error:", error);
                }

                if (!credentials?.email || !credentials?.password) {
                    console.warn("[AUTH_DEBUG] Missing credentials");
                    return null;
                }

                console.log(`[AUTH_DEBUG] Login attempt for email: ${credentials.email}`);
                console.log(`[AUTH_DEBUG] NODE_ENV: ${process.env.NODE_ENV}`);

                // Check Environment Variable Bypass First (ONLY IN DEVELOPMENT)
                if (process.env.NODE_ENV === "development") {
                    const envEmail = process.env.ADMIN_EMAIL;
                    const envPass = process.env.ADMIN_PASSWORD;
                    console.log(`[AUTH_DEBUG] Checking DEV bypass for ${credentials.email}`);

                    if (credentials.email === envEmail && credentials.password === envPass) {
                        console.log("[AUTH_DEBUG] DEV bypass success!");
                        return {
                            id: "admin-bypass-id",
                            name: "Admin",
                            email: credentials.email,
                            role: "admin"
                        };
                    } else {
                        console.log("[AUTH_DEBUG] DEV bypass failed (mismatch or missing env vars)");
                    }
                }

                // Normal Database Login
                console.log("[AUTH_DEBUG] Attempting DB connection...");
                await dbConnect();
                console.log("[AUTH_DEBUG] DB connected, searching for user...");
                const user = await User.findOne({ email: credentials.email }).select("+password");

                if (!user) {
                    console.warn(`[AUTH_DEBUG] User not found: ${credentials.email}`);
                    return null; // Invalid email
                }

                console.log("[AUTH_DEBUG] User found, comparing passwords...");
                const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) {
                    console.warn("[AUTH_DEBUG] Password mismatch");
                    return null; // Invalid password
                }

                console.log("[AUTH_DEBUG] DB Login Success!");
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
