import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from './../hooks/useFetching'
import PostService from './../components/API/PostService'
import Loader from '../components/UI/Loader/Loader'

const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostsById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h1>Страница поста. ID: {params.id}</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Комментарии</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginTop: 15 }}>
              <h4>{comment.email}</h4>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default PostIdPage
