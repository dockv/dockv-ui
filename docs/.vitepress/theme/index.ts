import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.scss'

import '../../../src/dv-button'
import '../../../src/dv-icon'
import '../../../src/dv-notification'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp() {}
} satisfies Theme
