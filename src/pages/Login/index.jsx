import { Alert, Button, createTheme, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./styles.css";

const initialValues = {
  email: "",
  password: "",
};

const Login = ({ children }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [messages, setMessages] = useState({
    error: "",
    success: false,
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    setInputValues(initialValues);

    axios
      .post("http://localhost:8686/login", inputValues)
      .then((res) => {
        console.log(res);
        setMessages((s) => ({
          error: "",
          success: true,
        }));

        localStorage.setItem("token", res.data.token);

        navigate("/admin/users");
      })
      .catch((err) => {
        console.log(err);
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
        <h1 style={{ color: "white" }}>Login</h1>

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

export default Login;
