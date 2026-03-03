import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { getServerSession } from "next-auth/next";
import { leadSchema } from "@/lib/validations/lead";
import { rateLimiter } from "@/lib/rate-limit";

export async function POST(req: Request) {
    try {
        // Apply IP Rate Limiting
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        try {
            const { success } = await rateLimiter.limit(`leads_${ip}`);
            if (!success) {
                return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
            }
        } catch (error) {
            console.error("Rate Limiter Error:", error);
            // Fail open if the rate limiter itself errors out, to not block legitimate leads during Redis downtime
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
        console.error("POST /api/leads Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
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
        console.error("GET /api/leads Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
