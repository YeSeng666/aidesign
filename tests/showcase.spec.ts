import { expect, test } from '@playwright/test'

test('renders the complete read-only Agent experience without external requests', async ({ page }) => {
  const externalRequests: string[] = []
  page.on('request', (request) => {
    const url = new URL(request.url())
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(request.url())
  })

  await page.goto('./')
  await expect(page.getByRole('heading', { name: /把重复工作/ })).toBeVisible()
  await expect(page.getByText('READ-ONLY AGENT EXPERIENCE')).toBeVisible()
  await expect(page.getByTestId('scenario-simulator')).toBeVisible()

  await page.getByRole('tab', { name: /继续项目/ }).click()
  await expect(page.getByRole('heading', { name: '确认项目和目标对象' })).toBeVisible()

  await page.getByRole('tab', { name: /配置拆解/ }).click()
  await expect(page.getByText('READINESS SPEC')).toBeVisible()

  expect(externalRequests).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

test('supports reduced motion and keyboard navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await page.getByRole('tab', { name: /直接设计/ }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: '确认单一闭环' })).toBeVisible()
})
