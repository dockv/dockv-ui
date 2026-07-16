import type { Preview } from '@storybook/web-components'

import '../src/styles/global/palette.scss'
import '../src/styles/global/global.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'todo'
    }
  }
}

export default preview
