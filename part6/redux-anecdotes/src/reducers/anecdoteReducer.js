import {createSlice} from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteOn(state, action) {
      const entryChange = action.payload
      const id = entryChange.id
      return state.map(anecdote =>
        (anecdote.id === id ? entryChange : anecdote)).sort(function (a, b) {
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

const { setAnecdotes, addNewAnecdote, voteOn } = anecdoteSlice.actions

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

export const updateVote = (content) => {
  return async dispatch => {
    const updatedEntry = await anecdoteService.sumVote(content)
    dispatch(voteOn(updatedEntry))
  }
}

export default anecdoteSlice.reducer
