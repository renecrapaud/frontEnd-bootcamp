import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'

import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdotesServices from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesServices.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
