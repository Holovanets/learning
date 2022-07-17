import React from 'react'
import { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context'
import { publicRoutes, privateRoutes } from '../../router'
import Loader from './Loader/Loader'

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext)
  console.log(isAuth)

  if (isLoading) {
    return <Loader />
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route element={<route.element />} key={route.path} path={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route element={<route.element />} key={route.path} path={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
export default AppRouter
