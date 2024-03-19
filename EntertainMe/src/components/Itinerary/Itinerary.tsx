import React,{useState} from 'react';
import TwilioMessaging from './twilioConfig.jsx'
import Popout from '../Map/Popout.js';
import { Modal } from 'antd';



interface ItinProps {
    dateList: Record<string,any>[];  
}

const Itinerary:React.FC<ItinProps> = ({dateList}) => {
  // const [messageBody, setMessageBody] = useState({
  //   from: ''
  //   body: ''
  // })
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
        
        {dateList.length > 0 ? (
        <div className='itin liste'>
          {dateList.map((date)=>(
          <>
          <p onClick={showModal}>{date?.name}</p>
            <Modal
            open={open}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
            >
                 <h1>{date.name}</h1>
        <p>Tickets Price Range - {`$${date?.priceRanges[0]?.min} - $${date?.priceRanges[0]?.max}  `}</p>
        <p>Venue: {date?._embedded.venues[0]?.name}</p>
        <p>Dates {date?.name}</p>
        <p>URL - <a href={date?.url} target='blank'>{date?.url}</a></p>
            </Modal>
            </>
          ))}
        </div>
      ): <div>No items, Add some locations to your list!</div>}

      {dateList.length> 0 && <TwilioMessaging/>}
    </div>

  )
}

export default Itinerary