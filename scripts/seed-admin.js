const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Use a simple prompt for the URI since we're running this as a standalone script
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function seedAdmin() {
    rl.question("Enter your PRODUCTION MONGODB_URI: ", async (uri) => {
        if (!uri) {
            console.error("URI is required.");
            process.exit(1);
        }

        rl.question("Enter ADMIN_EMAIL for production: ", async (email) => {
            rl.question("Enter ADMIN_PASSWORD for production: ", async (password) => {
                try {
                    console.log("Connecting to production database...");
                    await mongoose.connect(uri);

                    // We need a simple User model shim since we can't easily import the Next.js model here
                    const UserSchema = new mongoose.Schema({
                        email: { type: String, required: true, unique: true },
                        password: { type: String, required: true },
                        role: { type: String, default: "admin" }
                    });

                    const User = mongoose.models.User || mongoose.model("User", UserSchema);

                    const hashedPassword = await bcrypt.hash(password, 12);

                    console.log(`Checking if user ${email} exists...`);
                    const existingUser = await User.findOne({ email });

                    if (existingUser) {
                        console.log("User already exists. Updating password...");
                        existingUser.password = hashedPassword;
                        await existingUser.save();
                        console.log("User updated successfully!");
                    } else {
                        console.log("Creating new admin user...");
                        await User.create({
                            email,
                            password: hashedPassword,
                            role: "admin"
                        });
                        console.log("Admin user created successfully!");
                    }

                    await mongoose.disconnect();
                    console.log("Done. You can now log in on your live site.");
                    process.exit(0);
                } catch (error) {
                    console.error("Error seeding admin:", error);
                    process.exit(1);
                }
            });
        });
    });
}

seedAdmin();
