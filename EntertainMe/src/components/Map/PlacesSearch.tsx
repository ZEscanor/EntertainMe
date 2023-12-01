


export default function PlacesSearch(){

   const mapp = document.querySelector('[aria-label="Map"]') as HTMLDivElement
   console.log(mapp)
  
   const request = {
    location: new google.maps.LatLng(-33.8665433,151.1956316),
    radius: '500',
    query: 'restaurant'
  };

  if(mapp != null){
  // const placesSearch = new google.maps.places.PlacesService(mapp);
   //performTextSearch(placesSearch)
  }
     
  
  

  function performTextSearch(placesSearch: google.maps.places.PlacesService) {
          
    
          placesSearch.textSearch(request, callback);
        }
    


  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results, "we got it")
    }
  }

  //console.log('IT WORKSS' ,mapp, service)


return null 
  

 }
  
