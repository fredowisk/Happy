import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanages_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const { user_id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
      //nome da relação entre as tabelas
      relations: ["images", "user"],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const orphanagesRepository = getRepository(Orphanage);

      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        where: {
          user: {
            id: '21d8fd0c-1a3b-4341-ab68-2c8dd493eeac'
          },
        },
        //nome da relação entre as tabelas
        relations: ["images", "user"],
      });

      return response.json(orphanageView.render(orphanage));
    } catch (err) {
      return response
        .status(404)
        .json({ message: "Orfanato não encontrado. Tente novamente" });
    }
  },

  async create(request: Request, response: Response) {
    const user_id = request.user.id;

    console.log(user_id);

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    //transformando o files em um array de arquivos
    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
      user_id,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      latitude: Yup.number().required("Latitude obrigatória"),
      longitude: Yup.number().required("Longitude obrigatória"),
      about: Yup.string().required("About obrigatório").max(300),
      instructions: Yup.string().required("Instruções obrigatórias"),
      opening_hours: Yup.string().required("Horarios obrigatórios"),
      open_on_weekends: Yup.boolean().required("Fim de semanas obrigatórios"),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
