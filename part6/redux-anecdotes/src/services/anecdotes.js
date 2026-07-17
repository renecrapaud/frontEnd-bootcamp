const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  }
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to add anecdote to data base')
  }

  return await response.json()
}

const sumVote = async (content) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(content)
  }
  const response = await fetch(baseUrl.concat('/').concat(content.id), options)
  if (!response.ok) {
    throw new Error('Failed to update votes')
  }

  return await response.json()
}

export default { getAll, createNew, sumVote }