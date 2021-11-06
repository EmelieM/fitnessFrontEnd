import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  updateRoutine,
  deleteRoutine,
  addSingleActivitytoRoutine,
  getActivities,
} from "../api";

const SingleRoutine = ({ routine }) => {
  const history = useHistory();

  const routineId = routine.id;

  const [activitiesList, setActivities] = useState([]);

  useEffect(async () => {
    const listOfActivities = await getActivities();
    setActivities(listOfActivities);
  }, []);

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setPublic] = useState(false);

  const [isActive, setActive] = useState(false);
  const editToggle = () => {
    return setActive(!isActive);
  };

  const [addActive, setAddActive] = useState(false);
  const addToggle = () => {
    return setAddActive(!addActive);
  };

  const [deleteActive, setDeleteActive] = useState(false);
  const deleteToggle = () => {
    return setDeleteActive(!deleteActive);
  };
  const [certainDelete, setCertainDelete] = useState(false);

  const [activity, setActivity] = useState("");
  const [count, setActCount] = useState("");
  const [duration, setActDuration] = useState("");

  return (
    <div>
      <div className="singleRoutine">
        <h3>{routine.name}</h3>
        <p>{routine.goal}</p>
        <p>Public? {routine.isPublic}</p>
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
              certainDelete ? deleteRoutine(routineId) : null;
              history.push("/");
            }}
          >
            Complete Deletion
          </button>
        </fieldset>
      </div>

      <button onClick={editToggle}>Edit?</button>
      <div className={isActive ? "singleActivity" : "hidden"}>
        <form
          name="editRoutine"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const results = await updateRoutine(name, goal, isPublic);
              return results;
            } catch (error) {
              throw error;
            } finally {
              window.location.reload();
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
            <label>Change goal?</label>
            <input
              name="editGoal"
              type="text"
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label>Change public status?</label>
            <input
              name="editPublic"
              type="text"
              value={isPublic}
              onChange={() => {
                setPublic(!isPublic);
              }}
            />
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      </div>

      <button onClick={addToggle}>Add an Activity?</button>
      <div className={addActive ? null : "hidden"}>
        <form
          id="addActivity"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              console.log("ACTIVITY!", activity);
              const results = await addSingleActivitytoRoutine(
                activity,
                routineId,
                count,
                duration
              );
              return results;
            } catch (error) {
              throw error;
            }
          }}
        >
          <fieldset>
            <label>Add Activity</label>
            <select
              name="activity"
              value={activity}
              onChange={(event) => {
                setActivity(event.target.value);
              }}
            >
              <option value="any">Any</option>
              {activitiesList.map((singleAct) => {
                return (
                  <option value={singleAct.id} key={singleAct.id}>
                    {singleAct.name}
                  </option>
                );
              })}
            </select>

            <fieldset>
              <label>Count?</label>
              <input
                name="count"
                type="text"
                value={count}
                onChange={(event) => {
                  setActCount(event.target.value);
                }}
              />
            </fieldset>

            <fieldset>
              <label>Duration?</label>
              <input
                name="actDuration"
                type="text"
                value={duration}
                onChange={(event) => {
                  setActDuration(event.target.value);
                }}
              />
            </fieldset>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SingleRoutine;
