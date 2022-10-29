import { Logo } from '@/presentation/components'
import React, { memo } from 'react'
import Styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4DEV - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
