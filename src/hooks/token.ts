import { useCallback, useEffect, useState } from 'react'
import api from '../middlewares/firebase/functions'

const useToken = () => {
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    setToken(savedToken)
  }, [])

  const deleteToken = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
  }, [])

  const getToken = useCallback(
    async (code: string) => {
      setLoading(true)
      setError(null)
      deleteToken()
      try {
        const newToken = await api.registerDevice(code)

        setToken(newToken)
        localStorage.setItem('token', newToken)
      } catch (e) {
        setError(e?.message || 'Internal error')
      } finally {
        setLoading(false)
      }
    },
    [deleteToken]
  )

  return { token, loading, error, getToken, deleteToken }
}

export default useToken
