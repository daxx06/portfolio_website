# WebCrafters Portfolio Website

A complete, modern, and high-converting portfolio website built for freelancers and agencies selling web development services to local businesses.

Built with **Next.js (App Router)**, **TailwindCSS**, **Framer Motion**, **MongoDB**, and **NextAuth**.

## Features

- **Premium Design:** Modern, clean, and highly aesthetic UI designed to build trust.
- **Smooth Animations:** Integrated `framer-motion` for reveal-on-scroll effects and interactive elements.
- **Mobile Responsive:** Flawless experience across desktops, tablets, and smartphones.
- **Lead Capture Form:** functional contact form that saves inquiries directly to your database.
- **Admin Dashboard:** Secure login portal to view, manage, and delete incoming leads.
- **Optimized for Conversions:** Clear CTAs, social proof, and benefit-driven copywriting.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18.x or above)
- npm or yarn
- A MongoDB cluster (e.g., MongoDB Atlas)

### 1. Clone & Install

Navigate to the project directory and install the dependencies:

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory of the project and add the following variables:

```env
# MongoDB Connection String (from MongoDB Atlas)
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority"

# NextAuth Secret for JWT encryption (generate one using: openssl rand -base64 32)
NEXTAUTH_SECRET="your_super_secret_string_here"

# NextAuth URL (Localhost for dev, Production URL for production)
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials (for accessing the dashboard)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="supersecretpassword123"
```

### 3. Run Development Server

Start the local development server:

```bash
npm run dev
```

Your site should now be running at `http://localhost:3000`.

---

## 🎨 Customizing the Website

### Changing Branding & Colors
The project uses TailwindCSS. You can globally change the primary blue and indigo theme by replacing the `blue-600` and `indigo-600` classes in your components, or by extending the theme in your Tailwind config (or equivalent styling variables).

### Updating Content
- **Hero Section:** `src/components/Hero.tsx`
- **Target Industries:** `src/components/TargetBusinesses.tsx`
- **Services:** `src/components/Services.tsx`
- **Portfolio Projects:** `src/components/Portfolio.tsx` (Update the image URLs and text here!)
- **Why Choose Me:** `src/components/WhyChooseMe.tsx`
- **Contact Details:** `src/components/ContactForm.tsx` (Change the `hello@webcrafters.agency` email and phone number to your own).

---

## 🛡️ Admin Dashboard Usage

1. Go to `/admin/login` on your live or local site.
2. Sign in using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in your `.env.local` file.
3. You will be redirected to the secure `/admin/dashboard` where you can view all leads submitted via the contact form.

---

## 🌐 Deployment to Vercel

The easiest way to deploy this Next.js app is via [Vercel](https://vercel.com).

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Go to Vercel and create a **New Project**.
3. Import your repository.
4. Open the **Environment Variables** section before deploying and add:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (Set this to your Vercel production URL, e.g., `https://my-portfolio.vercel.app`)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
5. Click **Deploy**.

Congratulations! Your new premium web agency portfolio is live!
