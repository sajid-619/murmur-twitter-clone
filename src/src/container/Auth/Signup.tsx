import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useRecoilState } from "recoil";

import { signUpser } from "../../api/user";
import { loggedInState, userState } from "../../atoms/user";
import { loggedUserProrps } from "../../model";

const Signup: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);
  const [, setIsLoggedIn] = useRecoilState(loggedInState);

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

  const handleSignUp = async () => {
    if(!name || !password) {
      setError("Email and password required!");
    } else {
      const res: loggedUserProrps = await signUpser(name, email, password);
      if (res.error === true) {
        setError("Sign up failed. Please Try Again");
      } else {
        setUser(res.data);
        setIsLoggedIn(true);
        navigate("/timeline")
      }
    }
  };

  return (
    <div className="container">
      <p>Registration</p>
      Name:&nbsp; &nbsp; &nbsp;
      <input
        type="text"
        placeholder="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
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
      <button onClick={handleSignUp}>Signup</button>
    </div>
  );
};

export default Signup;
