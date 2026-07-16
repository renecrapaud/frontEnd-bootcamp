import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
      event.target.anecdote.value = ''
    if (content.trim() !== '') {
      const anecdoteAdded = await anecdoteServices.createNew(content)
      dispatch(addNewAnecdote(anecdoteAdded))
      dispatch(showNotification('New anecdote added'))
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