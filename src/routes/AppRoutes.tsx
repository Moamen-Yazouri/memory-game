import { Suspense } from 'react'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRoutes'
import { useRoutes } from 'react-router-dom'

const AppRoutes = () => {
    const appRoutes = useRoutes([publicRoutes, privateRoutes]);
  return (
    <Suspense fallback={<>loading</>}>
        {appRoutes}
    </Suspense>
  )
}

export default AppRoutes