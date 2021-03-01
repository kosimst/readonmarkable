import { Story, Meta } from '@storybook/react/types-6-0'

import SharePageLoaderPure, {
  SharePageLoaderPureProps,
} from './share-page-loader.pure'

export default {
  title: 'SharePageLoaderPure',
  component: SharePageLoaderPure,
  argTypes: {},
} as Meta

const Template: Story<SharePageLoaderPureProps> = ({ ...args }) => (
  <SharePageLoaderPure {...args} />
)

export const UploadingArticle = Template.bind({})
UploadingArticle.args = {
  articleDescription: 'A very long Wikipedia article about House Music',
  articleName: 'House Music',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/7/75/Wikipedia_mobile_app_logo.png',
  pageName: 'Wikipedia',
  loading: true,
  status: 'Uploading',
}

export const DetailsLoading = Template.bind({})
DetailsLoading.args = {
  loading: false,
}

export const Error = Template.bind({})
Error.args = {
  error: 'No URL found',
}
