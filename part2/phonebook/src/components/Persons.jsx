import deleteEntry from "../services/phoneBookEntry"
const Persons = ({personsFiltered, hdlClickDel}) => {

    const clickDelete = (event) => {
        if(!confirm(`Delete ${event.target.name}`)){
            return
        }
        hdlClickDel(event.target.id)
    }

    return (
        <>
            { personsFiltered.map(person => 
                <p key={person.name}>{person.name} 
                    <span> {person.number} </span>
                    <button type="button" id={person.id} name={person.name} 
                        onClick={ clickDelete }>Delete</button>
                </p>
            )}
        </>
    )
}

export default Persons