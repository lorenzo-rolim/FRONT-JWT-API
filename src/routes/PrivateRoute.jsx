import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .post("http://localhost:8686/validate", {}, req)
      .then((res) => {
        console.log(res);
        setAuth(true);
      })
      .catch((err) => {
        console.log(err.response);
        localStorage.removeItem("token");
        return navigate("/login");
      });
  }, [children, navigate]);

  return <div>{auth ? children : ""}</div>;
};

export default PrivateRoute;
