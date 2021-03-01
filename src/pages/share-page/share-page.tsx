import useTitle from '../../hooks/title'
import CFC from '../../types/cfc'
import useStyles from './styles'
import { useQueryParams } from 'hookrouter'
import SharePageLoader from '../../components/share-page-loader'

const SharePagePage: CFC = () => {
  const styles = useStyles()
  useTitle('Share Page')

  const [queryParams] = useQueryParams()

  return (
    <SharePageLoader
      className={styles.sharePageLoader}
      url={queryParams.url || queryParams.text}
    />
  )
}

export default SharePagePage
