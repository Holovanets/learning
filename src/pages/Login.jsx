import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import { AuthContext } from '../context'
import MyInput from './../components/UI/input/MyInput'

const Login = () => {
  const { setIsAuth } = useContext(AuthContext)

  const login = (event) => {
    event.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth', true)
  }
  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Логин" />
        <MyInput type="password" placeholder="Пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  )
}

export default Login
