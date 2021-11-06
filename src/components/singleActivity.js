import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteRoutineActivity, editActivity } from "../api";

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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isActive, setActive] = useState(false);
  const editToggle = () => {
    return setActive(!isActive);
  };

  const [deleteActive, setDeleteActive] = useState(false);
  const deleteToggle = () => {
    return setDeleteActive(!deleteActive);
  };
  const [certainDelete, setCertainDelete] = useState(false);

  return (
    <div>
      <button onClick={editToggle}>Edit?</button>
      <div className={isActive ? "singleActivity" : "hidden"}>
        <form
          name="editRoutine"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const results = await editActivity(name, description, activityId);
              return results;
            } catch (error) {
              throw error;
            }
          }}
        >
          <fieldset>
            <label>Change name?</label>
            <input
              name="editName"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label>Change Description?</label>
            <input
              name="editDesc"
              type="text"
              value={name}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </fieldset>
        </form>
      </div>

      <button onClick={deleteToggle}>Delete?</button>
      <div className={deleteActive ? null : "hidden"}>
        <fieldset className="fieldset">
          <label>Are you sure you want to delete?</label>

          <input
            id="certainDelete"
            type="checkbox"
            value={certainDelete}
            onChange={() => {
              setCertainDelete(!certainDelete);
            }}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              certainDelete ? deleteRoutineActivity(activityId) : null;
              history.push("/");
            }}
          >
            Complete Deletion
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default SingleActivity;
