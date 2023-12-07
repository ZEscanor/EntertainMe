import {useMemo, useState, useCallback, useRef} from 'react';
import {GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,

} from "@react-google-maps/api";
import Placer from './Placer';
import Distance from "./DistanceCalculator";
import EventMarkers from "./EventMarkers.jsx";
import PlacesSearch from "./PlacesSearch.tsx"; 


const entertainment = "entertainment"
const fun = "fun"


type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type InfoWindow = google.maps.InfoWindow;
type PlacesService = google.maps.places.PlacesService



const MapData = () => {
 

  
  const [event,setEvent] = useState<LatLngLiteral>();
  const [directionFromMap, setDirectionsFromMap] = useState<DirectionsResult | null>(null);
  const [eventCheck, setEventCheck] = useState<string>("")
  //const [eventsNearLocation, setEventNearLocation] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const centerer = useMemo<LatLngLiteral>(() => ({
    lat: 43.45, lng: -80.49}), []); // The latitude and longitude the map will be centered in first render
    // use memo so it doesnt recenter every render
    const mapOptions = useMemo<MapOptions>(()=>({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "5d1787db251215c4",

    }), []); // these map options contain the custome styles made on the google dev platform

    const infoWindow = useMemo<InfoWindow>   // an info window is a popup that could appear when a place is hovered/moused over
    const onLoad = useCallback((map) => (mapRef.current = map), []);
   


    const fetchDirections = (area: LatLngLiteral) => {
      console.log(area, event, "the fetch directions function", infoWindow)
      if(!event) return;
       
      const directionService = new google.maps.DirectionsService(); // Create a new instance of directions service
      directionService.route({
        origin: area,
        destination: event,
        travelMode: google.maps.TravelMode.DRIVING
      }, // route it for the area the user clicked to the destination the user inputed
      (result, status) => {
        if(status === 'OK' && result){
          setDirectionsFromMap(result);
        }  // Place results inside of state
      }
      )

    }

    

    const handleClick = (passed:string) => {
      switch(passed){
        case entertainment:
          setEventCheck(entertainment);
          break;
        case fun:
          setEventCheck(fun);
          break;
        default:
          console.log('no cases')
      }
      
    };
  return (
    <div className='contained'>
       <div className='controlBar'>
           <h1>Entertainment Hub</h1>
           <Placer setEvent={(position)=>{
            setEvent(position);
            mapRef.current?.panTo(position)
           }}
           />

           {!event && <p>Enter The address</p>}
           {directionFromMap && <Distance leg={directionFromMap.routes[0].legs[0]}/>}
         
         <div className='bottomBar'  >
          <div className='Fun' onClick={() =>handleClick(fun)}>
           Food & Fun
           {eventCheck === "Fun" ? (
             <div>
            <p>Bars</p>
    <p>Restaurants</p>
    <p>Fun</p>
  </div>
) : null}
          </div>
          <div onClick={() =>handleClick(entertainment)}>
           Entertainment & Tickets
            </div>
<div>
 Guides
</div>  
         </div>
       </div>
     
        <div className='map'>
        {eventCheck === entertainment ? ( 
        <GoogleMap
        zoom={10}
        center={centerer}
        mapContainerClassName='map-container'
        options={mapOptions}
        onLoad={onLoad}
        >

          {directionFromMap && <DirectionsRenderer directions={directionFromMap} 
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#197602",
              strokeWeight: 5,
            }
          }}
          
          />}

          

          {event && <EventMarkers event={event} fetchDirections={fetchDirections}/>}
         
         {event && (
          <>
         <Marker position={event}  />

         </>
         
         )}  
        </GoogleMap>
        )  :( null )}
       </div> 

       {
            eventCheck === fun && <PlacesSearch event = {event} /> 
          }
    </div>
  )
}





export default MapData