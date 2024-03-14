import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowList.css"
import { FormCheck } from "react-bootstrap";

let show_more_details = {"isShowMore" : false, "sendList" : null,"show_key" : null}
let summary = '';
let key;
let name = '';
let rating;
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
                "image":each_show_details.show.image ? each_show_details.show.image.medium : "",
                "rating":each_show_details.show.rating.average
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
        rating = show_more_details["sendList"][0]["rating"];
    }

    function handleBooking(name){
        setIsSummaryDisplay(!isSummaryDisplay);
        
    }

    function handleBackToList(){
        setIsDisplay(!isDisplay);
    }


    return(
    <div  className="main-page">
        <div>
            {isDisplay && error === null? 
            <div className="movie-list">
                {required_show_details.map((each_show) => 
                        <div className="each-movie-details">
                            <h2 className="title">{each_show.name}
                            <span class="badge rounded-pill">
                                <a href={each_show.url}>↗</a>
                                
                            </span>
                            </h2>
                            
                            <div className="movie-image">
                                <img src={each_show.image} width="100%" height="50%" className="each-image"></img>
                            </div>
                            <div className="show-div">
                                <button onClick={() => {handleShowMore(each_show.key)}} className="button">Show more</button>
                            </div>
                        </div>
                        )
                }
            </div>

            :

            <div>
                <button onClick={handleBackToList} className="button">Back</button>
                <h1 className="title">{name} </h1>
                <h2 className="title">Rating : {rating} {rating === null ? "no rating available" : rating < 5 ? "👎" : "👍"}</h2>
                <div className="summary">
                    {summary}
                </div>
                <div className="show-div">
                    <button onClick={() => {handleBooking(name)}} className="button">Book Ticket</button>
                </div>
                {!isSummaryDisplay ? 
                <div>
                    <h2 className="title">Book "{name}" movie</h2>
                    <form className="form-fields">
                        <div className="name-field">
                            <label>Movie name</label>
                            <input value={name}></input>
                        </div>
                        <div className="date-field">
                            <label for="movie-date">Date</label>
                            <input id="movie-date" placeholder="DD/MM/YYYY"></input>
                        </div>
                        <div className="seat-field">
                            <label>No. of seats</label>
                            <input type="number"></input>
                        </div>
                        <div className="snack-field">
                            <label>Snacks and Drinks</label>
                            <div>
                                <input type="checkbox" id="snack1" name="snack1" value="popcorn"></input>
                                <label>Popcorn</label>
                                <input type="checkbox" id="snack2" name="snack2" value="fries"></input>
                                <label>Fries</label>
                                <input type="checkbox" id="drinks1" name="drinks1" value="Coco-Cola"></input>
                                <label>Coco Cola</label>
                                <input type="checkbox" id="drinks2" name="drinks2" value="Pepsi"></input>
                                <label>Pepsi</label>
                            </div>
                        </div>
                        <div className="show-div">
                            <button className="button">Submit</button>
                        </div>                        
                    </form>
                </div>
                    : ''}
                
            </div>
            }
        </div>
    </div>)
}

export default ShowList;