import Footer from '@/presentation/components/footer/footer'
import FormStatus from '@/presentation/components/form-status/form-status'
import Header from '@/presentation/components/login-header/login-header'
import Input from '@/presentation/input/input'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu email" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit" className={Styles.submit}>Entrar</button>
        <span className={Styles.link}>Criar Conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
