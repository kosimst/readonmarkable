import useToken from '../../hooks/token'
import CFC from '../../types/cfc'
import TokenStatusPure from './token-status.pure'

const TokenStatus: CFC<TokenStatusProps> = ({ className, style }) => {
  const { token, error, deleteToken, getToken, loading } = useToken()

  return (
    <TokenStatusPure
      className={className}
      style={style}
      error={error}
      onDelete={deleteToken}
      onSubmit={getToken}
      token={token}
      loading={loading}
    />
  )
}

export interface TokenStatusProps {}

export default TokenStatus
