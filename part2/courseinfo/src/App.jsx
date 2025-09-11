import Course from "./components/Course"

function App() {
  
  const course = 
    { name: 'Half stack application development',
      parts: [
        { name: 'Fundamentals of react',
          exercises: 10,
          id: 1 },
        { name: 'Using props to pass data',
          exercises: 7,
          id: 2 },
        { name: 'State of a component',
          exercises: 14,
          id: 3 } 
      ] 
    }

  return (
    <>
        <Course course={course} />
    </>
  )
}

export default App
