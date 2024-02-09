import React,{useState} from 'react';
import TwilioMessaging from './twilioConfig.jsx'



interface ItinProps {
    dateList: Record<string,any>[];  
}

const Itinerary:React.FC<ItinProps> = ({dateList}) => {
  // const [messageBody, setMessageBody] = useState({
  //   from: ''
  //   body: ''
  // })
  return (
    <div>
        
        {dateList.length > 0 ? (
        <div className='itin'>
          {dateList.map((date)=>(
            <p>{date?.name}</p>
          ))}
        </div>
      ): <div>No items, Add some locations to your list!</div>}

      {dateList.length> 0 && <TwilioMessaging/>}
    </div>

  )
}

export default Itinerary