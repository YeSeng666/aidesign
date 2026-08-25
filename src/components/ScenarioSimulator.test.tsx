import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ScenarioSimulator } from './ScenarioSimulator'

describe('ScenarioSimulator', () => {
  it('switches scenarios and reaches the final handoff step', () => {
    render(<ScenarioSimulator />)
    fireEvent.click(screen.getByRole('tab', { name: /直接设计/ }))
    expect(screen.getByRole('heading', { name: '确认单一闭环' })).toBeInTheDocument()

    const nextButton = screen.getByRole('button', { name: '下一步' })
    for (let index = 0; index < 5; index += 1) fireEvent.click(nextButton)

    expect(screen.getByRole('heading', { name: '完成一致性校验' })).toBeInTheDocument()
    expect(screen.getByText('可交给配置、开发或测试的项目档案')).toBeInTheDocument()
    expect(nextButton).toBeDisabled()
  })

  it('resets the current scenario to its first step', () => {
    render(<ScenarioSimulator />)
    fireEvent.click(screen.getByRole('button', { name: '下一步' }))
    expect(screen.getByRole('heading', { name: '建立事实与候选映射' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '重置演示' }))
    expect(screen.getByRole('heading', { name: '收集真实工作片段' })).toBeInTheDocument()
  })
})

