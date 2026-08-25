import { useState } from 'react'
import { FileCheck2, Files, ScanSearch } from 'lucide-react'
import { artifacts } from '../content/agentContent'

export function ArtifactBrowser() {
  const [activeId, setActiveId] = useState(artifacts[0].id)
  const activeArtifact = artifacts.find((artifact) => artifact.id === activeId) ?? artifacts[0]

  return (
    <div className="artifact-browser">
      <div className="artifact-tabs" role="tablist" aria-label="选择交付档案">
        {artifacts.map((artifact) => (
          <button
            className={artifact.id === activeArtifact.id ? 'artifact-tab is-active' : 'artifact-tab'}
            key={artifact.id}
            onClick={() => setActiveId(artifact.id)}
            role="tab"
            aria-selected={artifact.id === activeArtifact.id}
            type="button"
          >
            <span>{artifact.index}</span>
            {artifact.title}
          </button>
        ))}
      </div>

      <div className="artifact-display">
        <aside className="artifact-meta">
          <div className="artifact-stamp"><FileCheck2 size={20} /> {activeArtifact.status}</div>
          <span className="artifact-number">{activeArtifact.index}</span>
          <h3>{activeArtifact.title}</h3>
          <p>{activeArtifact.purpose}</p>
          <div className="artifact-tags">
            {activeArtifact.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="artifact-note"><ScanSearch size={18} /> 仅展示脱敏片段</div>
        </aside>
        <div className="artifact-paper">
          <div className="paper-bar">
            <span><Files size={16} /> CONFIRMED MARKDOWN</span>
            <span>READ-ONLY</span>
          </div>
          <pre><code>{activeArtifact.lines.join('\n')}</code></pre>
        </div>
      </div>
    </div>
  )
}

