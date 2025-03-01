import {useMemo, useState, useCallback, useRef, useEffect} from 'react';
import {GoogleMap,
    Marker,
    
    // DirectionsRenderer,
    // Circle,
    // MarkerClusterer,

} from "@react-google-maps/api";
import Placer from './Placer';
//import Distance from "./DistanceCalculator";
import EventMarkers from "./EventMarkers.jsx";
import PlacesSearch from "./PlacesSearch.tsx"; 
import Itinerary from '../Itinerary/Itinerary.tsx';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const entertainment = "entertainment"
const fun = "fun"
const bars = "Bars"
const Restaurants = "restaurants"
const Music = "music"
const Sports = "sports"
const Arts = "arts"
const itinerary = 'itinerary'

const containerStyle = {
  width: '400px',
  height: '400px'
};

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type InfoWindow = google.maps.InfoWindow;
type PlacesService = google.maps.places.PlacesService



const MapData = () => {
 

  
  const [event,setEvent] = useState<LatLngLiteral>();
  const [directionFromMap, setDirectionsFromMap] = useState<DirectionsResult | null>(null);
  const [eventCheck, setEventCheck] = useState<string>(null)
  const [classifications, setClassifications] = useState<string>("music")
  const [dateList, setDateList] = useState([])
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
    const onLoad = useCallback((map) => (mapRef.current, map), []);
   


    const fetchDirections = (area: LatLngLiteral) => {
     // console.log(area, event, "the fetch directions function", infoWindow)
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
      setEventCheck(null)
      switch(passed){
        case entertainment:
          setEventCheck(entertainment);
          setClassifications(Music)
         // console.log(dateList,"date")
          break;
        case fun:
          setEventCheck(fun);
          setClassifications(bars)
          break;
        case itinerary:
          setEventCheck(itinerary);
          break;
        default:
          console.log('no cases')
      }
      
    };

    const handleClassSet = (passed:string) => {
      setClassifications(passed);

     


    }

    const updateDates = (newDate) => {
      setDateList((prevDates) =>{
      if(prevDates?.includes(newDate)){
      // toast("Already in the List")
        return prevDates;
      }
      else{
      //  toast(`Added ${newDate} to the listh`)
       const updatedDateList = [...prevDates, newDate];
      
      
      return updatedDateList
      }
    });
    
  };

 


  

    
  return (
    <div className='contained'>
      <div className='menuTab'>



      <div className='bottomBar'  >
          <div className={`Fun ${eventCheck === fun ? 'hidden' : ""}` } onClick={() =>handleClick(fun)}>
           Food & Fun
          
          </div>

          {eventCheck === fun ? (
             <div className='feList'>
              <h3 >Search For:</h3>
            <p  onClick={() =>handleClassSet(bars)}>Bars</p>
    <p onClick={() =>handleClassSet(Restaurants)}>Restaurants</p>
    <p onClick={() =>handleClassSet(fun)}>Fun</p>
  </div>
) : null}
          <div className={`entertainment ${eventCheck === entertainment ? 'hidden' : ""}` } onClick={() =>handleClick(entertainment)}>
           Entertainment & Tickets
        
            </div>


            {eventCheck === entertainment ? (
             <div  className='feList'>
              <h3>Search For:</h3>
            <p onClick={() =>handleClassSet(Music)} >Music</p>
    <p onClick={() =>handleClassSet(Arts)}>Arts</p>
    <p onClick={() =>handleClassSet(Sports)}>Sports</p>
  </div>
) : null}
<div className={`askAi ${eventCheck === itinerary ? 'hidden' : ""}` } onClick={() =>handleClick(itinerary)}>
 Itinerary
</div>  
         </div>
      </div>
    
       <div className='controlBar'>
           <h1>Entertainment Hub</h1>
           <Placer setEvent={(position)=>{
            setEvent(position);
            mapRef.current?.panTo(position)
           }}
           
           />

           {!event && <p className='locale'>Enter a location to search for nearby events</p>}
           {/* {directionFromMap && <Distance leg={directionFromMap.routes[0].legs[0]}/>} */}
           {classifications && event && <p className='locale'>{` You selected the ${classifications.toUpperCase()} category`}</p>}
         
         
       </div>
     
        <div className= {`map ${eventCheck === itinerary ? 'mapNone': "" }`}>
        {eventCheck === entertainment || eventCheck === null ? ( 
        <GoogleMap
        zoom={5}
        center={event || centerer}
        
        mapContainerClassName='map-container'
        options={mapOptions}
        onLoad={onLoad}
        >

          {/* {directionFromMap && <DirectionsRenderer directions={directionFromMap} 
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#197602",
              strokeWeight: 5,
            }
          }}
          
          />} */}

          

          {event && <EventMarkers event={event} fetchDirections={fetchDirections} classifications={classifications} updateDates={updateDates}/>}
         
         {event && (
          <>
         <Marker position={event} 
         icon={
          {
            path: 'M10 0C4.48 0 0 4.48 0 10s10 26 10 26 10-21.52 10-26S15.52 0 10 0zm0 14c-1.5 0-2.78-1.28-2.5-2.83 0-1.21.83-2.33 2.27-3.42.94-.69 2.02-1.5 2.02-2.84 0-1.52-1.45-2.78-2.5-2.78s-2.5 1.26-2.5 2.78H5c0 3.14 2.03 5.85 5 6.77 1.73.54 3 1.92 3 3.62v1.62h2v-1.64c0-1.7 1.27-3.08 3-3.62 2.97-.92 5-3.63 5-6.77h-2c0 1.52-1.45 2.78-2.5 2.78z',
      fillColor: 'blue', // Set the fill color to your desired color
      fillOpacity: 1,
      scale: 1.5, // Adjust the scale as needed
          }
        }
         
         />
  
         </>
         
         )}  
        </GoogleMap>
        )  :( null )}
       </div> 
       
       {eventCheck === "fun" ? (
  <div className={eventCheck === "fun" ? "" : null}>
  <PlacesSearch event={event} classifications={classifications} updateDates={updateDates} eventCheck={eventCheck} />
</div>
) : null}
      
       
      
{
            eventCheck === itinerary && <Itinerary dateList = {dateList}/>
          }


    </div>
  )
}





export default MapData