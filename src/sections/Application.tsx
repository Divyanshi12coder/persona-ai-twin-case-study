import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { FEATURES } from "../data/content";
import { ScreenshotGallery } from "../visuals/ScreenshotGallery";

export function Application() {
  return (
    <section className="section section--dark" aria-labelledby="app-title">
      <div className="container">
        <SectionHeader
          index="10"
          eyebrow="Inside the application"
          id="app-title"
          title="The product behind the pipeline"
          lead="Screens from the running PersonaTwin app. Its own interface uses a warm “mentor's study” design — this case study uses a separate visual identity."
        />
        <Reveal variant="scale">
          <ScreenshotGallery />
        </Reveal>
        <ul className="features">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.title} className="feature" delay={(i % 3) * 80}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
