import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const getAverage = (newVal) => {
    return (good - bad + newVal) / (all + 1)
  }

  const getNewPositive = (newVal) => {
    return ((good + newVal) / (all + 1)) * 100
  }

  const hdlSetGood = () => {
    let newAll = all + 1
    setAll(newAll)
    setGood(good + 1)
    setAverage(getAverage(1))
    setPositive(getNewPositive(1))
  }

  const hdlSetBad = () => {
    let newAll = all + 1
    setAll(newAll)
    setBad(bad + 1)
    setAverage(getAverage(-1))
    setPositive(getNewPositive(0))
  }

  const hdlSetNeutral = () => {
    let newAll = all + 1
    setAll(newAll)
    setNeutral(neutral + 1)
    setAverage(getAverage(0))
    setPositive(getNewPositive(0))
  }

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={hdlSetGood}>good</button>
      <button onClick={hdlSetNeutral}>neutral</button>
      <button onClick={hdlSetBad}>bad</button>
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive} %</p>
    </>
  )
}

export default App
