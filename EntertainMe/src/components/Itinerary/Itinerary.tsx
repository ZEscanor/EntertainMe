import React,{useState} from 'react';
import TwilioMessaging from './twilioConfig.jsx'
import Popout from '../Map/Popout.js';
import { Modal, Rate} from 'antd';







interface ItinProps {
    dateList: Record<string,any>[];  
}

const Itinerary:React.FC<ItinProps> = ({dateList}) => {
  // const [messageBody, setMessageBody] = useState({
  //   from: ''
  //   body: ''
  // })
  const [loading, setLoading] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const showModal = (index:number) => {
   // setOpen(true);
   setOpenModalIndex(index)
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenModalIndex(null)
    }, 3000);
  };

  const handleCancel = () => {
    setOpenModalIndex(null)
  };

  return (
    <div>
        
        {dateList.length > 0 ? (
        <div className='itin'>
          {dateList.map((date, index)=>(
          <>
          <div key={index}>
          <p className='liste' onClick={()=>showModal(index)}>{date?.name}</p>
            <Modal
            
            open={openModalIndex === index}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
            >
                 <h1>{date.name}</h1>
      {/* Logic For Events From TicketMaster */}
                 { date.priceRanges && (
    <p>Tickets Price Range - {`$${date?.priceRanges[0]?.min} - $${date?.priceRanges[0]?.max}  `}</p>
)}
        {date._embedded && date._embedded.venues && (
    <p>Venue: {date._embedded.venues[0].name}</p>
)}
         {date.dates && (
    <p>Dates: {date.dates.start.localDate}
    {date.dates.start.localTime}
    </p>
)}



   {/* Logic For Location Directly from Google */}
  {date.rating && (
    <div>Rating:
      <Rate disabled defaultValue={date.rating} />
      
       </div>
  )}
   {date.formatted_address && (
    <p>Address: {date.formatted_address}</p>
)}

{date.types && (
    <p>
     Types: {date.types.map((type, index) => (
        <span key={index}>{type.toUpperCase()}{index !== date.types.length - 1 && ', '}</span>
    ))}
</p>
)}


     


        { date.url && <p>URL - <a href={date?.url} target='blank'>{date?.url}</a></p> }
            </Modal>
            </div>
            </>
          ))}
        </div>
      ): <div>No items, Add some locations to your list!</div>}

      {/* {dateList.length > 0 && <button onClick={()=> console.log(dateList)}>
        Send Message
        </button>} */}
    </div>

  )
}

export default Itinerary