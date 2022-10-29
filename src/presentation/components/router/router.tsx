import { Login } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/login'} exact component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
