import React, { useState } from 'react'

const Popout: React.FC = ({event}) => {

  
  console.log(event, "in popout")
  return (
    <div>
     
        <div  >
        <h1 >Details for {event.name}</h1>
        <p>Tickets Price - {`Min : ${event.priceRanges[0].min}, Max:${event.priceRanges[0].max}  `}</p>
        <p>Venue: {event._embedded.venues[0].name} </p>
        <p>Dates {event.name}</p>
        <p>URL - {event.url}</p>
        <p>More Like {event.name}</p>
        </div>
   
    </div>
  )
}

export default Popout