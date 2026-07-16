import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import '../d-button'

const meta = {
  title: 'Components/Button',
  component: 'd-button',
  tags: ['autodocs'],
  args: {
    type: 'primary',
    variant: 'solid',
    size: 'medium',
    color: '',
    disabled: false
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger']
    },
    variant: {
      control: 'select',
      options: ['light', 'solid', 'ghost', 'outline', 'soft', 'neutral']
    },
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large', 'extra-large']
    },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    iconPosition: { control: 'radio', options: ['left', 'right'] }
  },
  render: ({ type, variant, size, color, disabled, icon, iconPosition }: Record<string, any>) =>
    html`
      <d-button .type=${type} .variant=${variant} .size=${size}
        .color=${color} ?disabled=${disabled}
        .icon=${icon} .iconPosition=${iconPosition}>
        按钮
      </d-button>
    `
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = { args: { variant: 'solid' as const } }
export const Light: Story = { args: { variant: 'light' as const } }
export const Ghost: Story = { args: { variant: 'ghost' as const } }
export const Outline: Story = { args: { variant: 'outline' as const } }
export const Soft: Story = { args: { variant: 'soft' as const } }
export const Neutral: Story = { args: { variant: 'neutral' as const } }
export const Primary: Story = {}
export const Secondary: Story = { args: { type: 'secondary' as const } }
export const Tertiary: Story = { args: { type: 'tertiary' as const } }
export const Success: Story = { args: { type: 'success' as const } }
export const Warning: Story = { args: { type: 'warning' as const } }
export const Danger: Story = { args: { type: 'danger' as const } }
export const ExtraSmall: Story = { args: { size: 'extra-small' as const } }
export const Small: Story = { args: { size: 'small' as const } }
export const Medium: Story = { args: { size: 'medium' as const } }
export const Large: Story = { args: { size: 'large' as const } }
export const ExtraLarge: Story = { args: { size: 'extra-large' as const } }
export const CustomColor: Story = { args: { color: '#39C5BB', variant: 'solid' as const } }
export const WithIcon: Story = {
  args: { icon: 'material-symbols:home', variant: 'solid' }
}

export const Disabled: Story = { args: { disabled: true } }
