import { Suspense } from 'react'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRoutes'
import { useRoutes } from 'react-router-dom'
import GameLoader from '@/components/loader/loader'

const AppRoutes = () => {
    const appRoutes = useRoutes([publicRoutes, privateRoutes]);
  return (
    <Suspense fallback={<GameLoader />}>
        {appRoutes}
    </Suspense>
  )
}

export default AppRoutes