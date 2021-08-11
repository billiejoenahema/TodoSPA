import React, { useState } from 'react'
import axios from 'axios'

const LoginPage: React.VFC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    // ログイン時にCSRFトークンを初期化
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios
        .post('/api/login', {
          email,
          password
        })
        .then(res => {
          console.log(res.data)
          if (res.data.result) {
            console.log('ログイン成功')
          } else {
            console.log(res.data.message)
            console.log('ログイン失敗')
          }
        })
        .catch(err => {
          console.log(err.response)
          console.log('ログイン失敗')
        })
    })
  }

  return (
    <div className="login-page">
      <div className="login-panel">
        <form onSubmit={login}>
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
      <div className="links"><a href="#">ヘルプ</a></div>
    </div>
  )
}

export default LoginPage
