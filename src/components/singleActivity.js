import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateRoutine, deleteRoutine } from "../api";

import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom"
import {fetchRoutinesByActivity} from "../api"



const SingleActivity = ({ }) => {

    const pageLocation = useLocation();
    const { activity } = pageLocation.state
    const [routines, setRoutines] = useState([])

    useEffect(() => {
        async function setUp() {
            const temp = await fetchRoutinesByActivity(activity.id)
            if(temp)
                setRoutines(temp)
        }
        setUp()
    }, []);


    return (
        <div>
            <h2>Routines that use this Activity</h2>
            <div>{
            routines.length ?
            routines.map(e => {
                    return (
                        <div key={`routine ${e.id}`} className="activity-routine-card">
                            <h3>{e.name}</h3>
                            <p>Goal: {e.goal}</p>
                            <p>
                                <span>Creator: {e.creatorName}</span>
                            </p>
                        </div>
                    )
                })
                : <p>No</p>
        }</div>
        </div>
    )
}

export default SingleActivity;