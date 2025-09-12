const Filter = ({searchField, hdlSearchFld}) => {
    return (
        <div>
            <span>filter shown with: </span>
        <input value={searchField} onChange={hdlSearchFld}/>  
      </div>
    )
}

export default Filter;