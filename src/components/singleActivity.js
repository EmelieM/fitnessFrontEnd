import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateRoutine, deleteRoutine } from "../api";

const singleActivity = ({ activity }) => {
  const history = useHistory();

  const activityId = activity.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
};

export default singleActivity;
