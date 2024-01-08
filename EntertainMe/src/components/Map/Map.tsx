import { Libraries, useLoadScript } from "@react-google-maps/api";
import MapData from "./MapData";

const libraries: Libraries = ["places"] 

const Map = () => {
   const {isLoaded} = useLoadScript({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      
      libraries,
  });

if(!isLoaded) return <div>
  Loading....
</div>;

return (
  <MapData/>
)
}

export default Map