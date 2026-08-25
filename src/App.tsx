import { useEffect } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Blocks,
  Bot,
  Braces,
  CheckCircle2,
  CircleStop,
  FileStack,
  Fingerprint,
  GitBranch,
  LockKeyhole,
  ScanLine,
  Shield,
  TerminalSquare,
  UserRoundCheck,
} from 'lucide-react'
import { ArtifactBrowser } from './components/ArtifactBrowser'
import { PromptShelf } from './components/PromptShelf'
import { ScenarioSimulator } from './components/ScenarioSimulator'
import { boundaries, diagnosticDimensions } from './content/agentContent'
import './App.css'

const phases = [
  ['01', '岗位卡', '明确岗位契约：接什么、交付什么、怎样算可用。'],
  ['02', '工作流', '还原真实过程，提取判断、异常和人机交接。'],
  ['03', '流程图', '只把确认版逻辑变成可审阅的决策地图。'],
  ['04', '配置拆解', '从工作流反推最小上岗条件与人工替代。'],
] as const

const statusItems = [
  ['PROFILE', 'aidesign', '运行身份'],
  ['MODE', 'READ-ONLY', '公开展示'],
  ['VALIDATED', '2026.08.25', '连通性快照'],
  ['RUNTIME API', 'NONE', '不开放调用'],
] as const

function App() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回顶部">
          <span className="wordmark-mark">ai</span>
          <span>aidesign</span>
        </a>
        <nav aria-label="主导航">
          <a href="#experience">工作方式</a>
          <a href="#artifacts">交付档案</a>
          <a href="#boundaries">能力边界</a>
        </nav>
        <a className="github-link" href="https://github.com/YeSeng666/aidesign" target="_blank" rel="noreferrer">
          <GitBranch size={17} />
          <span>Source</span>
        </a>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              READ-ONLY AGENT EXPERIENCE
            </div>
            <p className="hero-name">AI员工设计顾问</p>
            <h1>把重复工作，<br />变成可交接的 AI 岗位。</h1>
            <p className="hero-lead">
              aidesign 通过咨询式对话，把一个真实、单一的工作闭环，收敛成岗位卡、工作流、流程图和配置拆解。
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#experience">查看它如何工作 <ArrowDown size={18} /></a>
              <a className="text-link" href="#boundaries">先看能力边界 <ArrowUpRight size={17} /></a>
            </div>
          </div>

          <div className="hero-audit" aria-label="公开展示状态">
            <div className="audit-heading">
              <Fingerprint size={21} />
              <span>PUBLIC PROFILE / 001</span>
            </div>
            <p>这是一个公开、只读的 Agent 档案。页面不会接收数据，也不连接真实运行环境。</p>
            <div className="audit-seal">
              <span>NO API</span>
              <small>NO ACCESS</small>
            </div>
          </div>
        </div>
        <a className="hero-next" href="#identity" aria-label="查看下一部分"><ArrowDown size={18} /></a>
      </section>

      <section className="status-band" id="identity">
        <div className="status-grid shell">
          {statusItems.map(([label, value, note]) => (
            <div className="status-cell" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="intro-band section-band">
        <div className="shell split-intro" data-reveal>
          <div>
            <div className="eyebrow">ROLE / 它是什么</div>
            <h2>不是一个替你做决定的“万能助手”。</h2>
          </div>
          <div className="intro-copy">
            <p>
              它负责把你零散的工作经验变成一套可以实现、维护和审计的 AI 员工定义档案。它交付的是设计依据，不是已经上线的业务 Agent。
            </p>
            <div className="role-equation" aria-label="aidesign 的核心作用">
              <span>真实工作事实</span><b>+</b><span>判断与边界</span><b>=</b><strong>可交接的岗位规格</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="diagnostic-band section-band">
        <div className="shell" data-reveal>
          <div className="section-heading">
            <div>
              <div className="eyebrow">DIAGNOSTIC / 五维诊断</div>
              <h2>先判断值不值得做，再谈怎么做。</h2>
            </div>
            <p>候选场景不会被粗暴打分，而是明确区分已知、缺口和风险。</p>
          </div>
          <div className="diagnostic-list">
            {diagnosticDimensions.map(([index, title, description]) => (
              <article key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ScanLine size={21} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-band section-band" id="experience">
        <div className="shell" data-reveal>
          <div className="section-heading light-heading">
            <div>
              <div className="eyebrow">SIMULATOR / 预设任务模拟</div>
              <h2>看见它如何判断，也看见它在哪里停下。</h2>
            </div>
            <p>选择一个任务入口。所有步骤都在浏览器本地播放，没有自由输入，也不会发出网络请求。</p>
          </div>
          <ScenarioSimulator />
        </div>
      </section>

      <section className="phases-band section-band">
        <div className="shell" data-reveal>
          <div className="section-heading">
            <div>
              <div className="eyebrow">ARCHITECTURE / 四阶段门禁</div>
              <h2>每一份文档，都建立在上一份确认版之上。</h2>
            </div>
            <p>岗位卡、工作流、流程图和配置拆解不能跳关，也不能用聊天记忆替代确认事实。</p>
          </div>
          <div className="phase-track">
            {phases.map(([index, title, description], position) => (
              <article key={index}>
                <div className="phase-index">{index}</div>
                <div className="phase-copy">
                  <span>PHASE {position + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                {position < phases.length - 1 && <ArrowDown className="phase-arrow" size={21} />}
              </article>
            ))}
          </div>
          <div className="gate-rule"><UserRoundCheck size={22} /> 草案 → 集中校审 → 明确确认 → 写入 → 回读</div>
        </div>
      </section>

      <section className="artifacts-band section-band" id="artifacts">
        <div className="shell" data-reveal>
          <div className="section-heading">
            <div>
              <div className="eyebrow">DELIVERABLES / 交付档案</div>
              <h2>不是效果图，是一套能被后续团队继续使用的依据。</h2>
            </div>
            <p>这里展示经过脱敏的格式片段。真实项目只有在用户确认后才会归存。</p>
          </div>
          <ArtifactBrowser />
        </div>
      </section>

      <section className="boundaries-band section-band" id="boundaries">
        <div className="shell" data-reveal>
          <div className="section-heading light-heading">
            <div>
              <div className="eyebrow">BOUNDARIES / 能力边界</div>
              <h2>它的可信度，来自清楚知道哪些事不能自动做。</h2>
            </div>
            <p>授权、责任或撤回机制不明确时，Agent 停止自动执行，只提供草案、提醒或人工交接材料。</p>
          </div>
          <div className="boundary-grid">
            {boundaries.map((boundary) => {
              const Icon = boundary.mode === 'ai' ? Bot : boundary.mode === 'review' ? Shield : CircleStop
              return (
                <article className={`boundary-column ${boundary.mode}`} key={boundary.mode}>
                  <div className="boundary-title"><Icon size={24} /><h3>{boundary.title}</h3></div>
                  <p>{boundary.description}</p>
                  <ul>{boundary.examples.map((example) => <li key={example}><CheckCircle2 size={16} /> {example}</li>)}</ul>
                </article>
              )
            })}
          </div>
          <div className="stop-line">
            <LockKeyhole size={21} />
            <span>不会自动发送、发布、删除、支付、开通账号或修改权威数据。</span>
          </div>
        </div>
      </section>

      <section className="tools-band section-band">
        <div className="shell" data-reveal>
          <div className="section-heading">
            <div>
              <div className="eyebrow">STACK / 工具与状态</div>
              <h2>最小工具链，明确的条件性能力。</h2>
            </div>
          </div>
          <div className="tools-ledger">
            <article><TerminalSquare size={25} /><span>Hermes</span><strong>运行 aidesign Profile</strong><small>本地对话已验证</small></article>
            <article><Braces size={25} /><span>Codex</span><strong>维护公开页面与文档</strong><small>不是访客运行依赖</small></article>
            <article><Blocks size={25} /><span>飞书 CLI</span><strong>条件性交付通道</strong><small>公开站不接入</small></article>
            <article><FileStack size={25} /><span>Markdown</span><strong>确认版事实来源</strong><small>本地、可回读、可追溯</small></article>
          </div>
        </div>
      </section>

      <section className="prompts-band section-band">
        <div className="shell prompt-layout" data-reveal>
          <div className="prompt-heading">
            <div className="eyebrow">STARTERS / 如何开始</div>
            <h2>把这些话带到你自己的 aidesign 运行环境。</h2>
            <p>本页面只允许复制，不接收任何工作数据。</p>
          </div>
          <PromptShelf />
        </div>
      </section>

      <section className="privacy-band section-band">
        <div className="shell privacy-layout" data-reveal>
          <div className="privacy-mark"><LockKeyhole size={34} /><span>ZERO ACCESS</span></div>
          <div>
            <div className="eyebrow">PRIVACY / 公开只读</div>
            <h2>看起来像真实体验，但它没有你的权限，也没有你的数据。</h2>
          </div>
          <div className="privacy-points">
            <span>无后端</span><span>无 API</span><span>无登录</span><span>无埋点</span><span>无表单</span><span>无持久化</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-title"><span className="wordmark-mark">ai</span><strong>aidesign</strong></div>
          <p>AI员工设计顾问公开档案 · Snapshot 2026.08.25</p>
          <a href="https://github.com/YeSeng666/aidesign" target="_blank" rel="noreferrer">查看公开源码 <ArrowUpRight size={16} /></a>
        </div>
      </footer>
    </main>
  )
}

export default App
