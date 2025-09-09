const Header = (props) =>{
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) =>{
  return (
    <>
      <p>
        {props.partObj.name} {props.partObj.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part partObj={props.parts[0]} />
      <Part partObj={props.parts[1]} />
      <Part partObj={props.parts[2]} />
    </>
  )
}

function Total(props) {
  return (
    <>
      <p>
        Number of exercises 
        {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </>
  )
}

function App() {
  
  const course = 'Half stack application development'
  const parts = [
    { name: 'Fundamentals of react',
      exercises: 10 },
    { name: 'Using props to pass data',
      exercises: 7 },
    { name: 'State of a component',
      exercises: 14 } ]

  return (
    <>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
    </>
  )
}

export default App
