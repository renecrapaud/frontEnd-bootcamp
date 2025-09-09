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
      <Part partObj={props.part1} />
      <Part partObj={props.part2} />
      <Part partObj={props.part3} />
    </>
  )
}

function Total(props) {
  return (
    <>
      <p>
        Number of exercises {props.ex1 + props.ex2 + props.ex3}
      </p>
    </>
  )
}

function App() {
  
  const course = 'Half stack application development'
  const part1 = { name: 'Fundamentals of react',
                  exercises: 10}
  const part2 = { name: 'Using props to pass data',
                  exercises: 7}
  const part3 = { name: 'State of a component',
                  exercises: 14}

  return (
    <>
        <Header course={course} />
        <Content 
          part1={part1} part2={part2} part3={part3}
        />
        <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
    </>
  )
}

export default App
