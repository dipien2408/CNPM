import { useState, useContext } from "react"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./register.css"
import { AuthContext } from "../../context/AuthContext";
import AuthenticationService from "../../services/AuthenticationService";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    setError(false);
    if(password === confirm) {
      const data = await AuthenticationService.signUp({
        userName, 
        email,
        password
      })
      if(data) {
        dispatch({type: 'REGISTER', payload: data.data.token})
        
        const user = await AuthenticationService.me(data.data.token);
        
        dispatch({type: 'GET_CURRENT_USER', payload: user.data.data})
        
        history.push("/"); 
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }

    
    
    
  };
  return (
  <div className="register">
    <div className="registerContainer">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your user name..." onChange={e=>setUserName(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)} />
        <label>Confirm Password</label>
        <input className="registerInput" type="password" placeholder="Confirm your password..." onChange={e=>setPasswordConfirm(e.target.value)} />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLoginButton">
        <span style={{color:"black", }}>Already have an account? </span>
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
        {error && <span style={{color:"red"}}>Something go wrong!</span>}
    </div>
  </div>
  )
}