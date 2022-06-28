import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const initialValues = {
  email: "",
  name: "",
  role: 0,
};

const req = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const EditUser = ({ children }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);

  useEffect(() => {
    if (location.state === null) {
      navigate("/admin/users");
    }

    setInputValues(location.state);
  }, [location.state, navigate]);

  const handleSubmit = () => {
    axios
      .patch("http://localhost:8686/user", inputValues, req)
      .then((resp) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    //
    //
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div>
        <h1 style={{ color: "white" }}>Edição de Usuário</h1>

        <Input
          id="standard-basic"
          placeholder="Digite seu Nome"
          variant="standard"
          className="input"
          color="primary"
          style={{ color: "white" }}
          value={inputValues.name}
          onChange={(e) =>
            setInputValues((s) => ({ ...s, name: e.target.value }))
          }
        />
        <br />
        <br />
        <Input
          id="standard-basic"
          placeholder="Digite seu email"
          variant="standard"
          className="input"
          style={{ color: "white" }}
          value={inputValues.email}
          onChange={(e) =>
            setInputValues((s) => ({ ...s, email: e.target.value }))
          }
        />
        <br />
        <br />
        <Input
          id="standard-basic"
          placeholder="Digite a role"
          type="number"
          variant="standard"
          className="input"
          style={{ color: "white" }}
          value={inputValues.role}
          onChange={(e) =>
            setInputValues((s) => ({
              ...s,
              role: parseInt(e.target.value),
            }))
          }
        />
        <br />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Contained
        </Button>
      </div>
    </div>
  );
};

export default EditUser;
