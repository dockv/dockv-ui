import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "DockV UI",
  description: "A Web Component based UI library for React and Vue",
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src:'/logo.png',alt:'' },
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/components' }
    ],

    sidebar: [
      {
        text: 'Components 组件',
        items: [
          { text: 'Button | 按钮', link: '/components/button' },
          { text: 'Icon | 图标', link: '/components/icon' },
        ]
      },
      {
        text: 'Tokens 设计变量',
        link: '/tokens'
      },
      {
        text: 'Global Config 全局配置',
        link: '/global-config'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dockv/dockv-ui' }
    ],

    footer: {
      copyright: 'Copyright © 2026-present DockV'
    },

    search: {
      provider: 'local'
    },

    outline:{
      level: 'deep'
    }
  }
})
