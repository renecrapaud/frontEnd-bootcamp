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
    
    function Total(props) {
        return (
        <>
            <p>
            Number of exercises
            : {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
            </p>
        </>
        )
    }

    function Course(props) {
        return (
            <>
                <Header course={props.course.name} />
                <Content parts={props.course.parts} />
                <Total parts={props.course.parts} />
            </>
        )
    }

export default Course