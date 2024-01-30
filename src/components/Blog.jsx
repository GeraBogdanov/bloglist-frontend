import { useState } from 'react'

const Blog = ({ blog, changeLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [buttonName, setButtonName] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonName(visible ? 'view' : 'hide')
  }

  const addLikes = () => {
    blog.likes = ++blog.likes
    changeLike(blog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  const showDelete = blog.user && blog.user.username === user.username ? true :false

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility} className='view-button'>{buttonName}</button>
      <div style={showWhenVisible} className='additionalInfo'>
        {blog.url}<br />
        {blog.likes}<button onClick={addLikes} className='like-button'>like</button><br />
        {blog.user && blog.user.username}<br />
        {showDelete && <button onClick={deleteBlog}>remove</button>}
      </div>
    </div>
  )
}

export default Blog