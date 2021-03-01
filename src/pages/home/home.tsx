import HelloWorld from '../../components/hello-world'
import TokenStatus from '../../components/token-status'
import useTitle from '../../hooks/title'
import CFC from '../../types/cfc'
import useStyles from './styles'

const HomePage: CFC = () => {
  const styles = useStyles()
  useTitle('Home')

  return (
    <div>
      <TokenStatus />
    </div>
  )
}

export default HomePage
