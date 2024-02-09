import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";




 import {useState} from "react"
 




 type PlaceProps = {
    setEvent: (position: google.maps.LatLngLiteral) => void;
 };

const Placer = ({setEvent}: PlaceProps) => {

    const {ready, 
        value, 
        setValue, 
        suggestions:{status, data},
        clearSuggestions} = usePlacesAutocomplete();

    const handleSelect = async(val: string) => {
      //console.log(val)
      setValue(val, false);
      clearSuggestions();

      const results = await getGeocode({address: val}); // gives results where we can extract latitute and longitude
      const {lat, lng} = await getLatLng(results[0]);  // we then set the event we wish to search for here by lat/lng
      
      setEvent({lat, lng})
     // console.log(results)
   
     
    
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleClear = () => {
    setValue("",false);
    clearSuggestions();
    setEvent(null)
    };

  
  return (
  
    <div className="autocomplete">
    <input
      value={value}
      onChange={handleInputChange}
      disabled={!ready}
      placeholder="Search For An Event or Location"
      className="comboboxInput"
    />
    <span  className="clear-button" onClick={handleClear}>X</span>
    {status === 'OK' && (
      <ul className="suggestions">
        {data.map(({ place_id, description }) => (
          
          <li key={place_id} onClick={() => handleSelect(description)} className="liste">
            {description}
            <div className="divider">

            </div>
          </li>
        ))}
      </ul>
    )}
  </div>

  )
}

export default Placer