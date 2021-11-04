import axios from "axios";

import { getToken, storeUser } from "../auth";

const BASE = "http://fitnesstrac-kr.herokuapp.com/api";

//USERS

export async function registerUser(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/users/register`, {
      username,
      password,
    });
    storeUser(data.token);
    return data;
  } catch (error) {
    throw error;
  }
}

//

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/users/login`, {
      username,
      password,
    });
    if (!data) {
      throw Error({
        name: "noUser",
        message: "There is no user with those credentials!",
      });
    } else {
      storeUser(data.token);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

//

export async function getUserInfo() {
  const token = getToken();

  if (!token) {
    return;
  } else {
    try {
      const { data } = await axios.get(`${BASE}/users/me`, {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

//

export async function getUserRoutines() {
  const userData = await getUserInfo();
  const username = userData.username;
  try {
    const { data } = await axios.get(`${BASE}/users/${username}/routines`);
    return data;
  } catch (error) {
    throw error;
  }
}

//ACTIVITIES

export async function getActivities() {
  try {
    const { data } = await axios.get(`${BASE}/activities`);
    return data;
  } catch (error) {
    throw error;
  }
}

//

export async function createActivity(name, description) {
  const token = getToken();
  try {
    const { data } = await axios.post(
      `${BASE}/activities`,

      {
        name,
        description,
      },

      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

///

export async function editActivity(name, description, activityId) {
  const token = getToken();
  try {
    const { data } = await axios.patch(
      `${BASE}/activities/:${activityId}`,

      {
        name,
        description,
      },

      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

//

export async function getRoutinesWithActivity(activityId) {
  try {
    const { data } = await axios.get(
      `${BASE}/activities/:${activityId}/routines`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

//ROUTINES

export async function getRoutines() {
  try {
    const { data } = await axios.get(`${BASE}/routines`);
    return data;
  } catch (error) {
    throw error;
  }
}

//

export async function createRoutine(name, goal, isPublic) {
  const token = getToken();
  try {
    const { data } = await axios.post(
      `${BASE}/routines`,
      {
        name,
        goal,
        isPublic,
      },

      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

//

export async function updateRoutine(name, goal, isPublic) {
  try {
    const { data } = await axios.patch(
      `${BASE}/routines/:${routineId}`,
      {
        name,
        goal,
        isPublic,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

//

export async function deleteRoutine(routineId) {
  try {
    const { data } = axios.delete(`${BASE}/:${routineId}`, {
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//

export async function addSingleActivitytoRoutine(activityId, count, duration) {
  try {
    const { data } = await axios.post(
      `${BASE}/routines/:${routineId}/activities`,
      {
        activityId,
        count,
        duration,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

//ROUTINE_ACTIVITIES

export async function updateRoutineActivity(
  count,
  duration,
  routineActivityId
) {
  try {
    const { data } = await axios.patch(
      `${BASE}/routine_activities/:${routineActivityId}`,
      {
        count,
        duration,
      }
    );
  } catch (error) {
    throw error;
  }
}

//

export async function deleteRoutineActivity() {
  try {
    const { data } = await axios.delete(
      `${BASE}/routine_activities/:${routineActivityId}`,
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
