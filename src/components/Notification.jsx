const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const { message: msg, type: typ } = message;

  const className = () => {
    if (typ === 'error')
      return 'error'
    else if (typ === 'success')
      return 'success'
  }

  return (
    <div className={className()}>
      {msg}
    </div>
  )
}

export default Notification