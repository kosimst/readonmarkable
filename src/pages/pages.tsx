import { useRoutes } from 'hookrouter'
import { lazy, Suspense } from 'react'
import CFC from '../types/cfc'
import LoadingPage from './loading/loading'

const HomePage = lazy(() => import('./home/home'))
const NotFoundPage = lazy(() => import('./not-found/not-found'))
const SharePagePage = lazy(() => import('./share-page/share-page'))

const routes = {
  '/': () => <HomePage />,
  '/share-page': () => <SharePagePage />,
}

const Pages: CFC = () => {
  const currentRoute = useRoutes(routes)

  return (
    <Suspense fallback={<LoadingPage />}>
      {currentRoute || <NotFoundPage />}
    </Suspense>
  )
}

export default Pages
