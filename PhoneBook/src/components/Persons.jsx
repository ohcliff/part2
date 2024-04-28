const Persons = ({personsToDisplay}) => {
    return (
        <div>
        {personsToDisplay.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    )
}

export default Persons