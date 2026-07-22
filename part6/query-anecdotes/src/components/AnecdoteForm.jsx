import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotifyContext from './NotifyContext'

const AnecdoteForm = () => {
  const { dispatch } = useContext(NotifyContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newEntry) => {
      const entries = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], entries.concat(newEntry))
      dispatch({ type: 'SET_NOTIFICATION', message: `Anecdote "${newEntry.content}" has been added` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newAnecdoteMutation.mutate({ content , votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm