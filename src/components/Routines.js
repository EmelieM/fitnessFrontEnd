import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import { getRoutines } from "../api";

const Routines = (props) => {
  const [routines, setRoutines] = useState(null);

  useEffect(async () => {
    const allRoutines = await getRoutines();
    setRoutines(allRoutines);
  }, []);

  return (
    <div className="allRoutinesContainer">
      <h1>All Routines</h1>
      {routines
        ? routines.map((routine) => {
            return (
              <div key={routine.id}>
                <h1>{routine.name}</h1>
                <h3>{routine.goal}</h3>
                <p>Created by {routine.creatorName}</p>
                {routine.activity
                  ? routine.activity.map((activity) => {
                      return (
                        <div key={activity.id}>
                          <h4>Activities</h4>
                          <p>{activity.name}</p>
                          <p>{activity.description}</p>
                          <p>Duration: {activity.duration}</p>
                          <p>Count: {activity.count}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Routines;
