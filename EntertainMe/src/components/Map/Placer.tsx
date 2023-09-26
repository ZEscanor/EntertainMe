import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";

import { Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
 } from "@reach/combobox";

 import "@reach/combobox/styles.css";

 import {useState} from "react"
 




 type PlaceProps = {
    setEvent: (position: google.maps.LatLngLiteral) => void;
 };

const Placer = ({setEvent}: PlaceProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
    const {ready, 
        value, 
        setValue, 
        suggestions:{status, data},
        clearSuggestions} = usePlacesAutocomplete();

    const handleSelect = async(val: string) => {
      setValue(val, false);
      clearSuggestions();

      const results = await getGeocode({address: val}); // gives results where we can extract latitute and longitude
      const {lat, lng} = await getLatLng(results[0]);  // we then set the event we wish to search for here by lat/lng
      console.log(lat,lng, "our lat and long") 
      setEvent({lat, lng})
   
     
    
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setShowSuggestions(true);
    };

    const closeSuggestions = () => {
      setShowSuggestions(false);
    };
  return (
    // <Combobox onSelect={handleSelect}>
    //   <ComboboxInput
    //   value={value}
    //   onChange={e=>setValue(e.target.value)}
    //   disabled = {!ready}
    //   className="comboboxInput"
    //   placeholder="Search For An Event or Location"
    //         />
    //   <ComboboxPopover>
    //     <ComboboxList>
    //       {status === "OK" && data.map(({place_id, description})=> <ComboboxOption key={place_id}
    //       value={description}
    //       />)}
    //     </ComboboxList>
    //   </ComboboxPopover>
    // </Combobox>
    <div className="autocomplete">
    <input
      value={value}
      onChange={handleInputChange}
      onBlur={closeSuggestions}
      disabled={!ready}
      placeholder="Search For An Event or Location"
      className="input-field"
    />
    {showSuggestions && status === 'OK' && (
      <ul className="suggestions">
        {data.map(({ place_id, description }) => (
          <li key={place_id} onClick={() => handleSelect(description)}>
            {description}
          </li>
        ))}
      </ul>
    )}
  </div>

  )
}

export default Placer