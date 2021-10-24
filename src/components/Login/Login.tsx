import {SyntheticEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Routes} from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock';

import './login-style.scss';

const Login = () => {
  const {push} = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errors, setErrors] = useState<any>({});

  const formControl = (input) => {
    const {
      name,
      value
    } = input;

    switch (name) {
      case 'username':
        errors.username = '';
        if (!value.length)
          errors.username = 'Username is required!';
        break;
      case 'password':
        errors.password = '';
        if (!value.length)
          errors.password = 'Password is required!';
        break;
      default:
        break;
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    formControl({name, value});

    switch (name){
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value)
        break;
      default: break;
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (errors.username || errors.password) isValid = false;
    if (username === '' || password === '') {
      errors.username = username === '' && 'Username is required!';
      errors.password = password === '' && 'Password is required!';
      isValid = false;
    };

    return isValid;
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    console.log(validateForm());

    if(validateForm()) {
      try {
        await login(username, password);
        push(Routes.Users);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }
    }

  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center mb-28px">
          Mygom.tech
        </h1>
        <div className="input-item">
          <input
            onChange={handleChange}
            placeholder="Username"
            name="username"
            type="text"
            className={`input-item__input mt-24px ${errors.username && 'error'}`}
          />
          {errors.username &&
            <span className="input-item__message sm-text">{errors.username}</span>}
        </div>
        <div className="input-item">
          <input
            onChange={handleChange}
            placeholder="Password"
            name="password"
            type="password"
            className={`input-item__input mt-24px ${errors.password && 'error'}`}
          />
          {errors.password &&
            <span className="input-item__message sm-text">{errors.password}</span>}
        </div>
        <button type="submit" className="button mt-24px" disabled={errors.username || errors.password}>
          Login
        </button>
        <ErrorBlock error={errorMessage}/>
      </form>
    </div>
  )
};

export default Login;
