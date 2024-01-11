import React, { useState } from 'react'


interface PopoutProps {
  event: {
    name: string;
    priceRanges: {
      min: number;
      max: number;
    }[];
    _embedded: {
      venues: {
        name: string;
      }[];
    };
    url: string;
    // Add any other properties your 'event' object might have
  };
  updateDates: (newDates: Record<string, any>) => void; // Adjust this type according to setDateList function
  closeModal: () => void; // Adjust this type according to closeModal function
}

const Popout: React.FC<PopoutProps> = ({event, closeModal, updateDates}) => {
  
 // console.log(event, "in popout")

  return (
    <div className='popout'>
     
        <li  >
          
        <h1 > {event.name}</h1>
        <p>Tickets Price - {`$${event.priceRanges[0].min} - $${event.priceRanges[0].max}  `}</p>
        <p>Venue: {event._embedded.venues[0].name} </p>
        <p>Dates {event.name}</p>
        <p>URL - 
          
          <a href={event.url} target='blank'>{event.url}</a></p>
        {/* <p>More Like {event.name}</p> */}
        <button onClick={()=>updateDates(event)}>Click to Add to List</button>
        <button onClick={closeModal}>X</button>
        </li>
   
    </div>
  )
}

export default Popout