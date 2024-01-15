import React from 'react'


interface ItinProps {
    dateList: Record<string,any>[];  
}

const Itinerary:React.FC<ItinProps> = ({dateList}) => {
  return (
    <div>
        
        {dateList.length > 0 ? (
        <div className='itin'>
          {dateList.map((date)=>(
            <p>{date?.name}</p>
          ))}
        </div>
      ): <div>No items, Add some locations to your list!</div>}
    </div>

  )
}

export default Itinerary