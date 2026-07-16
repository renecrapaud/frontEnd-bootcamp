import {createSlice} from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
      state.push(asObject(content))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteOn, addNewAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
