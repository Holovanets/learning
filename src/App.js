import React, { useState, useMemo } from 'react'
import PostFilter from './components/PostFilter.jsx'
import PostForm from './components/PostForm.jsx'
import PostItem from './components/PostItem.jsx'
import PostList from './components/PostList.jsx'
import MyButton from './components/UI/button/MyButton.jsx'
import MyInput from './components/UI/input/MyInput.jsx'
import MySelect from './components/UI/select/MySelect.jsx'

import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'аа', body: 'сс' },
    { id: 2, title: 'ыы 2', body: 'аа' },
    { id: 3, title: 'цц 3', body: 'рр' },
    { id: 4, title: 'ее 4', body: 'аа' },
  ])

  const [filter, setFilter] = useState({ sort: '', query: '' })
  // const [selectedSort, setSelectedSort] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')

  const sortedPosts = useMemo(() => {
    console.log('Отработала функция поиска')
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    )
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      {sortedAndSearchedPosts.length ? (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Список постов"
        />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
      )}
    </div>
  )
}

export default App
