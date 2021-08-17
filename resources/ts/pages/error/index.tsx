import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.VFC = () => {

  return (
    <div className="align-center">
      <h1>404 Not Found</h1>
      <p>ページが見つかりませんでした。</p>
      <Link to="/">
        Homeへ戻る
      </Link>
    </div>
  )
}

export default NotFoundPage
