import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowList(){
    let all_show_details;
    let req_details_dict;
    const [required_show_details,setRequiredShowDetails] = useState([]);
    const [error,setError] = useState(null);
    const [isDisplay,setIsDisplay] = useState(false);

    useEffect(() => {
        async function getShowDetails() {
            try{
                const response = await axios.get(`https://api.tvmaze.com/search/shows?q=all`);
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
                "url":each_show_details.show.url
            };
            prev_list.push(req_details_dict);
        })
        setRequiredShowDetails(prev_list)
        setIsDisplay(true);
    }


    return(
    <div>
        <div>
            {isDisplay && error === null? 
            <ul>
                {required_show_details.map((each_show) => 
                    <li key={each_show.key}>
                        <h1>{each_show.name}</h1>
                        <button key={each_show.key}>Show more</button>
                    </li>)}
            </ul>
            :
            ""}
        </div>
    </div>)
}

export default ShowList;