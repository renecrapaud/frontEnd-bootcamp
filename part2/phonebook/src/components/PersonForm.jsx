const PersonForm = ({addName, newName, hdlNameChg, hdlNumberChg, newNumber}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={hdlNameChg}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={hdlNumberChg}/>
            </div>
            <div>
                <button type="submit" onClick={addName}>add</button>
            </div>
        </form>
    )}

export default PersonForm;