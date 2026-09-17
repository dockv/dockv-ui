# AGENTS.md

## 工作区

- 本仓库为 **pnpm monorepo**，包管理器为 `pnpm@11.10.0`。
- monorepo 架构：工作区成员为 `apps/*`、`services/*`、`packages/*`，本包位于 `packages/ui`。

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

## 工作流

- 用户编写 `docs/components/<name>.md` 定义组件的 API 表格、属性、事件、插槽。
- 根据文档实现 `src/components/<name>.ts`（Lit 组件）。
- 在 `docs/.vitepress/theme/index.ts` 中 import 新组件，使其在 VitePress 文档中可用。
- 创建 Storybook stories 文件 `src/stories/<name>.stories.ts`，验证组件的展示方式。

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

- **手动测试**：`test/index.html` 是 **手动测试页**，引入 `dist` 构建产物（UMD + 全量 CSS），覆盖各组件主要属性 / 事件 / API 的可视化验证。改动组件后需先 `pnpm build:all` 再打开该页查看实际渲染效果。

## 分支策略

- `main` 为受保护分支：**禁止直接在 `main` 上任何提交、修改**（含直接 push）。
- 所有功能 / 修复 / 文档 / 构建改动都必须**先新建独立分支**，通过 Pull Request 合入 `main`。
- 分支命名采用**斜杠命名空间**风格，格式 `类型/简短描述`（全部小写，描述用连字符 `-` 连接），类型模块如下：
  - `feat/*`：新功能 / 新组件（如 `feat/button`、`feat/divider`）。
  - `fix/*`：缺陷修复（如 `fix/notification-close`）。
  - `docs/*`：文档改动（如 `docs/readme-alert`）。
  - `chore/*`：构建 / CI / 配置等杂项（如 `chore/ci-upgrade`）。

## CI

- 推送到 `main` 会触发部署工作流，通过 `pnpm build:docs` 构建 VitePress 文档并部署到 GitHub Pages。构建环境要求 Node 24 与 pnpm 11。

## Git Hook（本地验证）

- 仓库配置了 Husky 本地钩子（见 `.husky/`），**对任意分支的 commit / push 生效**，不受 CI 只跑 `main` 限制：
  - `pre-commit` 与 `pre-push` 均执行 `pnpm build:all`（类型检查 + JS + 样式 + 类型声明 + 文档 + Storybook）。
  - 构建失败会**阻止**该次 commit / push，作为提交前的编译验证兜底。

## 提交规范

- 提交信息（commit message）采用 **Angular 风格**：`<emoji> <type>: <subject>`（如 `✨ feat: 新增按钮组件`），`type` 前需带上面对应的 emoji：
  - `🎉` `init`：项目初始化。
  - `✨` `feat`：新功能 / 新组件。
  - `🐛` `fix`：缺陷修复。
  - `📃` `docs`：文档改动。
  - `🌈` `style`：样式 / 格式调整（不影响逻辑）。
  - `🦄` `refactor`：重构，不新增功能也不修 bug。
  - `🎈` `perf`：性能优化。
  - `🧪` `test`：新增 / 修改测试。
  - `🔧` `build`：构建脚本 / 依赖等改动。
  - `🐳` `ci`：CI 配置文件改动。
  - `↩` `revert`：回滚提交。
- body 若含多项内容，需用 `- ` 写成 Markdown 无序列表，逐项列举（如 `- 修复关闭按钮无法点击。`、`- 补全类型导出。`）。
- PR 的标题与 Commit 提交信息保持一致，同样使用 `<emoji> <type>: <subject>` 格式；PR body 若含多项内容也需用 `- ` 写成 Markdown 无序列表逐项列举。

## 版本管理

- 所有版本号严格遵循 [SemVer 语义化版本规范](https://semver.org/lang/zh-CN/)：格式 `主版本.次版本.修订版本`（如 `1.2.3`），可带 `-预发布版本`（如 `1.2.3-beta.4`）与 `+构建元数据`（如 `1.2.3-alpha.1+build.5`）。
- 该规范同时适用于：`package.json` 的 `version` 字段、`git tag`、`git release`（GitHub Release），三者保持一致、不得随意标号。
- 版本变更需遵循 SemVer 递增规则：破坏性变更升主版本、新增功能向后兼容升次版本、向后兼容的缺陷修复升修订版本。

## 文档

- 文档标点符号统一：完整叙述句句末添加句号；短列举、专有名词、链接等不加句号。
- 警示块（alert/容器）**仅可使用五种标准类型**：`NOTE`、`TIP`、`IMPORTANT`、`WARNING`、`CAUTION`。类型标记需**全大写**。渲染环境不同语法不同，**写文档前先判断目标平台**，GitHub 与 VitePress 两套用法如下：

  **GitHub 渲染（README、PR、Issue 等）**：GitHub 不支持行内标题与自定义容器，只能使用引用块 `> [!TYPE]`，标题一律用 `####` 作为正文首行，标题与正文之间空一行：

  ```markdown
  > [!WARNING]
  >
  > #### 警告标题
  >
  > 警告正文内容。
  ```

  **VitePress 渲染（docs/ 下的使用/设计文档等）**：VitePress 兼容上文 GitHub 引用块语法，并额外支持行内标题与自定义容器。内容较少用行内标题写法：

  ```markdown
  > [!IMPORTANT] 重要标题
  >
  > 正文内容。
  ```

  包裹内容较多时使用自定义容器 `::: TYPE` 便于排版与增删，结尾用 `:::` 闭合：

  ```markdown
  ::: tip 提示标题
  正文段落一。

  正文段落二。
  :::
  ```
