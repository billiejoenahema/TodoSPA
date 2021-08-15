import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLogin } from '../../queries/AuthQuery'

const LoginPage: React.VFC = () => {
  const login = useLogin()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('123456789')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login.mutate({ email, password })
  }

  return (
    <div className="login-page">
      <div className="login-panel">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-group">
            <label>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" className="btn">ログイン</button>
        </form>
      </div>
      <div className="links"><a href="/help">ヘルプ</a></div>
    </div>
  )
}

export default LoginPage
