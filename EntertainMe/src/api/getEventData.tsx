import React, {useState,useEffect} from 'react';
// import EventDetails from '../components/EventDetails';
import EventCard from '../components/graphql/EventCard';


// Ticketmaster api important endpoints
/* 
/discovery/v2/events
{keyword}
{countryCode}
{city}
{postalCode}
{latlong}
{radius}

*/
interface Props  {
    keyword: string;
    source: string;
    locale: string;
    page: string;
    countryCode: string;
    apiKey: string;
    latlong: string;
}

const GetEventData = () => {
  const [eventData, setEventData] = useState([{}]);
  const apikey : string = import.meta.env.VITE_TICKETMASTER_API_KEY;
    const [form,setForm] = useState<Props>({
        keyword: "",
        source: "",
        locale: "",
        page: "",
        countryCode: "",
        apiKey: "",
        latlong: "",
    });


  //https://app.ticketmaster.com/{package}/{version}/{resource}.json?apikey=**{API key}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let url  = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}`
        if(form.keyword){
            url += `&keyword=${form.keyword}`
    
        }
        if(form.source){
            url += `&source=${form.source}`
        }
        if(form.locale){
            url += `&locale=${form.locale}`
        }
        if(form.page){
            url += `&page=${form.page}`
        }
        if(form.countryCode){
            url += `&countryCode=${form.countryCode}`
        }
        if(form.latlong){
            url += `&latlong=${form.latlong}`
        }


        
        const fetchEvents = async () => {
            const res = await fetch(url,
                {method: "GET",
               
               
            }
                );
            const data = await res.json();
            //console.log(data);
            setEventData(data?._embedded.events);

        }
        fetchEvents();
        //console.log(eventData, "eventData");

    }
        



        const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setForm({...form, [e.target.name]: e.target.value});

            //console.log(form);
            return form;
        }



        

     //     console.log(event._embedded.venues[0].location.longitude);
//     console.log(event._embedded.venues[0].location.latitude);
    
    
        //valid country codes US
        //classification name
       
        
    // useEffect(() => {

    //     let url  = "https://app.ticketmaster.com/discovery/v2/events"
    //     //https://app.ticketmaster.com/discovery/v2/events
    //     // &keyword=pink
    //     // &source=ticketmaster
    //     // &locale=*
    //     // &page=1
    //     // &countryCode=US

    //             if(form.keyword){
    //                 url += `&keyword=${form.keyword}`
            
    //             }
    //             if(form.source){
    //                 url += `&source=${form.source}`
    //             }
    //             if(form.locale){
    //                 url += `&locale=${form.locale}`
    //             }
    //             if(form.page){
    //                 url += `&page=${form.page}`
    //             }
    //             if(form.countryCode){
    //                 url += `&countryCode=${form.countryCode}`
    //             }
    //     // if(form.apiKey){
    //     //     url += `?apikey=${form.apiKey}`
    //     // }
    //     
    //     const fetchEvents = async () => {
    //         //const res = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=");
    //         console.log(url);
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         console.log(data);
    //         setEventData(data);
    //     }
    //     fetchEvents();
    //     //console.log(eventData);
    // }, [
        
    
    // ]);


// Responses are in _embedded.events and come in pages of 20 events per page.
// _embedded.events.map((event: any) => {
//     console.log(event.name);
//     console.log(event.dates.start.localDate);
//     console.log(event.dates.start.localTime);
//     console.log(event._embedded.venues[0].name);
//     console.log(event._embedded.venues[0].city.name);
//     console.log(event._embedded.venues[0].state.stateCode);
//     console.log(event._embedded.venues[0].country.countryCode);
//     console.log(event._embedded.venues[0].postalCode);

//     console.log(event._embedded.venues[0].timezone);
//     console.log(event._embedded.venues[0].url);
//     console.log(event._embedded.venues[0].images[0].url);
//     console.log(event._embedded.venues[0].images[0].width);
//     console.log(event._embedded.venues[0].images[0].height);
//     console.log(event._embedded.venues[0].images[0].ratio);
//     console.log(event._embedded.venues[0].images[0].fallback);
// event._embedded


    

  return (
    <div>
        <h1>Get Event Data</h1>
       <form
         onSubmit={handleSubmit}
         

            
       >
        <label htmlFor="keyword">Keyword</label>
        <input type="text" id="keyword" name="keyword"
        value={form.keyword}
        onChange={handleChange}
         />

        <label htmlFor="source">Source</label>
        <input type="text" id="source" name="source"
        value={form.source}
        onChange={handleChange}
         />

        <label htmlFor="locale">Locale</label>
        <input type="text" id="locale" name="locale" 
        value={form.locale}
        onChange={handleChange}
        
        />

        <label htmlFor="page">Page</label>
        <input type="text" id="page" name="page"
        value={form.page}
        onChange={handleChange}
         />

        <label htmlFor="countryCode">Country Code</label>
        <input type="text" id="countryCode" name="countryCode"
        value={form.countryCode}
        onChange={handleChange}
         />

<label htmlFor="latlong">API Key</label>
        <input type="text" id="latlong" name="latlong"
        value={form.latlong}
        onChange={handleChange}
         />
        <button type="submit">Submit</button>
        

       </form>


         {/* <EventDetails eventData ={eventData} /> */}
         {eventData && <div>
            {eventData?.map((event: any ) => 
            {

                return (
                    // <div key={event?.id}>
                    //     <h1>{event?.name}</h1>
                    //     <h2>{event?.dates?.start.localDate}</h2>
                        
                    //     <h2>{event?.dates?.start.localTime}</h2>
                    //     <h2>{event?._embedded?.venues[0]?.name}</h2>
                    //     <h2>{event?._embedded?.venues[0]?.city?.name } - {event?._embedded?.venues[0]?.state?.stateCode} </h2>
                    //     <h2>{event?._embedded?.venues[0]?.country?.countryCode}</h2>
                    //     <h2>{event?._embedded?.venues[0]?.postalCode}</h2>
                    //     <h2>{event?._embedded?.venues[0]?.location?.longitude}</h2>
                    //     <h2>{event?._embedded?.venues[0]?.location?.latitude}</h2>
                    //     <h2>{event?._embedded?.venues[0]?.timezone}</h2>
                    //     <h2>{event?._embedded?.venues[0]?.url}</h2>
                    //    {=
                    //   
                    // </div>

                    event?.name && <div key={event.id}>
                    <EventCard data={event} />
                   </div>
                    
                )
            }
            )}
                
             </div>}
        </div>
  )
}


export default GetEventData