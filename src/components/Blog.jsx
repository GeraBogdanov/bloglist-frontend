import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonName, setButtonName] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonName(visible ? 'view' : 'hide')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonName}</button>
      <div style={showWhenVisible}>
        {blog.url}<br />
        {blog.likes}<br />
        { blog.user && blog.user.username}<br />
      </div>
    </div>
  )
}

export default Blog