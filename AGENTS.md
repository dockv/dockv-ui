# AGENTS.md

## 工作区

- 位于 `/dockv-web` 的 pnpm monorepo，包管理器为 `pnpm@11.10.0`。
- 工作区成员：`apps/*`、`services/*`、`packages/*`。
- 本包为 `packages/ui`，所有命令必须在本目录下执行。

## 命令

```bash
pnpm dev              # 同时启动文档站与 Storybook 开发服务器
pnpm dev:docs         # VitePress 文档开发服务器
pnpm dev:storybook    # Storybook 开发服务器（6006 端口）
pnpm build            # 完整构建（类型检查 + JS + 样式 + 类型声明）
pnpm build:types      # 仅生成类型声明（dist/*.d.ts）
pnpm build:components # 仅构建 JS（ES + UMD 双格式）
pnpm build:styles     # 仅编译样式（dist/dockv-ui.css）
pnpm build:all        # 完整构建 + 文档 + Storybook
pnpm build:docs       # VitePress 生产构建
pnpm build:storybook  # Storybook 生产构建
pnpm preview:docs     # 预览文档构建产物
```

没有 `pnpm test` 脚本。测试通过 Storybook/Vitest 集成运行（需要 Storybook 构建/可用）。

## 工作流

- 用户编写 `docs/components/<name>.md` 定义组件的 API 表格、属性、事件、插槽。
- Agent 根据文档实现 `src/components/<name>.ts`（Lit 组件）。
- Agent 在 `docs/.vitepress/theme/index.ts` 中 import 新组件，使其在 VitePress 文档中可用。
- Agent 创建 Storybook stories 文件 `src/stories/<name>.stories.ts`，验证组件的展示方式。

## 命名约定

- 自定义元素标签：`dv-{name}`（如 `<dv-button>`、`<dv-icon>`）。
- 组件类名：`{Name}`，不带前缀（如 `Icon`）。
- 源码文件：`src/components/{name}.ts`（如 `src/components/icon.ts`）。
- 样式文件：`src/styles/components/{name}.scss`（如 `src/styles/components/icon.scss`）。
- 组件内 CSS 类：`dockv-{name}-{element}`（如 `.dockv-icon-spin`）。
- 自定义事件：`dv-{event-name}`（如 `dv-click`）。
- CSS 自定义属性：`--dockv-{name}-{property}`（如 `--dockv-icon-size-md`）。

## 架构

- **组件库**：Lit（Web Components），参考示例见 `src/components/icon.ts`。入口文件 `src/index.ts` 导出所有组件。
- **Storybook**：框架为 `@storybook/web-components-vite`。stories 位于 `src/stories/`，使用 `html` 标签模板直接引入并渲染 Lit 组件，不涉及 Vue。
- **文档站**：VitePress，通过 `.github/workflows/deploy.yml` 部署到 GitHub Pages。

## TypeScript 配置

- `erasableSyntaxOnly: true`：禁止使用枚举、构造函数参数属性、命名空间；需要时使用 `import type`。
- `verbatimModuleSyntax: true`：纯类型导入/导出必须使用 `import type` 和 `export type`。
- `noUnusedLocals: true`、`noUnusedParameters: true`。
- `experimentalDecorators: true` + `useDefineForClassFields: false`：Lit 的 `@property()` 和 `@customElement()` 装饰器所必需。

## 测试

- Vitest 以**浏览器模式**运行，基于 Playwright（Chromium），而非 Node。
- `src/stories/*.stories.ts` 中的 stories 是测试目标，通过 `@storybook/addon-vitest` 关联。
- 无障碍（A11y）检查在 Storybook 预览中设置为 `'todo'`（不阻塞）。

## CI

- 推送到 `main` 会触发部署工作流，通过 `pnpm build:docs` 构建 VitePress 文档并部署到 GitHub Pages。构建环境要求 Node 24 与 pnpm 10。

## 文档

- 文档标点符号统一：完整叙述句句末添加句号；短列举、专有名词、链接等不加句号。
- GitHub 风格 alert（警示块）**仅可使用五种标准类型**：`NOTE`、`TIP`、`IMPORTANT`、`WARNING`、`CAUTION`。标记需**全大写**，在设计文档内标题使用 `####` 内嵌于引用块内，标题与正文之间空一行，示例：

  ```markdown
  > [!WARNING]
  > #### 警告标题
  >
  > 警告正文内容。
  ```
其他文档比如说明使用文档，标题跟在`[!   ]`后面使用空格分开，标题与正文之间空一行，示例：

  ```markdown
  > [!WARNING] 警告标题
  >
  > 警告正文内容。
  ```