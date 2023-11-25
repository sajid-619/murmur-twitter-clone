import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginuser } from "../../api/user";
import { loggedInState, userState } from "../../atoms/user";
import swal from "sweetalert";
import { useRecoilState } from "recoil";

import { loggedUserProrps } from "../../model";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [, setUser] = useRecoilState(userState);
  const [, setIsLoggedIn] = useRecoilState(loggedInState);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      swal({
        title: "Some error occured",
        text: error,
        icon: "error",
      });
    }
    setError("");
  }, [error]);

  const handleLogin = async () => {
    const res: loggedUserProrps = await loginuser(email, password);
    if (res.error === true) {
      setError("Login failed. Please Try Again");
    } else {
      setUser(res.data);
      setIsLoggedIn(true);
      navigate("timeline");
    }
  };

  return (
    <div className="container">
      <p>Login</p>
      Email :&nbsp;&nbsp; &nbsp;&nbsp;
      <input
        type="email"
        placeholder="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      Password:{" "}
      <input
        type="password"
        required
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
