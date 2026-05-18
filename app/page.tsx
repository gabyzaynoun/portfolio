import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Now } from "@/components/Now";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatLauncher } from "@/components/ChatLauncher";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Now />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatLauncher />
      <Reveal />
    </>
  );
}
