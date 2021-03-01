import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import clsx from 'clsx'
import CFC from '../../types/cfc'
import useStyles from './styles'
import Paper from '@material-ui/core/Paper'
import { useEffect, useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded'

const SharePageLoaderPure: CFC<SharePageLoaderPureProps> = ({
  className,
  style,
  articleDescription,
  articleName,
  pageName,
  imageUrl,
  status,
  loading,
  error,
}) => {
  const styles = useStyles()

  const [statusDots, setStatusDots] = useState<'...' | '..' | '.'>('...')
  useEffect(() => {
    const interval = setInterval(
      () =>
        setStatusDots((prev) =>
          prev.length === 3 ? '.' : (`${prev}.` as '..' | '...')
        ),
      500
    )

    return () => clearInterval(interval)
  })

  return (
    <Paper
      className={clsx(className, styles.container)}
      style={style}
      elevation={3}
    >
      {error ? (
        <>
          <ErrorIcon className={styles.errorIcon} />
          <Typography variant="h5" className={styles.errorHeading}>
            Failed to upload
          </Typography>
          <Typography className={styles.errorDetails}>{error}</Typography>
        </>
      ) : (
        <>
          {imageUrl ? (
            <img src={imageUrl} alt="article" className={styles.image} />
          ) : (
            <Skeleton
              variant="rect"
              height={120}
              style={{ display: 'inline-block' }}
              className={styles.imageLoader}
            />
          )}
          <div className={styles.rightSide}>
            <Typography variant="h6">{articleName || <Skeleton />}</Typography>
            <Typography className={styles.articleDescription}>
              {articleDescription || <Skeleton />}
            </Typography>
            <Typography className={styles.status} variant="caption">
              {status}
              {loading && status && statusDots}
            </Typography>
          </div>
          <Typography variant="caption" className={styles.pageName}>
            {pageName || <Skeleton />}
          </Typography>

          {loading && (
            <LinearProgress variant="indeterminate" className={styles.loader} />
          )}
        </>
      )}
    </Paper>
  )
}

export interface SharePageLoaderPureProps {
  pageName?: string
  articleName?: string
  articleDescription?: string
  imageUrl?: string
  loading: boolean
  status?: string
  error?: string
}

export default SharePageLoaderPure
