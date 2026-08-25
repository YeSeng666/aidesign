import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { scenarios, type DemoScenario } from '../content/agentContent'

const PLAYBACK_INTERVAL = 2200

export function ScenarioSimulator() {
  const [scenarioId, setScenarioId] = useState<DemoScenario['id']>('discover')
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0],
    [scenarioId],
  )
  const activeStep = scenario.steps[stepIndex]
  const isComplete = stepIndex === scenario.steps.length - 1

  useEffect(() => {
    if (!isPlaying) return
    if (isComplete) return

    const timer = window.setTimeout(() => {
      const nextStep = Math.min(stepIndex + 1, scenario.steps.length - 1)
      setStepIndex(nextStep)
      if (nextStep === scenario.steps.length - 1) setIsPlaying(false)
    }, PLAYBACK_INTERVAL)

    return () => window.clearTimeout(timer)
  }, [isComplete, isPlaying, scenario.steps.length, stepIndex])

  const selectScenario = (nextId: DemoScenario['id']) => {
    setScenarioId(nextId)
    setStepIndex(0)
    setIsPlaying(false)
  }

  const reset = () => {
    setStepIndex(0)
    setIsPlaying(false)
  }

  const togglePlayback = () => {
    if (isComplete) setStepIndex(0)
    setIsPlaying((current) => !current)
  }

  return (
    <div className="simulator-frame" data-testid="scenario-simulator">
      <div className="simulator-selector" role="tablist" aria-label="选择模拟任务">
        {scenarios.map((item) => (
          <button
            className={item.id === scenario.id ? 'scenario-tab is-active' : 'scenario-tab'}
            key={item.id}
            onClick={() => selectScenario(item.id)}
            role="tab"
            aria-selected={item.id === scenario.id}
            type="button"
          >
            <span>{item.shortLabel}</span>
            <small>{item.promise}</small>
          </button>
        ))}
      </div>

      <div className="simulator-workbench">
        <div className="simulator-rail" aria-label={`${scenario.label}步骤`}>
          <div className="rail-heading">
            <span>PROCESS TRACE</span>
            <strong>{String(stepIndex + 1).padStart(2, '0')} / {String(scenario.steps.length).padStart(2, '0')}</strong>
          </div>
          <ol>
            {scenario.steps.map((step, index) => {
              const state = index < stepIndex ? 'is-done' : index === stepIndex ? 'is-current' : ''
              return (
                <li className={state} key={`${scenario.id}-${step.phase}`}>
                  <button type="button" onClick={() => { setStepIndex(index); setIsPlaying(false) }}>
                    <span className="rail-marker">{index < stepIndex ? <Check size={13} /> : String(index + 1).padStart(2, '0')}</span>
                    <span>{step.label}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="simulator-stage" aria-live="polite">
          <div className="stage-topline">
            <span>{activeStep.phase}</span>
            {activeStep.gate === 'human' && <span className="gate human"><UserCheck size={15} /> 人工决定</span>}
            {activeStep.gate === 'review' && <span className="gate review"><ShieldCheck size={15} /> 确认门禁</span>}
            {!activeStep.gate && <span className="gate ai">AGENT ACTIVE</span>}
          </div>

          <div className="stage-copy">
            <p className="stage-prompt">“{scenario.prompt}”</p>
            <h3>{activeStep.label}</h3>
            <p>{activeStep.detail}</p>
          </div>

          <div className="stage-output">
            <span>OUTPUT / 当前产物</span>
            <strong>{activeStep.output}</strong>
          </div>

          <div className="simulator-controls">
            <button
              className="icon-button"
              type="button"
              onClick={() => { setStepIndex((current) => Math.max(0, current - 1)); setIsPlaying(false) }}
              disabled={stepIndex === 0}
              aria-label="上一步"
              title="上一步"
            >
              <ArrowLeft size={18} />
            </button>
            <button className="play-button" type="button" onClick={togglePlayback}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? '暂停演示' : isComplete ? '重新播放' : '开始演示'}
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => { setStepIndex((current) => Math.min(scenario.steps.length - 1, current + 1)); setIsPlaying(false) }}
              disabled={isComplete}
              aria-label="下一步"
              title="下一步"
            >
              <ArrowRight size={18} />
            </button>
            <button className="icon-button reset-button" type="button" onClick={reset} aria-label="重置演示" title="重置演示">
              <RotateCcw size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
