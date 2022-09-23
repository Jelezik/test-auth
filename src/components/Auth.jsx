import React, {useState} from 'react';
import "../styles/Auth.css"
import axios from "axios";

const Auth = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  function postUser(e) {
    e.preventDefault();

    axios.post(`http://neurodoc.online/api/api/${process.env.REACT_APP_API_KEY}`, {
      "username": login,
      "password": password
    })
      .then(response => {
        console.log(response);
        localStorage.setItem('AuthSuccess', response);
      })
      .catch(error => {
        console.log(error);
        setResponse(`Ошибка авторизации: ${error.message}`)
      });
  }

  return (
    <div id="login">
      <form>
        <fieldset className="clearfix">
          <p><span className="fontawesome-user"></span>
            <input
              value={login}
              onChange={e => setLogin(e.target.value)}
              type="text"
              placeholder="Логин"/>
          </p>
          <p><span className="fontawesome-lock"></span>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Пароль"/>
          </p>
          <p><input type="submit" value="ВОЙТИ" onClick={postUser}/></p>
        </fieldset>
        <p className="responseServer">{response}</p>
      </form>
    </div>
  );
};

export default Auth;