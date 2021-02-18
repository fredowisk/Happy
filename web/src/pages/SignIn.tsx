import React, { FormEvent, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Aside from '../components/Aside';

import { useAuth } from '../hooks/auth';
import { FiArrowLeft } from "react-icons/fi";

import "../styles/pages/sign-in.css";

function SignIn() {
  const history = useHistory();
  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");

  const {signIn} = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

      try {
        await signIn({
          email,
          password,
        });

        history.push('/');
      } catch(err) {
        return alert("Erro no login");
      }
    };

  return (
    <div id="page-sign-in">
      <Aside />

      <div className="sign-in-right">
        <div className="button-block">
          <button type="button" onClick={history.goBack}>
            <FiArrowLeft size={24} color="#15C3D6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="sign-in-form">
          <fieldset>
            <legend>Fazer login</legend>
            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input 
              id="email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="check-block">
              <div className="checkbox">
                <input type="checkbox" id="1-option" className="checkbox" />
                <label htmlFor="1-option">Lembrar-me</label>
              </div>
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
