import React from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from './../components/UI/input/MyInput'

const Login = () => {
  return (
    <div>
      <h1>Страница для логина</h1>
      <form>
        <MyInput type="text" placeholder="Логин" />
        <MyInput type="password" placeholder="Пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  )
}

export default Login
