import React from "react";

import Aside from "../components/Aside";
import { useHistory } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import "../styles/pages/forgot-password.css";

export default function ForgotPassword() {
  const { goBack } = useHistory();
  return (
    <div id="page-forgot-password">
      <Aside />
      
      <div className="forgot-right">
        <div className="button-block">
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#15C3D6" />
          </button>
        </div>
        <form onSubmit={() => {}} className="forgot-password-form">
          <fieldset>
            <legend>Esqueci a senha</legend>
            <span>
              Sua redefinição de senha será enviada para o e-mail cadastrado.
            </span>
            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input id="email" />
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
