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
    url: string;
    // Add any other properties your 'event' object might have
  };
  modal?: boolean;
  updateDates?: (newDates: Record<string, any>) => void; // Adjust this type according to setDateList function
  closeModal?: (event: string) => void; // Adjust this type according to closeModal function
}

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
        <p>Tickets Price Range - {`$${event.priceRanges[0]?.min} - $${event.priceRanges[0]?.max}  `}</p>
        <p>Venue: {event._embedded.venues[0]?.name}</p>
        <p>Dates {event.name}</p>
        <p>URL - <a href={event.url} target='blank'>{event.url}</a></p>
      
      </Modal>
      </>
    ) : (
      <p>No event details available</p>
    )}
  
</div>
  )

}

export default Popout