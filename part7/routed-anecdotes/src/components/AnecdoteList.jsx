import { useAnecdotes } from "../hooks/anecdotes"

const AnecdoteList = () => {
  const { anecdotes, onDeleteEntry } = useAnecdotes()

  const onDelete = (event) => {
    const idToDel = event.target.attributes.id.value
    onDeleteEntry(idToDel)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}<button id={anecdote.id} onClick={onDelete}>Delete</button></li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList
