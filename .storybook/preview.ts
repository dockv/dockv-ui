import type { Preview } from "@storybook/web-components-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../src/styles/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  // 工具栏提供 Light / Dark 切换，选择后把 body 的 theme-mode 属性设为对应值，
  // 与 VitePress 文档站的同步逻辑一致，驱动 DockV 组件跟随主题切换。
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "theme-mode",
      parentSelector: "body",
    }),
  ],
};

export default preview;
