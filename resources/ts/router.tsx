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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <TaskPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default router
