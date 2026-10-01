import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { MEMORY_TYPES, RETRIEVAL_RULES } from "../data/content";
import { FlowLane } from "../visuals/FlowLane";
import { MemoryNetwork } from "../visuals/MemoryNetwork";

export function Memory() {
  return (
    <section id="memory" className="section section--deep" aria-labelledby="memory-title">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="Memory system"
          id="memory-title"
          title={<>Memory is what makes a digital twin <span className="grad">personal</span></>}
          lead="PersonaTwin separates memory by what it is and how much it can be trusted. Only episodic experiences may be spoken of as personal memories; knowledge is “from my notes”; saved conversations are labelled partly AI-generated; persona memory shapes the voice and never supplies facts."
        />

        <MemoryNetwork />

        <div className="memory-flows">
          <Reveal>
            <FlowLane
              title="Write path · services/indexing.py"
              items={[
                { label: "Text · upload · URL", sub: "pypdf · HTML parser" },
                { label: "Chunk", sub: "~900 chars · 150 overlap" },
                { label: "Prefix", sub: "title (category)" },
                { label: "Embed", sub: "384-d · L2-normalised" },
                { label: "Store", sub: "pgvector column", accent: true },
              ]}
            />
          </Reveal>
          <Reveal delay={100}>
            <FlowLane
              title="Lifecycle · from a conversation to future recall"
              items={[
                { label: "Conversation" },
                { label: "Remember this", sub: "or auto-remember" },
                { label: "Conversation memory", sub: "summarised exchange" },
                { label: "Embedded & stored" },
                { label: "Future retrieval", sub: "as C#, score × 0.9" },
                { label: "More personal reply", accent: true },
              ]}
            />
          </Reveal>
        </div>

        <div className="memory-detail">
          <Reveal className="memory-table-wrap">
            <h3 className="mini-title">Five memory stores</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="Memory stores table">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Memory</th>
                    <th scope="col">Holds</th>
                    <th scope="col">Table(s)</th>
                    <th scope="col">Lifetime</th>
                  </tr>
                </thead>
                <tbody>
                  {MEMORY_TYPES.map((m) => (
                    <tr key={m.key}>
                      <th scope="row">{m.label}</th>
                      <td>{m.holds}</td>
                      <td><code>{m.table}</code></td>
                      <td>{m.lifetime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="scoring" delay={100}>
            <h3 className="mini-title">Read path · hybrid scoring</h3>
            <p className="scoring__formula">
              <code>score = cosine + 0.12 × stem_overlap</code>
            </p>
            <dl className="scoring__list">
              {RETRIEVAL_RULES.map((r) => (
                <div key={r.k}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal as="p" className="note">
          Embeddings: the default is an offline hashing embedder (stemmed unigrams, bigrams, character 4-grams and a small
          concept lexicon hashed into 384 signed buckets) — deterministic and free, but lexical rather than deeply semantic.
          <code> EMBEDDING_PROVIDER=openai</code> switches to <code>text-embedding-3-small</code> reduced to 384 dimensions.
        </Reveal>
      </div>
    </section>
  );
}
