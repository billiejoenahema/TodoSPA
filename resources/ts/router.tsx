import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import TaskPage from './pages/tasks'
import LoginPage from './pages/login'
import HelpPage from './pages/help'

const router = () => {
  return (
    <BrowserRouter>
      <header className="global-head">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>
      </header>
      <Switch>
        <Route exact path="/">
          <TaskPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/help">
          <HelpPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default router
