import Orphanage from "../models/Orphanage";
import imagesView from "./images_view";
import usersView from './users_view';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
      user: usersView.render(orphanage.user),
    };
  },

  renderMany(orphanages: Orphanage[]) {
    //realize um map que chama a função acima, passando o orphanage selecionado
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};
