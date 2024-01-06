import React, { useState } from 'react'

const Popout: React.FC = ({event, setDateList, closeModal}) => {
  
  

  const handleDate = (entry: object) => {
      setDateList(entry)
  }
 // console.log(event, "in popout")

  return (
    <div className='popout'>
     
        <li  >
          
        <h1 >Details for {event.name}</h1>
        <p>Tickets Price - {`Min : ${event.priceRanges[0].min}, Max:${event.priceRanges[0].max}  `}</p>
        <p>Venue: {event._embedded.venues[0].name} </p>
        <p>Dates {event.name}</p>
        <p>URL - {event.url}</p>
        <p>More Like {event.name}</p>
        {/* <button onClick={() => setDateList(event)}>Click to Add to List</button> */}
        <button onClick={closeModal}>X</button>
        </li>
   
    </div>
  )
}

export default Popout