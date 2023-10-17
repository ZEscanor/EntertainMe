import {useMemo, useState, useCallback, useRef} from 'react';
import {GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,

} from "@react-google-maps/api";
import Placer from './Placer';
import Distance from "./DistanceCalculator";
import EventMarkers from "./EventMarkers";





type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type InfoWindow = google.maps.InfoWindow;



const MapData = () => {
 

  
  const [event,setEvent] = useState<LatLngLiteral>();
  const [directionFromMap, setDirectionsFromMap] = useState<DirectionsResult | null>(null);
  //const [eventsNearLocation, setEventNearLocation] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const centerer = useMemo<LatLngLiteral>(() => ({
    lat: 43.45, lng: -80.49}), []); // The latitude and longitude the map will be centered in first render
    // use memo so it doesnt recenter every render
    const mapOptions = useMemo<MapOptions>(()=>({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "5d1787db251215c4",

    }), []);

    const infoWindow = useMemo<InfoWindow>

    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const areas = useMemo(() => generateDummyData(centerer), [centerer])

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

       </div>
       <div className='map'>
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


         <MarkerClusterer>
            {(clusterer) => (
            <div>
            {areas.map((area) => (
              <Marker key={area.lat} 
              position={area} 
              clusterer={clusterer}
              onClick={()=>{
                fetchDirections(area)
              }}
              />
             
            ))}
            </div>
         )} 
          </MarkerClusterer>

        
         <Circle center={event} radius={15000} options={close}/>
         </>
         
         )}  
        </GoogleMap>
       </div>
    </div>
  )
}


const defaultOptions = {
 strokeOpacity: 0.5,
 strokeWeight: 2,
 clickable: false,
 draggable: false,
 editable : false,
 visible: true,
};

const close = {
  ...defaultOptions,
  zIndex:3,
  fillOpacity: 0.1,
  strokeColor: '#8BC34B',
  fillColor: "#8bC34A"
}


const generateDummyData = (position: LatLngLiteral) =>{
    const _areas: Array<LatLngLiteral> = [];
    for (let i= 0; i<100; i++){
      const direction = Math.random() < 0.5 ? -2 : 2
      _areas.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    return _areas
};

export default MapData