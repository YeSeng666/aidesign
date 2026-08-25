# aidesign

`aidesign` 是一个公开、只读的 AI 员工设计顾问展示站。它通过预设任务模拟，展示 Agent 如何挖掘场景、设计岗位、维护确认版档案，以及何时必须停止并交给人工处理。

## 特点

- React + TypeScript + Vite 纯静态站点
- 三种确定性任务模拟，不调用模型或 API
- 五类脱敏交付档案预览
- 无后端、无登录、无表单、无埋点、无数据持久化
- GitHub Actions 自动部署到 GitHub Pages

## 本地运行

```bash
npm install
npm run assets
npm run dev
```

## 验证

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

## 公开地址

发布后访问：`https://yeseng666.github.io/aidesign/`
