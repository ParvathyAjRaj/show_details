import React, { useEffect, useState } from "react";
import axios from "axios";

let show_more_details = {"isShowMore" : false, "sendList" : null,"show_key" : null}
let summary = '';
let key;
let name = '';
const baseURL = 'https://api.tvmaze.com/search/shows?q=all';

function ShowList(){
    let all_show_details;
    let req_details_dict;
    const [required_show_details,setRequiredShowDetails] = useState([]);
    const [error,setError] = useState(null);
    const [isDisplay,setIsDisplay] = useState(false);
    const [isSummaryDisplay,setIsSummaryDisplay] = useState(false);

    useEffect(() => {
        async function getShowDetails() {
            try{
                const response = await axios.get(`${baseURL}`);
                all_show_details = response.data;
                setIsDisplay(true);
                add_required_show_details();
            }catch(error) 
                {
                   setError(error);
                };
    }
    getShowDetails();
    },[])

    function add_required_show_details(){
        const prev_list = [...required_show_details];
        all_show_details.map((each_show_details) => {
            req_details_dict = {
                "key": each_show_details.show.id,
                "name": each_show_details.show.name,
                "summary":each_show_details.show.summary,
                "url":each_show_details.show.url,
                "image":each_show_details.show.image ? each_show_details.show.image.medium : ""
            };
            prev_list.push(req_details_dict);
        })
        setRequiredShowDetails(prev_list)
        setIsDisplay(true);
    }

    function handleShowMore(key_value){
        setIsDisplay(false);
        setIsSummaryDisplay(true);
        show_more_details.isShowMore = true;
        show_more_details.sendList = required_show_details.filter(show => (show.key === key_value));
        show_more_details.show_key = key_value;
        summary = show_more_details["sendList"][0]["summary"];
        key = show_more_details["show_key"];
        name = show_more_details["sendList"][0]["name"];
    }

    function handleBooking(name){
        setIsSummaryDisplay(!isSummaryDisplay);
        
    }

    function handleBackToList(){
        setIsDisplay(!isDisplay);
    }


    return(
    <div>
        <div>
            {isDisplay && error === null? 
            <ul>
                {required_show_details.map((each_show) => 
                    <li>
                        <h1>{each_show.name}</h1>
                        <a href={each_show.url}>{each_show.url}</a>
                        <br></br>
                        <img src={each_show.image} width="20%" height="20%"></img>
                        <br></br>
                        <button key={each_show.key}  onClick={() => {handleShowMore(each_show.key)}}>Show more</button>
                    </li>)}
            </ul>
            :
            <div>
                <button onClick={handleBackToList}>Back</button>
                <h1>Here is the details:</h1>
                <ul>
                    <li>{summary}</li>
                    <button onClick={() => {handleBooking(name)}}>Book Ticket</button>
                    {!isSummaryDisplay ? 
                    <div>
                        <h2>Book "{name}" movie</h2>
                        <form>
                            <label>Movie name</label>
                            <input value={name}></input>
                            <label for="movie-date">Date</label>
                            <input id="movie-date"></input>
                            <label>No. of seats</label>
                            <input type="number"></input>
                            <button>Ok</button>
                        </form>
                    </div>
                     : ''}
                </ul>
            </div>
            }
        </div>
    </div>)
}

export default ShowList;