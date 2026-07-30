import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => {
      setAnecdotes(data)
    })
  }, [])

  const onAddEntry = (newEntry) => {
    anecdoteService.createNew(newEntry).then(data => {
      setAnecdotes(anecdotes.concat(data))
    })
  }

  return {
    anecdotes,
    onAddEntry
  }
}