import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteRoutineActivity, editActivity } from "../api";

const SingleActivity = ({ activity }) => {
  const history = useHistory();

  const activityId = activity.id;

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
            <label>Change Description?</label>
            <input
              name="editDesc"
              type="text"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <button type="submit">Submit</button>
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
            onClick={async (event) => {
              event.preventDefault();
              certainDelete
                ? await deleteRoutineActivity(activity.routineActivityId)
                : null;
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
