import { defineComponent, h, onMounted, watch } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import "./style.scss";

import "../../../src/index";

import ColorToken from "../components/ColorToken.vue";
import FontToken from "../components/FontToken.vue";
import IconSizeToken from "../components/IconSizeToken.vue";
import Palette from "../components/Palette.vue";
import RadiusToken from "../components/RadiusToken.vue";
import SpacingToken from "../components/SpacingToken.vue";
import ThemeToggle from "../components/ThemeToggle.vue";

/**
 * 把 VitePress 的亮/暗状态同步到 body 的 theme-mode 属性，
 * 驱动 DockV 的 token 变量（global.scss）跟随主题切换。
 */
const Layout = defineComponent({
  setup() {
    const { isDark } = useData();
    const syncThemeMode = (dark: boolean) => {
      document.body.setAttribute("theme-mode", dark ? "dark" : "light");
    };
    // 首次进入页面时按 VitePress 恢复的主题同步一次
    onMounted(() => syncThemeMode(isDark.value));
    // 之后跟随切换按钮实时同步
    watch(isDark, syncThemeMode);
    return () => h(DefaultTheme.Layout, null, {});
  },
});

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("Palette", Palette);
    app.component("ColorToken", ColorToken);
    app.component("FontToken", FontToken);
    app.component("IconSizeToken", IconSizeToken);
    app.component("RadiusToken", RadiusToken);
    app.component("SpacingToken", SpacingToken);
    app.component("ThemeToggle", ThemeToggle);
  },
} satisfies Theme;
