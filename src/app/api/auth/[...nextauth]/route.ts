import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import rateLimit from "@/lib/rate-limit";
import { headers } from "next/headers";

const limiter = rateLimit({
    interval: 5 * 60 * 1000, // 5 minutes
    uniqueTokenPerInterval: 500, // Max 500 users per 5 minutes
});

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
                    await limiter.check(5, ip); // 5 login attempts per 5 minutes
                } catch {
                    throw new Error("Too many login attempts. Please try again later.");
                }

                await dbConnect();
                if (!credentials?.email || !credentials?.password) return null;

                // This is a bypass for development, or we can check the db
                if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
                    return { id: "1", name: "Admin", email: credentials.email, role: "admin" };
                }

                const user = await User.findOne({ email: credentials.email }).select("+password");
                if (!user) return null;

                const isMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isMatch) return null;

                return { id: user._id.toString(), email: user.email, role: user.role };
            }
        })
    ],
    session: {
        strategy: "jwt",
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
