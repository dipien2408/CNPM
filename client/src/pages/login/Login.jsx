import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import AuthenticationService from "../../services/AuthenticationService";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    
    const data = await AuthenticationService.signIn({
      email: emailRef.current.value,
      password: passwordRef.current.value
    })

    if(data) {
      dispatch({type: 'LOGIN', payload: data.data.token})
      
      const user = await AuthenticationService.me(data.data.token);

      dispatch({type: 'GET_CURRENT_USER', payload: user.data.data})
      console.log(user)
      setLoading(false);
      //history.push("/"); 
    } else {
      setError(true);
    }
    
     
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input className="loginInput" type="text" placeholder="Enter your email..." ref={emailRef}/>
          <label>Password</label>
          <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
          <button className="loginButton" type="submit" disabled={loading}>Login</button>
          <button className="loginRegisterButton">
            <span style={{color:"black", }}>Not a member? </span>
            <Link className="link" to="/register">
              Register
            </Link>
          </button>
          {error && <span style={{color:"red"}}>Wrong username or password!</span>}
        </form>     
      </div>    
    </div>
  );
}