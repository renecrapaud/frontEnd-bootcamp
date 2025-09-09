import { useState } from 'react'

const Button = ({text, hdlClick}) => {
  return (
    <button onClick={hdlClick}>{text}</button>
  )
}

const StatisticLine  = ({text, value}) => {
  return(
    <>
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) =>{
  if(props.all != 0){
    return(
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine  text="good" value={props.good} />
            <StatisticLine  text="neutral" value={props.neutral} />
            <StatisticLine  text="bad" value={props.bad} />
            <StatisticLine  text="all" value={props.all} />
            <StatisticLine  text="average" value={props.average} />
            <StatisticLine  text="positive" value={props.positive + " %"} />
          </tbody>
        </table>
      </>
    )
  } else {
    return(  
      <h3>No feedback given</h3>
    )
  }
}
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
      <Button text="good" hdlClick={hdlSetGood} />
      <Button text="neutral" hdlClick={hdlSetNeutral} />
      <Button text="bad" hdlClick={hdlSetBad} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all}
                  average={average} positive={positive}
      />
    </>
  )
}

export default App
