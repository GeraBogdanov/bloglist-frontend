import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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

  test('render content', () => {
    const container =  render(<Blog blog={blog} user={user} />).container

    const element = screen.getByText('My Title German')
    expect(element).toBeDefined()

    const div = container.querySelector('.additionalInfo')
    expect(div).toHaveStyle('display: none')

    const likesElement = screen.queryByText('5')
    expect(likesElement).toBeNull()

    const urlElement = screen.queryByText('http://example.com')
    expect(urlElement).toBeNull()
  })

  test('reder content after clicking button', async () => {
    const container =  render(<Blog blog={blog} user={user} />).container
    const element = screen.getByText('My Title German')
    expect(element).toBeDefined()
    const div = container.querySelector('.additionalInfo')
    expect(div).toHaveStyle('display: none')

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(div).toHaveTextContent('5')
    expect(div).toHaveTextContent('http://example.com')
  })

  test('click button twice add to likes', async () => {

    const mockHandler = jest.fn()
    const container =  render(<Blog blog={blog} user={user} changeLike={mockHandler}/>).container

    const div = container.querySelector('.additionalInfo')
    const user1 = userEvent.setup()
    const button = screen.findAllByAltText('view')
    await user1.click(button[0])
    expect(div).toHaveTextContent('5')
    const likeButton = screen.getByText('like')
    await user1.click(likeButton)
    await user1.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})