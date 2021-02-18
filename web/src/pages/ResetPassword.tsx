import React, { useState } from "react";

import Aside from "../components/Aside";

import { FiEye, FiEyeOff } from "react-icons/fi";

import "../styles/pages/reset-password.css";

export default function ResetPassword() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  return (
    <div id="page-reset-password">
      <Aside />

      <form onSubmit={() => {}} className="reset-password-form">
        <fieldset>
          <legend>Redefinição de senha</legend>
          <span>
            Escolha uma nova senha para você acessar o dashboard do Happy
          </span>
          <div className="input-block">
            <label htmlFor="new-password">Nova senha</label>
            <input id="new-password" type={passwordType} />
            {passwordType === "password" ? (
              <FiEye
                size={24}
                id="reset-image"
                onClick={() => setPasswordType("text")}
              />
            ) : (
              <FiEyeOff
                size={24}
                id="reset-image"
                onClick={() => setPasswordType("password")}
              />
            )}
          </div>
          <div className="input-block">
            <label htmlFor="repeat-password">Repetir senha</label>
            <input id="repeat-password" type={passwordType2} />
            {passwordType2 === "password" ? (
              <FiEye
                size={24}
                id="reset-image"
                onClick={() => setPasswordType2("text")}
              />
            ) : (
              <FiEyeOff
                size={24}
                id="reset-image"
                onClick={() => setPasswordType2("password")}
              />
            )}
          </div>

          <button className="confirm-button" type="submit">
            Redefinir
          </button>
        </fieldset>
      </form>
    </div>
  );
}
