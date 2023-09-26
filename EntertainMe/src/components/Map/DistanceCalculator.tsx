

type DistanceProps = {
    leg: google.maps.DirectionsLeg;
}



export default function Distance({leg}: DistanceProps){
    if(!leg.distance || !leg.duration) return null;

    const duration = leg.duration.text
    const distance = leg.duration.text
    const start = leg.start_address
    const end = leg.end_address
    return <div> 
        <p>
            Your destination is <span>
                {distance} away
            </span>
        </p>
        <p>
            It will take <span>
                {duration}
                {'\u00A0'}to arrive
            </span>
        </p>

        <p>
            Start Address: {start}
        </p>
        <p>
            End Address: {end}
        </p>
    </div>
}