import {createSlice} from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteOn(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const anecdoteChanged = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        (anecdote.id === id ? anecdoteChanged : anecdote)).sort(function (a, b) {
          return b.votes - a.votes
          })
    },
    addNewAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, addNewAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdoteEntry = (content) => {
  return async dispatch => {
    const newEntry = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(newEntry))
  }
}

export const { voteOn } = anecdoteSlice.actions
export default anecdoteSlice.reducer
