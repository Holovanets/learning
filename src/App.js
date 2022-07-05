import React, { useState } from 'react'
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

  const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>

      {posts.length ? (
        <PostList remove={removePost} posts={posts} title="Список постов" />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
      )}
    </div>
  )
}

export default App
