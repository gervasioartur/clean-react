import Header from '@/presentation/components/login-header/login-header'
import Spinner from '@/presentation/components/spinner/spinner'
import Footer from '@/presentation/components/footer/footer'
import React from 'react'
import Styles from './login-styles.scss'
import Input from '@/presentation/input/input'

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
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
