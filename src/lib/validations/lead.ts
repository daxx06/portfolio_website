import { z } from 'zod';

export const leadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters string").max(100, "Name cannot exceed 100 characters"),
    email: z.string().email("Invalid email address"),
    businessType: z.string().min(2, "Business type must be properly specified").max(100, "Business type cannot exceed 100 characters"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message cannot exceed 1000 characters"),
}).strict(); // strict() rejects any unexpected fields not defined in the schema

export type LeadInput = z.infer<typeof leadSchema>;
