import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../../router'

const AppRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route element={<route.element />} path={route.path} />
      ))}

      {publicRoutes.map((route) => (
        <Route element={<route.element />} path={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/posts" replace />}></Route>
    </Routes>
  )
}
export default AppRouter
