import { useDispatch } from 'react-redux'
import { addAnecdoteEntry } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
      event.target.anecdote.value = ''
    if (content.trim() !== '') {
      dispatch(addAnecdoteEntry(content))
      dispatch(showNotification('New anecdote entry added'))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm