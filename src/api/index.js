import axios from "axios";

const BASE = "http://fitnesstrac-kr.herokuapp.com";

export async function getUsers() {
  try {
    const { data } = await axios.get(`${BASE}/users`);
    return data;
  } catch (error) {
    throw error;
  }
}

//^this is a starting point
