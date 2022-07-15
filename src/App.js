import axios from 'axios'
import React, { useState, useMemo } from 'react'
import { useEffect } from 'react'
import PostService from './components/API/PostService.js'
import PostFilter from './components/PostFilter.jsx'
import PostForm from './components/PostForm.jsx'
import PostItem from './components/PostItem.jsx'
import PostList from './components/PostList.jsx'
import MyButton from './components/UI/button/MyButton.jsx'
import MyInput from './components/UI/input/MyInput.jsx'
import Loader from './components/UI/Loader/Loader.jsx'
import MyModal from './components/UI/MyModal/MyModal.jsx'
import MySelect from './components/UI/select/MySelect.jsx'
import { useFetching } from './hooks/useFetching.js'
import { usePosts } from './hooks/usePosts.js'

import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, isPostsLading, postError] = useFetching(async () => {
    const posts = await PostService.getAll()
    setPosts(posts)
  })
  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ощшибка ${postError}</h1>}
      {isPostsLading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Список постов"
        />
      )}
    </div>
  )
}

export default App
