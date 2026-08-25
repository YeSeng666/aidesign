export type ScenarioStep = {
  phase: string
  label: string
  detail: string
  output: string
  gate?: 'review' | 'human'
}

export type DemoScenario = {
  id: 'discover' | 'design' | 'resume'
  label: string
  shortLabel: string
  prompt: string
  promise: string
  steps: ScenarioStep[]
}

export type ArtifactPreview = {
  id: string
  index: string
  title: string
  purpose: string
  status: string
  lines: string[]
  tags: string[]
}

export type BoundaryRule = {
  mode: 'ai' | 'review' | 'human'
  title: string
  description: string
  examples: string[]
}

export const scenarios: DemoScenario[] = [
  {
    id: 'discover',
    label: '挖掘可 Agent 化场景',
    shortLabel: '挖掘场景',
    prompt: '帮我梳理日常工作中适合做成 AI 员工的场景。',
    promise: '把零散工作事实，收敛为可选择的候选场景。',
    steps: [
      {
        phase: '01 / INTAKE',
        label: '收集真实工作片段',
        detail: '先了解你本人负责的重复任务，不急着推荐工具或方案。',
        output: '至少 3 个可追溯的工作事实',
      },
      {
        phase: '02 / MAP',
        label: '建立事实与候选映射',
        detail: '把触发、输入、动作、输出和痛点组合成单一工作闭环。',
        output: '个人工作事实清单 + 候选映射',
      },
      {
        phase: '03 / DIAGNOSE',
        label: '完成五维诊断',
        detail: '检查重复性、输入可得性、规则清晰度、输出可验收性和人工兜底。',
        output: '已明确 / 待补充 / 需注意',
      },
      {
        phase: '04 / DECIDE',
        label: '等待用户选择场景',
        detail: 'Agent 可以给出依据充分的建议，但不会替你决定业务优先级。',
        output: '一个用户明确选择的场景',
        gate: 'human',
      },
      {
        phase: '05 / ARCHIVE',
        label: '确认后归入场景池',
        detail: '只有候选和保存位置都确认后，才会写入场景池并回读校验。',
        output: '00-AI员工场景池.md',
        gate: 'review',
      },
    ],
  },
  {
    id: 'design',
    label: '设计一个明确的 AI 员工',
    shortLabel: '直接设计',
    prompt: '我想把一个明确的工作闭环设计成 AI 员工。',
    promise: '把已选场景变成可实现、可维护的岗位规格。',
    steps: [
      {
        phase: '01 / SCOPE',
        label: '确认单一闭环',
        detail: '检查触发、交付结果和责任人，避免把多个业务场景混成全能员工。',
        output: '最小场景梳理 + 五维诊断',
      },
      {
        phase: '02 / ROLE',
        label: '形成岗位卡草案',
        detail: '定义 AI 接什么工作、交付什么、怎样算可用，以及哪些事必须由人负责。',
        output: '01-岗位卡.md 草案',
      },
      {
        phase: '03 / REVIEW',
        label: '集中校审岗位契约',
        detail: '只追问会改变岗位范围、授权、输出或成功标准的高优先级问题。',
        output: '待确认项不超过 5 项',
        gate: 'review',
      },
      {
        phase: '04 / WORKFLOW',
        label: '拆解工作流与边界',
        detail: '还原人工流程，提取判断规则，明确 AI 做、AI 做人确认和人处理。',
        output: '02-工作流.md + 03-流程图.md',
      },
      {
        phase: '05 / CONFIG',
        label: '反推最小上岗条件',
        detail: '只列实际需要的资料、规则、工具、权限和人工替代方式。',
        output: '04-配置拆解.md',
      },
      {
        phase: '06 / HANDOFF',
        label: '完成一致性校验',
        detail: '四份文档全部确认、回读且一致后，才标记架构完成。',
        output: '可交给配置、开发或测试的项目档案',
        gate: 'human',
      },
    ],
  },
  {
    id: 'resume',
    label: '继续已有设计项目',
    shortLabel: '继续项目',
    prompt: '继续维护已有项目中的 AI 员工档案。',
    promise: '从确认版档案续接，不靠聊天记忆补事实。',
    steps: [
      {
        phase: '01 / LOCATE',
        label: '确认项目和目标对象',
        detail: '由用户明确项目保存位置、目标场景和当前希望继续的阶段。',
        output: '项目范围与目标 AI 员工',
        gate: 'human',
      },
      {
        phase: '02 / READ',
        label: '仅读取允许的确认版',
        detail: '只看场景池、目标目录中的 01-04 文档，以及本轮点名材料。',
        output: '当前唯一事实依据',
      },
      {
        phase: '03 / VERIFY',
        label: '检查状态与冲突',
        detail: '文件缺失、状态不明或内容冲突时，如实标记为草案，不伪装成已确认。',
        output: '可续接阶段 + 待确认冲突',
      },
      {
        phase: '04 / CONTINUE',
        label: '从最早受影响阶段继续',
        detail: '岗位卡变化会复核全部下游，工作流变化会重生成流程图。',
        output: '基于最新确认版的修订草案',
      },
      {
        phase: '05 / COMMIT',
        label: '确认后写入并回读',
        detail: '没有内容确认和路径确认，不创建、不覆盖、不更新状态。',
        output: '可追溯的确认版项目档案',
        gate: 'review',
      },
    ],
  },
]

export const artifacts: ArtifactPreview[] = [
  {
    id: 'pool',
    index: '00',
    title: 'AI员工场景池',
    purpose: '记录候选场景、选择依据和后续状态。',
    status: 'SCENE INDEX',
    tags: ['五维诊断', '选择依据', '下一步'],
    lines: [
      '# 场景 A-003｜历史材料初审',
      '',
      '- 用户工作依据：每周接收多批材料并检查完整性',
      '- 单一闭环：收到材料 → 检查缺项 → 输出补充清单',
      '- 重复性：已明确',
      '- 输出可验收性：已明确',
      '- 人工兜底：关键判断由用户复核',
      '- 状态：已选择，等待岗位设计',
    ],
  },
  {
    id: 'role',
    index: '01',
    title: '岗位卡',
    purpose: '定义 Agent 的岗位契约，而不是堆叠功能。',
    status: 'ROLE CONTRACT',
    tags: ['输入输出', '成功标准', '本期不做'],
    lines: [
      '# 材料初审助理',
      '',
      '## 接收什么工作',
      '- 一批待检查材料及明确的必需项清单',
      '',
      '## 交付什么结果',
      '- 缺失项、冲突项和待人工判断项清单',
      '',
      '## 人工边界',
      '- AI 形成初审结果；用户确认最终处理意见',
    ],
  },
  {
    id: 'workflow',
    index: '02',
    title: '工作流',
    purpose: '把真实过程翻译成可运行、有异常去向的行为链。',
    status: 'OPERATING LOGIC',
    tags: ['判断规则', '异常处理', '人机分工'],
    lines: [
      '1. MUST 校验必要输入是否齐全',
      '2. 输入缺失 → 返回补充清单，不继续判断',
      '3. 按规则逐项比对材料内容',
      '4. 来源冲突 → 标记冲突，不自行选定权威来源',
      '5. 输出初审报告',
      '6. AI 做，人确认：最终处理决定',
    ],
  },
  {
    id: 'flow',
    index: '03',
    title: '流程图',
    purpose: '只表现确认版工作流，不在图中发明新逻辑。',
    status: 'DECISION MAP',
    tags: ['主路径', '失败去向', '确认门禁'],
    lines: [
      '触发',
      '  ↓',
      '输入校验 ──不完整──→ 返回补充清单',
      '  │完整',
      '  ↓',
      '规则比对 ──冲突──→ 标记并转人工',
      '  │通过',
      '  ↓',
      '形成草案 → 用户确认 → 归存',
    ],
  },
  {
    id: 'config',
    index: '04',
    title: '配置拆解',
    purpose: '从工作流反推实际上岗条件，不为完整而罗列工具。',
    status: 'READINESS SPEC',
    tags: ['最小配置', '可选增强', '人工替代'],
    lines: [
      '| 工作流要求 | 最小配置 | 没有时怎么办 |',
      '|---|---|---|',
      '| 读取材料 | 文件读取能力 | 用户手动提供正文 |',
      '| 规则比对 | 已确认检查清单 | 转人工判断 |',
      '| 归存结果 | Markdown 写入能力 | 仅对话交付 |',
      '',
      '当前不需要：RAG、数据库、自动发布权限',
    ],
  },
]

export const boundaries: BoundaryRule[] = [
  {
    mode: 'ai',
    title: 'AI 做',
    description: '规则清楚、结果可撤回、输出仍属于分析或草案的工作。',
    examples: ['整理工作事实', '生成候选映射', '形成完整文档草案', '检查上下游一致性'],
  },
  {
    mode: 'review',
    title: 'AI 做，人确认',
    description: 'AI 可以准备结果，但业务事实、风险或文件状态需要人签字。',
    examples: ['选定具体场景', '确认岗位范围', '覆盖已有确认版', '更新场景池状态'],
  },
  {
    mode: 'human',
    title: '人处理',
    description: '涉及授权、责任归属、不可逆影响或真实业务结果的决定。',
    examples: ['决定业务优先级', '修正冲突事实', '发布或删除内容', '开发并上线目标 Agent'],
  },
]

export const diagnosticDimensions = [
  ['01', '重复性', '是否存在稳定的未来触发、周期或复发情境。'],
  ['02', '输入可得性', '需要什么资料、从哪里取得、缺失时如何补充。'],
  ['03', '规则清晰度', '能否描述处理过程、关键判断、例外和检查方法。'],
  ['04', '输出可验收性', '是否存在清晰交付物、使用者和基本验收方式。'],
  ['05', '人工兜底', '错误是否可发现、可撤回，以及何时必须交给人。'],
] as const

export const triggerPrompts = [
  '帮我梳理我日常工作中适合做成 AI 员工的场景。我负责……；重复工作有……。',
  '我想设计一个“___”AI 员工。它要把___变成___；我本人负责审核。',
  '继续维护已有项目。目标场景或 AI 员工是___，请先核对确认版资料。',
]
