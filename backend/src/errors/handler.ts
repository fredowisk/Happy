import { ErrorRequestHandler } from "express";

import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    //percorrendo os erros
    error.inner.forEach((err) => {
      if (err.path) {
        //para cada index do array de erros, adicione o erro do momento
        errors[err.path] = err.errors;
      }
    });

    return response.status(400).json({ message: "Erro na validação!", errors });
  }
  return response.status(500).json({ message: "Erro interno no servidor." });
};

export default errorHandler;
