import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.scss'

import '../../../src/d-button'
import '../../../src/confirm-button'
import '../../../src/d-icon'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp() {}
} satisfies Theme
