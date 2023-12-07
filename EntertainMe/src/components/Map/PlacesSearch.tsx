import React, { useEffect } from 'react';

type PlaceProps = {
  event:  google.maps.LatLngLiteral | undefined
};

export default  function PlacesSearch({event}:PlaceProps): JSX.Element {

  useEffect(() => {
    const mapp = document.querySelector('.map') as HTMLDivElement | null;


    console.log(event)

    let map: google.maps.Map | null = null;
    let eventFired = false;

    if (mapp !== null && event != undefined) {
      map = new google.maps.Map(mapp, {
        center: event,
        zoom: 15,
      });
     

      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (!eventFired && map !== null) {
          eventFired = true;

          const placesSearch = new google.maps.places.PlacesService(map);
          performTextSearch(placesSearch, map);
        }

        // Remove the listener to prevent further checks
        if (listener && map !== null) {
          google.maps.event.removeListener(listener);
        }
      });
    }
    else{
      map = new google.maps.Map(mapp, {
        center: {lat: 41.8781136 , lng: -87.6297982
        },
        zoom: 15,
      });
    }

    function performTextSearch(placesSearch: google.maps.places.PlacesService, map: google.maps.Map) {
      const request: google.maps.places.TextSearchRequest = {
        location: map.getCenter(),
        radius: 500,
        query: "FUN",
      };

      placesSearch.textSearch(request, callback);
    }

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
          `;
          const infoWindow = new google.maps.InfoWindow({
            content: additionalContent // Use the location name as the content of the info window
          });

          // Show the info window when the marker is hovered over
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


    // if (map !== null) {
    //   new google.maps.Marker({
    //     map: map,
    //     position: position,
    //     title: 'Uluru'
    //   });
    // }
  
  }, [event]);

  return <div>
   
  </div>;
}
