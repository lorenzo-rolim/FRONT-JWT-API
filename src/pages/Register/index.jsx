import { Alert, Button, createTheme, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./styles.css";

const initialValues = {
  email: "",
  name: "",
  password: "",
};

const Register = ({ children }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [messages, setMessages] = useState({
    error: "",
    success: false,
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    setInputValues(initialValues);

    axios
      .post("http://localhost:8686/user", inputValues)
      .then((res) => {
        setMessages((s) => ({
          error: "",
          success: true,
        }));
        navigate("/login");
      })
      .catch((err) => {
        setMessages((s) => ({
          error: err.response.data.err,
          success: false,
        }));
      });
  };

  return (
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
        {messages.success && (
          <Alert severity="success">Usuário cadastrado com sucesso!</Alert>
        )}
        {messages.error && <Alert severity="error">{messages.error}</Alert>}
        <h1 style={{ color: "white" }}>Registro de Usuário</h1>

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
          type={"password"}
          placeholder="Digite sua senha"
          variant="standard"
          className="input"
          style={{ color: "white" }}
          value={inputValues.password}
          onChange={(e) =>
            setInputValues((s) => ({ ...s, password: e.target.value }))
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

export default Register;
