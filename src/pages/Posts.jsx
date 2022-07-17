import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import PostService from '../components/API/PostService.js'
import PostFilter from '../components/PostFilter.jsx'
import PostForm from '../components/PostForm.jsx'
import PostList from '../components/PostList.jsx'
import MyButton from '../components/UI/button/MyButton.jsx'
import Loader from '../components/UI/Loader/Loader.jsx'
import MyModal from '../components/UI/MyModal/MyModal.jsx'
import Pagination from '../components/UI/pagination/Pagination.jsx'
import { useFetching } from '../hooks/useFetching.js'
import { useObserver } from '../hooks/useObserver.js'
import { usePosts } from '../hooks/usePosts.js'
import { getPagesArray, getPagesCount } from '../utils/pages.js'
import MySelect from './../components/UI/select/MySelect'

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostsLading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPagesCount(totalCount, limit))
    }
  )

  useObserver(lastElement, page < totalPages, isPostsLading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Элементов на странице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: -1, name: 'Показать все' },
        ]}
      />

      {postError && <h1>Произошла ошибка ${postError}</h1>}

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Список постов"
      />
      <div ref={lastElement} style={{ height: 20, background: 'red' }} />
      {isPostsLading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  )
}

export default Posts
