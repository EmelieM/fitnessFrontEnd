import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";

import { getUserRoutines, createRoutine } from "../api";

const myRoutines = (props) => {
  const [myRoutines, setMyRoutines] = useState(null);

  useEffect(async () => {
    const userRoutines = await getUserRoutines();
    setMyRoutines(userRoutines);
  }, []);

  const [isActive, setActive] = useState(false);
  const createToggle = () => {
    return setActive(!isActive);
  };

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setPublic] = useState(false);

  return (
    <div>
      <button onClick={createToggle}>Create new routine?</button>
      <div className={isActive ? null : "hidden"}>
        <form
          id="newRoutine"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const results = await createRoutine(name, goal, isPublic);
              return results;
            } catch (error) {
              throw error;
            }
          }}
        >
          <fieldset>
            <label>Name?</label>
            <input
              name="newName"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label>Goal?</label>
            <input
              name="newGoal"
              type="text"
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label>Set to Public?</label>
            <input
              name="newPublicStatus"
              type="checkbox"
              value={isPublic}
              onChange={() => {
                setPublic(!isPublic);
              }}
            />
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div classname="allRoutinesContainer">
        <h1>Your Routines</h1>
        {myRoutines
          ? myRoutines.map((routine) => {
              return (
                <div>
                  <Link to={`/routines/:${routine.id}`} key={routine.id}>
                    <singleRoutine routine={routine} />
                  </Link>
                  {routine.activity
                    ? routine.activity.map((activity) => {
                        return (
                          <Link
                            to={`/routine_activities/:${activity.id}`}
                            key={activity.id}
                          >
                            <singleActivity activity={activity} />
                          </Link>
                        );
                      })
                    : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default myRoutines;
