import { CustomCursor } from "./components/CustomCursor";
import { Divider } from "./components/Divider";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { Api } from "./sections/Api";
import { Application } from "./sections/Application";
import { Architecture } from "./sections/Architecture";
import { Challenges } from "./sections/Challenges";
import { Comparison } from "./sections/Comparison";
import { ConversationalAI } from "./sections/ConversationalAI";
import { Deployment } from "./sections/Deployment";
import { Evolution } from "./sections/Evolution";
import { FinalCTA } from "./sections/FinalCTA";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { Idea } from "./sections/Idea";
import { Learned } from "./sections/Learned";
import { Memory } from "./sections/Memory";
import { PersonaModel } from "./sections/PersonaModel";
import { Problem } from "./sections/Problem";
import { Responsible } from "./sections/Responsible";
import { Roadmap } from "./sections/Roadmap";
import { Snapshot } from "./sections/Snapshot";
import { TechStack } from "./sections/TechStack";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Snapshot />
        <Problem />
        <Idea />
        <Divider variant="nodes" />
        <PersonaModel />
        <HowItWorks />
        <Architecture />
        <Divider variant="line" />
        <Memory />
        <ConversationalAI />
        <Api />
        <TechStack />
        <Application />
        <Challenges />
        <Comparison />
        <Deployment />
        <Responsible />
        <Evolution />
        <Learned />
        <Roadmap />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
