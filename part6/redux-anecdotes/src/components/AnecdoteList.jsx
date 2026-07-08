import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from './reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.sort(function (a, b) {
    return b.votes - a.votes
  }))
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteOn(id))
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