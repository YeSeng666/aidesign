import { describe, expect, it } from 'vitest'
import { artifacts, scenarios, triggerPrompts } from './agentContent'

describe('public Agent content', () => {
  it('provides three deterministic demo scenarios with a terminal gate', () => {
    expect(scenarios).toHaveLength(3)
    for (const scenario of scenarios) {
      expect(scenario.steps.length).toBeGreaterThanOrEqual(5)
      expect(scenario.steps.at(-1)?.gate).toBeTruthy()
    }
  })

  it('contains all five deliverable previews', () => {
    expect(artifacts.map((artifact) => artifact.index)).toEqual(['00', '01', '02', '03', '04'])
  })

  it('keeps starter prompts copy-ready', () => {
    expect(triggerPrompts).toHaveLength(3)
    expect(triggerPrompts.every((prompt) => prompt.length > 20)).toBe(true)
  })
})

