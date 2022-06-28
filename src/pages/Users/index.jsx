/* eslint-disable jsx-a11y/anchor-has-content */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const req = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const Users = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8686/user", req)
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteUser = () => {
    axios
      .delete("http://localhost:8686/user/" + deleteUserId, req)
      .then((resp) => {
        const arr = users.filter((user) => user.id !== deleteUserId);

        setUsers(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditPage = (user) => {
    navigate("/admin/edit", {
      replace: false,
      state: user,
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
        flexDirection: "column",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div style={{ width: "80%" }}>
        <h1>Users</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr key={user.name + user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.role === 0 ? "Usuário Comum" : "Administrador"}
                      </td>
                      <td>
                        <button
                          className="button-3"
                          onClick={() => handleEditPage(user)}
                        >
                          Editar
                        </button>
                        <button
                          className="button-3"
                          style={{ backgroundColor: "red", marginLeft: "1rem" }}
                        >
                          <a
                            href="#modal"
                            style={{ textDecoration: "none", color: "white" }}
                            onClick={() => setDeleteUserId(user.id)}
                          >
                            Excluir
                          </a>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="modal-wrapper" id="modal">
          <div className="modal-body card">
            <div className="modal-header">
              <h2 className="heading">Deseja mesmo excluir o usuário?</h2>
              <a
                href="#!"
                role="button"
                className="close"
                aria-label="close this modal"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                </svg>
              </a>
            </div>
            <p>Essa operação não pode ser desfeita!</p>

            <a
              href="#!"
              className="button-3"
              style={{ backgroundColor: "red", marginLeft: "1rem" }}
              onClick={() => handleDeleteUser()}
            >
              Excluir
            </a>
          </div>
          <a href="#!" className="outside-trigger"></a>
        </div>
      </div>
    </div>
  );
};

export default Users;
