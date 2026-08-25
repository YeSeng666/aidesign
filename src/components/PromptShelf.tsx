import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { triggerPrompts } from '../content/agentContent'

export function PromptShelf() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyPrompt = async (prompt: string, index: number) => {
    await navigator.clipboard.writeText(prompt)
    setCopiedIndex(index)
    window.setTimeout(() => setCopiedIndex(null), 1600)
  }

  return (
    <div className="prompt-shelf">
      {triggerPrompts.map((prompt, index) => (
        <article className="prompt-row" key={prompt}>
          <span className="prompt-index">0{index + 1}</span>
          <p>{prompt}</p>
          <button type="button" onClick={() => copyPrompt(prompt, index)} aria-label={`复制启动语 ${index + 1}`}>
            {copiedIndex === index ? <Check size={18} /> : <Copy size={18} />}
            <span>{copiedIndex === index ? '已复制' : '复制'}</span>
          </button>
        </article>
      ))}
    </div>
  )
}

