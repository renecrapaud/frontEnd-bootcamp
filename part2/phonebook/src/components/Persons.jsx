const Persons = ({personsFiltered}) => {
    return (
        <>
            {personsFiltered.map(person => <p key={person.name}>{person.name} <span>{person.number}</span></p>)}
        </>
    )
}

export default Persons