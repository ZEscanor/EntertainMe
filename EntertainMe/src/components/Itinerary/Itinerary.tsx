import React from 'react'


interface ItinProps {
    dateList: Record<string,any>[];  
}

const Itinerary:React.FC<ItinProps> = ({dateList}) => {
  return (
    <div>
        
        {dateList.length > 0 ? (
        <div className='bottomBar'>
          {dateList.map((date: object)=>(
            <p>{date?.name}</p>
          ))}
        </div>
      ): null}
    </div>
  )
}

export default Itinerary