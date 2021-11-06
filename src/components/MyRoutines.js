import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import SingleRoutine from "./SingleRoutine";
import SingleActivity from "./SingleActivity";

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
              const newRoutineArr = [results, ...myRoutines];
              setMyRoutines(newRoutineArr);
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

      <div className="allRoutinesContainer">
        <h1>Your Routines</h1>
        {myRoutines
          ? myRoutines.map((routine) => {
              return (
                <div key={routine.id}>
                  <SingleRoutine routine={routine} />
                  {routine.activities
                    ? routine.activities.map((act) => {
                        return (
                          <div key={act.id}>
                            <p>{act.name}</p>
                            <p>{act.description}</p>
                            <SingleActivity activity={act} key={act.id} />
                          </div>
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
