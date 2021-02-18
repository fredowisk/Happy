import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { hash } from 'bcryptjs';
import User from "../models/User";
import * as Yup from "yup";
import userView from "../views/users_view";

export default {
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(userView.renderMany(users));
  },
  async show(request: Request, response: Response) {
    try {
    const { id } = request.params;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);

    return response.json(userView.render(user));
    } catch(err) {
      return response.status(404).json({message: "Usuário não encontrado. Tente novamente"});
    }
  },
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if(checkUserExists) {
      return response.status(403).json({message: "Este e-mail já está em uso. Tente novamente"});
    }

    const hashedPassword = await hash(password, 8);

    const data = {
      name,
      email,
      password: hashedPassword,
    }

    console.log(data);

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      password: Yup.string().required('Senha obrigatória')
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}