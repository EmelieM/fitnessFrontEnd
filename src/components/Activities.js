import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import SingleActivity from "./SingleActivity";

import { getActivities, createActivity } from "../api";
import { getToken } from "../auth";

const Activities = () => {
  const [activities, setActivities] = useState(null);

  useEffect(async () => {
    const allActivities = await getActivities();
    setActivities(allActivities);
  }, []);

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  const [isActive, setActive] = useState(false);
  const formToggle = () => {
    return setActive(!isActive);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [token, setToken] = useState("");

  return (
    <div>
      <h1>Activities</h1>

      {token ? (
        <div>
          <button onClick={formToggle}>Create New Activity</button>
          <div className={isActive ? null : "hidden"}>
            <form
              id="newActivity"
              onSubmit={async (event) => {
                event.preventDefault();

                try {
                  const results = await createActivity(name, description);
                  return results;
                } catch (error) {
                  throw error;
                } finally {
                  window.location.reload();
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
                <label>Description?</label>
                <input
                  name="newDescription"
                  type="text"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </fieldset>
            </form>
          </div>
        </div>
      ) : null}

      {activities
        ? activities.map((activity) => {
            return (
              <div key={activity.id}>
                <h1>{activity.name}</h1>
                <h2>{activity.description}</h2>
                <SingleActivity activity={activity} key={activity.id} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Activities;
