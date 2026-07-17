import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    let filteredAnecdotes = state.filter === '' ? state.anecdotes :
      state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        .sort(function (a, b) {
          return b.votes - a.votes
          })
    return filteredAnecdotes
  })

  const dispatch = useDispatch()

  const vote = id => {
    let entryToUpdate = anecdotes.find(a => a.id === id)
    dispatch(updateVote({ ...entryToUpdate, votes: entryToUpdate.votes + 1 }))
    dispatch(showNotification(`Vote added to:  ${entryToUpdate.content}`))
  }

  return (
    <div>
      {
        anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default AnecdoteList