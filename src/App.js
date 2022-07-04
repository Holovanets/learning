import React, { useState } from 'react'
import PostItem from './components/PostItem.jsx'
import PostList from './components/PostList.jsx'

import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' },
    { id: 4, title: 'JavaScript 4', body: 'Description' },
  ])
  return (
    <div className="App">
      <PostList posts={posts} />
    </div>
  )
}

export default App
