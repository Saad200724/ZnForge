import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import LiveChat from "@/components/LiveChat";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <FloatingElements />
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Team />
      <Portfolio />
      <Contact />
      <Footer />
      <LiveChat />
    </div>
  );
}
