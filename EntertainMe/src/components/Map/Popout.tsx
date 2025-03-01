import React, { useState } from 'react';
import { Modal } from 'antd';




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
    dates: {
      start:{
        localDate: string;
        localTime: string;
      }
    };
    url: string;
    // Add any other properties your 'event' object might have
  };
  modal?: boolean;
  updateDates?: (newDates: Record<string, any>) => void; // Adjust this type according to setDateList function
  closeModal?: (event: string) => void; // Adjust this type according to closeModal function
}

function formatReadableDate(dateStr, timeStr) {
  let dateTime = new Date(`${dateStr}T${timeStr}`); // Combine date and time properly
  
  return dateTime.toLocaleString("en-US", { 
      month: "long", day: "numeric", year: "numeric", 
      hour: "2-digit", minute: "2-digit", hour12: true 
  });
}
// Example usage

// Output: "May 1, 2025, 7:30 PM"

const Popout: React.FC<PopoutProps> = ({event, closeModal, updateDates ,modal}) => {
  
  //console.log(event, "in popout")'
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      closeModal(null)
    }, 3000);
  };

  const handleCancel = () => {
    closeModal(null)
  };


  return (
    <div className='popout'>
  
    {event ? (
      <>
      <Modal
      open={modal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <button onClick={() => {
          updateDates(event);
          closeModal(event?.name);
        }}>Click to Add to List</button>,
        <button onClick={() => closeModal(null)}>X</button>
      ]}
      
      >
       
        <h1>{event.name}</h1>


        { event.priceRanges && (
    <p>Tickets Price Range - {`$${event?.priceRanges[0]?.min} - $${event?.priceRanges[0]?.max}  `}</p>
)}
        {event._embedded && event._embedded.venues && (
    <p>Venue: {event._embedded.venues[0].name}</p>
)}
         {event.dates && (
    <p>Dates: {formatReadableDate(event.dates.start.localDate,event.dates.start.localTime )}
    {/* {event.dates.start.localTime} */}
    </p>
)}


{ event.url && <p>URL - <a href={event?.url} target='blank'>{event?.url}</a></p> }
      </Modal>
      </>
    ) : (
      <p>No event details available</p>
    )}
  
</div>
  )

}

export default Popout