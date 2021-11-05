import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateRoutine, deleteRoutine } from "../api";

const singleRoutine = ({ routine }) => {
  const history = useHistory();

  const routineId = routine.id;

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setPublic] = useState(false);

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
    </div>
  );
};

export default singleRoutine;
