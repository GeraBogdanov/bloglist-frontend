import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    id: '65a452d7e04b41263b79c3a8',
    title: 'My Title',
    author: 'German',
    url: 'http://example.com',
    likes: 5,
    user:{
      username:'kkkk'
    }
  }
  const user = {
    username:'kkkk'
  }
  beforeEach(() => {
    container =  render(<Blog blog={blog} user={user} />).container
  })

  test('render content', () => {
    const element = screen.getByText('My Title German')
    expect(element).toBeDefined()

    const div = container.querySelector('.additionalInfo')
    expect(div).toHaveStyle('display: none')

    const likesElement = screen.queryByText('5')
    expect(likesElement).toBeNull()

    const urlElement = screen.queryByText('http://example.com')
    expect(urlElement).toBeNull()
  })

//   test('reder content after clicking button', async () => {
//     const element = screen.getByText('My Title German')
//     expect(element).toBeDefined()
//     const div = container.querySelector('.additionalInfo')
//     expect(div).toHaveStyle('display: none')

//     const user = userEvent.setup()
//     const button = screen.getByText('view')
//     await user.click(button)

//     expect(div).toHaveTextContent('5')
//     expect(div).toHaveTextContent('http://example.com')
//   })
// })