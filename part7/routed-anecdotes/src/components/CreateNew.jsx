import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/'
import { useAnecdotes } from '../hooks/anecdotes'

const CreateNew = () => {
  const { onAddEntry } = useAnecdotes()

  const addAnecdote = (anecdote) => {
    onAddEntry(anecdote)
  }

  const navigate = useNavigate()
  const contFld = useField('text')
  const authorFld = useField('text')
  const infoField = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: contFld.value, author: authorFld.value, info: infoField.value, votes: 0 })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    contFld.onReset()
    authorFld.onReset()
    infoField.onReset()
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contFld}/>
        </div>
        <div>
          author
          <input name='author' {...authorFld} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoField} />
        </div>
        <button type='submit'>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
