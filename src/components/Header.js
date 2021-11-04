import React, { useState, useEffect } from "react";

import { getToken } from "../auth";

const Header = (props) => {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <h1>Welcome to Fitness Tracker World!</h1>
    </div>
  );
};

export default Header;
