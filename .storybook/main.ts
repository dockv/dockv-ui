import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  // 必须明确目录层级，不能用 src/**/*，会导致自动导入dist生成的文件
  // 会被一并索引，因缺少 default export 导致构建失败。
  stories: [
    '../src/**/*.mdx',
    '../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-themes'
  ],
  framework: '@storybook/web-components-vite'
}

export default config
