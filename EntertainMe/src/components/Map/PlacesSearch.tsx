import React, { useEffect, useCallback, useRef} from 'react';

type PlaceProps = {
  event:  google.maps.LatLngLiteral | undefined
  classifications: string | undefined
  updateDates: (newDates: Record<string,any>) => void;
  eventCheck: string | undefined
};




export default  function PlacesSearch({event, classifications="FUN", eventCheck, updateDates}:PlaceProps ): JSX.Element {

  const mapRef = useRef<google.maps.Map | null>(null);
  const performTextSearch = useCallback(
    (placesSearch: google.maps.places.PlacesService, map: google.maps.Map, callback: any) => {
      const request: google.maps.places.TextSearchRequest = {
        location: map.getCenter(),
        radius: 500,
        query: classifications,
      };

      placesSearch.textSearch(request, callback);
    },
    [classifications]
  );
 


  useEffect(() => {
    const mapp = document.querySelector('.map') as HTMLDivElement;
    

    console.log(eventCheck)

    let map = mapRef.current
    let eventFired = false;
    

    if (mapp !== null && event != undefined) {
      if(!map){
      map = new google.maps.Map(mapp, {
        center: event,
        zoom: 11,
      });
    
     
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (!eventFired && map !== null) {
          eventFired = true;

          const placesSearch = new google.maps.places.PlacesService(map);
          
          performTextSearch(placesSearch, map, callback);
        }

        // Remove the listener to prevent further checks
        if (listener && map !== null) {
          google.maps.event.removeListener(listener);
        }
      });
   
    }
  }
    else{
      map = new google.maps.Map(mapp, {
        center: {lat: 41.8781136 , lng: -87.6297982
        },
        zoom: 15,
        
        
      });
    }

    return () => {
      // Clean up event listener if the component unmounts
      if (map !== null) {
        google.maps.event.clearListeners(map, 'idle');
      }
    };

    function callback(results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          //console.log(results[i].geometry?.viewport.eb.lo , results[i].geometry?.viewport?.La.lo);
          const marker = new google.maps.Marker({
            map:map, 
            position: results[i].geometry?.location 
           // {lat:results[i].geometry?.viewport.eb.lo, lng: results[i].geometry?.viewport?.La.lo }
           ,
           title: results[i].name
          })
          const additionalContent = `<div style="color: black "><strong>Name:</strong> ${results[i].name}</div>
          <div style = "color: black "><strong>Address:</strong> ${results[i].formatted_address}</div>
          <div style = "color: black "><strong>Type of Place:</strong> ${results[i].types[0].toUpperCase()}</div>
          <button id= addToMyListButton >Add to List</button>
          `;
           
          const infoWindow = new google.maps.InfoWindow({
            content: additionalContent // Use the location name as the content of the info window
          });

          

          // Show the info window when the marker is clicked

          infoWindow.addListener('domready', () => {
            const addButton = document.getElementById('addToMyListButton');
            addButton?.addEventListener('click', () => {
              // Handle button click action here
              const clickedLocation = results[i]; // Assuming 'i' is defined or calculated
              //addToList(clickedLocation); // Call the addToList function with the clicked location
              console.log("why",clickedLocation)
              updateDates(clickedLocation)
            });
          });


          marker.addListener('click', () => {
            infoWindow.open(map, marker); 
          });


          // Close the info window when the marker is no longer hovered over
          marker.addListener('closeclick', () => {
            infoWindow.close();
          });
        }
      }
    }


    


  }, [event,classifications]);







return <div className= 'map' >
   
</div>;
}
