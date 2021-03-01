import red from '@material-ui/core/colors/red'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  container: {
    width: 400,
    height: 120,
    overflow: 'hidden',
    backgroundColor: 'white',
    position: 'relative',
    userSelect: 'none',
  },
  image: {
    width: '25%',
    height: '100%',
    position: 'absolute',
    left: 0,
    objectFit: 'cover',
  },
  imageLoader: {
    width: '25%',
  },
  loader: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  rightSide: {
    width: 'calc(75% - 16px)',
    height: 'calc(100% - 24px)',
    position: 'absolute',
    right: 0,
    padding: '12px 8px',
    display: 'inline-block',
  },
  pageName: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    minWidth: 64,
    textAlign: 'right',
  },
  status: {
    opacity: 0.8,
  },
  articleDescription: {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  errorIcon: {
    width: '64px !important',
    height: '64px !important',
    color: red[700],
    position: 'absolute',
    top: 28,
    left: 28,
  },
  errorHeading: {
    position: 'absolute',
    top: '29%',
    left: 120,
  },
  errorDetails: {
    position: 'absolute',
    top: '53.5%',
    left: 120,
  },
}))

export default useStyles
