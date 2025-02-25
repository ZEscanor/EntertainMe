import { useState, useEffect, useMemo} from "react";

import {
    Marker,
    // DirectionsRenderer,
    // Circle,
    // MarkerClusterer,

} from "@react-google-maps/api";
import { ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popout from "./Popout"
import { Modal } from "antd";

const EventMarkers = ({ event, fetchDirections, classifications = "music", updateDates}) => {
  const latlon = `${event.lat}` + "," + `${event.lng}`;
  const apikey = import.meta.env.VITE_TICKETMASTER_API_KEY;
  const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}&latlong=${latlon}&classificationName=${classifications}&size=60`;
 
  const [eventFilterer, setEventFilterer] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  // classificationName= music
const [venueEvents, setVenueEvents] = useState([]);
const [modal, setModal]= useState(false);

  //console.log(url);

  

  useEffect(() => {
    if(eventFilterer.length > 5){
      setEventFilterer([])
    }
    const fetchEvents = async () => {
      
      try {
        const res = await fetch(url, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Network response not ok");
        }

        const data = await res.json();
        //console.log(data, "our data")
        const uniqueEventName = new Set();
        const uniqueEvents = [];

        for (let i = 0; i < data._embedded.events.length; i++) {
          const event = data._embedded.events[i];

          if (!uniqueEventName.has(event.name)) {
            uniqueEventName.add(event.name);
            uniqueEvents.push(event);
          }

          if (uniqueEventName.length > 100) {
            break; // Exit the loop when you have collected 100 unique events
          }
        }

        setEventFilterer((prevEvents) => [...prevEvents, ...uniqueEvents]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvents();
  }, [url,classifications]); // Add 'url' as a dependency to trigger the effect when 'url' changes // Add 'url' as a dependency to trigger the effect when 'url' changes

  //console.log(eventFilterer);

  const handleMarkerClick = async (area) => {
    setSelectedMarker(null)
    setSelectedMarker(area);
    setVenueEvents([])
    //console.log(eventFilterer, venueEvents,'area')
    try {
      // Fetch events for the selected venue (you may need to customize the URL)
      const venueEventsUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}&venueId=${area}&classificationName=${classifications}`;
      const res = await fetch(venueEventsUrl);
      if (!res.ok) {
        throw new Error("Network response not ok");
      }
      const data = await res.json();

      
      //console.log("dataaaaa",data)
      // Assuming your API response structure has events in data._embedded.events
      const uniqueEventName = new Set();
        const uniqueEvents = [];

        for (let i = 0; i < data._embedded.events.length; i++) {
          const event = data._embedded.events[i];

          if (!uniqueEventName.has(event.name)) {
            uniqueEventName.add(event.name);
            uniqueEvents.push(event);
          }

          if (uniqueEventName.length > 100) {
            break; // Exit the loop when you have collected 100 unique events
          }
        }
  
       
        setVenueEvents(uniqueEvents);
     // setVenueEvents(data._embedded.events);
    } catch (error) {
      console.error("Error fetching venue events:", error);
    }
  };

  const openModal = (eventId) => {
    setModal(eventId)
  }
  const closeModal = (event) => {
    setModal(null)
    if(event == null){
      return
    }
    else {
    toast(`Added ${event} to the list`)
    }
  }
  const memoizedEventFilterer = useMemo(() => eventFilterer, [eventFilterer]);
  const memoizedVenueEvents = useMemo(() => venueEvents, [venueEvents]);
  return (
<>
  {/* {(clusterer) => ( */}
  <div>

  {memoizedEventFilterer?.map((area) => (
    <Marker key={area.lat} 
    position={{lat: parseFloat(area._embedded.venues[0].location.latitude), lng:parseFloat(area._embedded.venues[0].location.longitude)}} 
    // clusterer={clusterer}
    onClick={()=>{
      handleMarkerClick(area._embedded.venues[0].id)
        fetchDirections({lat: parseFloat(area._embedded.venues[0].location.latitude), lng:parseFloat(area._embedded.venues[0].location.longitude)})
      
    }}
    />
   
  ))}
  </div>
  <div>
  {selectedMarker && (
    <div className="eventFilter">
      <h2>Events at {memoizedVenueEvents[0]?._embedded.venues[0]?.name}</h2>
    
      <ul>
        {memoizedVenueEvents?.map((event) => (
          <li key={event.id} className="liste">
             {/* <a href={event.url} target="_blank" rel="noopener noreferrer">
             
             
            
             </a> */}
             {/* {modal === event.id ? (
             
             <Modal
             <Popout event={event} updateDates={updateDates} closeModal={closeModal}/>
             <Modal/> ):(
             <div   onClick={()=>openModal(event.id)}>
             {event.name}
         
             </div>
             )
                  }  */}
                  {modal === event.id ? (

    <Popout event={event} updateDates={updateDates} closeModal={closeModal} modal={modal} />

) : (
  <div onClick={() => openModal(event.id)}>
    {event.name}
  </div>
)}
           
          </li>
          
        ))}
      </ul>
     <button onClick={()=> setSelectedMarker(null)}>X</button>
    </div>
  )}
</div>
  
{/* )}  */}
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
</>

  )
};


export default EventMarkers;