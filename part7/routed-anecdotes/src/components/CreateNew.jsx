import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/'

const CreateNew = ({ addAnecdote }) => {
  const navigate = useNavigate()
  const contFld = useField('text')
  const authorFld = useField('text')
  const infoField = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: contFld.value, author: authorFld.value, info: infoField.value, votes: 0 })
    navigate('/')
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
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
