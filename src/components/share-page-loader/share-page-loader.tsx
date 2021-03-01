import CFC from '../../types/cfc'
import SharePageLoaderPure from './share-page-loader.pure'
import ArticleDetails from '../../../definitions/types/article-details'
import { useCallback, useEffect, useState } from 'react'
import api from '../../middlewares/firebase/functions'
import useToken from '../../hooks/token'
import Alert from '@material-ui/lab/Alert'

const SharePageLoader: CFC<SharePageLoaderProps> = ({
  className,
  style,
  url,
}) => {
  const [articleDetails, setArticleDetails] = useState<
    ArticleDetails | undefined
  >()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const { token } = useToken()

  const uploadArticle = useCallback(async () => {
    setError(undefined)
    try {
      if (!url) throw new Error('No URL found')
      if (!token) return
      setArticleDetails(await api.webpageToRemarkable({ url, token }))
      setLoading(false)
    } catch (e) {
      setError(e?.message || String(e))
    }
  }, [token, url])

  useEffect(() => {
    uploadArticle()
  }, [uploadArticle])

  return token ? (
    <SharePageLoaderPure
      className={className}
      style={style}
      articleDescription={articleDetails?.articleDescription}
      articleName={articleDetails?.articleName}
      imageUrl={articleDetails?.imageUrl}
      loading={loading}
      pageName={articleDetails?.pageName}
      error={error}
      status={status}
    />
  ) : (
    <Alert severity="warning">Not connected to ReMarkable</Alert>
  )
}

export interface SharePageLoaderProps {
  url?: string
}

export default SharePageLoader
