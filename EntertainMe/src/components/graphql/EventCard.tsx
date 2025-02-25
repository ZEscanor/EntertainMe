

import React from 'react';

interface Props {
    data: {
        id: string;
        name: string;
        location: string;
        date: string;
        time: string;
        url: string;
        images: {
            url: string;

        }[]
        dates: {
            start: {
                localDate: string;
                localTime: string;
                dateTime: string;

        }
    }
        _embedded: {
            venues: {
                name: string;
                city: {
                    name: string;
                }
                state: {
                    stateCode: string;
                }
                country: {
                    countryCode: string;
                }
                postalCode: string;
                location: {
                    longitude: string;
                    latitude: string;
                }
                timezone: string;
            }[]

        
       

    }
}
}

const EventCard: React.FC<Props> = ({ data }) => {
   // console.log(data, "data from event card")
    return (
        <div className="eventCard"  style={
            {
                backgroundImage: `url(${data?.images[0].url})`,
                aspectRatio: "16/9",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "400px",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                color: "#f9f9f9",
                padding: "10px",
                marginBottom: "20px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textAlign: "center",
                textShadow: "2px 2px 4px #000000",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                
            }
        }>
            {/* <div className="eventCard__image">
                <img src={data?.images[0].url} alt={data.name} />
            </div> */}
            <div className="eventCard__content">
                <div className="eventCard__content__header">
                    <h3>{data?.name}</h3>
                    <p>{data?.location}</p>
                </div>
                <div className="eventCard__content__footer">
                    <p>{data?.date}</p>
                    <p>{data?.time}</p>
                </div>
                <div>
                    <p>{data?._embedded?.venues[0]?.name}</p>
                    <p>{data?._embedded?.venues[0]?.city?.name } - {data?._embedded?.venues[0]?.state?.stateCode} </p>
                    <p>{data?._embedded?.venues[0]?.country?.countryCode}</p>
                    <p>{data?._embedded?.venues[0]?.postalCode}</p>
                    

                </div>

            </div>
            <div className="eventCard__button">
                <a href={data?.url} target="_blank" rel="noreferrer">
                    <button>Buy Tickets</button>
                </a>
            </div>
        </div>
    )
}

export default EventCard;