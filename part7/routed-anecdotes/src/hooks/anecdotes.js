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

  const onDeleteEntry = (id) => {
    anecdoteService.deleteEntry(id).then(data => {
      setAnecdotes(anecdotes.filter(a => a.id !== data.id))
    })
  }

  return {
    anecdotes,
    onAddEntry,
    onDeleteEntry
  }
}