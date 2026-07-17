const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (newEntry) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEntry)
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to save entry')
  }

  return await response.json()
}

export const updateAnecdote = async (updatedEntry) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEntry)
  }

  const response = await fetch(`${baseUrl}/${updatedEntry.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update entry')
  }

  return await response.json()
}
