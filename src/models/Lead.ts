import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
        },
        businessType: {
            type: String,
            required: [true, 'Please provide a business type'],
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
        },
    },
    { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
