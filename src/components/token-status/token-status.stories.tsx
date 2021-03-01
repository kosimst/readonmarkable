import { Story, Meta } from '@storybook/react/types-6-0'

import TokenStatusPure, { TokenStatusPureProps } from './token-status.pure'

export default {
  title: 'TokenStatusPure',
  component: TokenStatusPure,
  argTypes: {},
} as Meta

const Template: Story<TokenStatusPureProps> = ({ ...args }) => (
  <TokenStatusPure
    {...args}
  />
)

export const Default = Template.bind({})
Default.args = {}
