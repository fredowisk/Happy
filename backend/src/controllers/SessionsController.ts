import { Request, Response } from "express";
import {sign} from 'jsonwebtoken';
import authConfig from '../config/auth';
import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';
import User from "../models/User";

export default {
  async create(request: Request, response: Response) {
    const { email, password} = request.body;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email }
    });

    if(!user) {
      return response.status(401).json({ message: 'Email/password incorretos'});
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      return response.status(401).json({message: 'Email/password incorretos'});
    }

    const { secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return response.json({user, token});
  }
}