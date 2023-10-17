import { useState, useEffect } from "react";

import {GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,

} from "@react-google-maps/api";

const EventMarkers = ({ event, fetchDirections}) => {
  const latlon = `${event.lat}` + "," + `${event.lng}`;
  const apikey = import.meta.env.VITE_TICKETMASTER_API_KEY;
  const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}&latlong=${latlon}`;
  const [eventFilterer, setEventFilterer] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
const [venueEvents, setVenueEvents] = useState([]);
  //console.log(url);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Network response not ok");
        }

        const data = await res.json();
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
  }, [url]); // Add 'url' as a dependency to trigger the effect when 'url' changes

  //console.log(eventFilterer);

  const handleMarkerClick = async (area) => {
    setSelectedMarker(area);
   // console.log(area,'area')
    try {
      // Fetch events for the selected venue (you may need to customize the URL)
      const venueEventsUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}&venueId=${area}`;
      const res = await fetch(venueEventsUrl);
      if (!res.ok) {
        throw new Error("Network response not ok");
      }
      const data = await res.json();
      //console.log("dataaaaa",data)
      // Assuming your API response structure has events in data._embedded.events
      setVenueEvents(data._embedded.events);
    } catch (error) {
      console.error("Error fetching venue events:", error);
    }
  };

  return (
<>
  {/* {(clusterer) => ( */}
  <div>
  {eventFilterer.map((area) => (
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
      <h2>Events at {venueEvents[0]?._embedded.venues[0]?.name}</h2>
      <ul>
        {venueEvents.map((event) => (
          <li key={event.id} className="liste">
             <a href={event.url} target="_blank" rel="noopener noreferrer">
             {event.name}
             </a>
             
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
  
{/* )}  */}
</>

  )
};


export default EventMarkers;