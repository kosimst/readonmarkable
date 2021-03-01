import clsx from 'clsx'
import CFC from '../../types/cfc'
import useStyles from './styles'
import Alert from '@material-ui/lab/Alert'
import { Button, TextField, Typography, Box } from '@material-ui/core'
import { useState } from 'react'

const TokenStatusPure: CFC<TokenStatusPureProps> = ({
  className,
  style,
  error,
  onDelete,
  onSubmit,
  token,
  loading,
}) => {
  const styles = useStyles()

  const [code, setCode] = useState<string>('')

  return (
    <div className={clsx(className)} style={style}>
      {token ? (
        <>
          <Alert severity="success">
            <Typography>You're all set up!</Typography>
          </Alert>
          <Box marginTop={4}>
            <Button
              className={styles.button}
              variant="contained"
              onClick={onDelete}
              color="primary"
            >
              <span>Forget connection</span>
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Alert severity="info">
            <span>Please connect to your </span>
            <a href="https://my.remarkable.com/connect/mobile">
              ReMarkable Account
            </a>
          </Alert>
          <Box marginTop={4}>
            <TextField
              variant="outlined"
              placeholder="Code..."
              label="Code"
              className={styles.input}
              value={code}
              onChange={({ target: { value } }) => setCode(value)}
              error={!!error}
              helperText={error}
              focused
            />
          </Box>
          <Box marginTop={2}>
            <Button
              variant="contained"
              className={styles.submitButton}
              color="primary"
              onClick={() => {
                onSubmit(code)
              }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Connect'}
            </Button>
          </Box>
        </>
      )}
    </div>
  )
}

export interface TokenStatusPureProps {
  token: string | null
  error: string | null
  onSubmit: (code: string) => void
  onDelete: () => void
  loading: boolean
}

export default TokenStatusPure
