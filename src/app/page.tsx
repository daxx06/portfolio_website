import Hero from "@/components/Hero";
import TargetBusinesses from "@/components/TargetBusinesses";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseMe from "@/components/WhyChooseMe";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TargetBusinesses />
      <Services />
      <Portfolio />
      <WhyChooseMe />
      <ContactForm />
    </main>
  );
}
