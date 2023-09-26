import { useLoadScript } from "@react-google-maps/api";
import MapData from "./MapData";



const Map = () => {
   const {isLoaded} = useLoadScript({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ["places"]
  });

if(!isLoaded) return <div>
  Loading....
</div>;

return (
  <MapData/>
)
}

export default Map