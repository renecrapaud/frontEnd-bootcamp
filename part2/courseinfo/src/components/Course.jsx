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
            <h4>
                Total of <span>
                { props.parts.reduce((total, part) => total + part.exercises, 0) }
                </span> exercises
            </h4>
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