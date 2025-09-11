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
            { props.parts.map(part=>
                <Part key={part.id} partObj={part} />
            )}
        </>
        )
    }

    function Course(props) {
        return (
            <>
                <Header course={props.course.name} />
                <Content parts={props.course.parts} />
            </>
        )
    }

export default Course