import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { getServerSession } from "next-auth/next";
import { leadSchema } from "@/lib/validations/lead";
import rateLimit from "@/lib/rate-limit";

const limiter = rateLimit({
    interval: 60000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function POST(req: Request) {
    try {
        // Apply IP Rate Limiting
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        try {
            await limiter.check(5, ip); // 5 requests per minute per IP
        } catch {
            return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
        }

        await dbConnect();
        const body = await req.json();

        // Validate and sanitize input with Zod
        const result = leadSchema.safeParse(body);
        if (!result.success) {
            // Return a graceful 400 Bad Request if validation fails
            return NextResponse.json({
                success: false,
                error: "Invalid input",
                details: result.error.format()
            }, { status: 400 });
        }

        const lead = await Lead.create(result.data); // result.data contains the successfully parsed and sanitary data
        return NextResponse.json({ success: true, lead }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 }); // Changed from 400 to 500 for generic server errors
    }
}

export async function GET() {
    try {
        // Check auth
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, leads });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
