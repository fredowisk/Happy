import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";


import mapIcon from "../utils/mapIcon";
import { FiPlus, FiX } from "react-icons/fi";
import Sidebar from '../components/Sidebar';
import '../styles/pages/edit-orphanage.css';
import api from '../services/api';

interface ImagesData {
  originalName: string,
  URL: string,
}

export default function EditOrphanage() {

  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<ImagesData[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) =>({
      originalName: image.name,
      URL: URL.createObjectURL(image)
      })
    );

    setPreviewImages(selectedImagesPreview);
  }

  function deleteImage(selectedImage: ImagesData) {
    const selectedImages = previewImages.filter((image) => image.URL !== selectedImage.URL);

    setPreviewImages(selectedImages);

    const newImages = images.filter((image) => image.name !== selectedImage.originalName);

    setImages(newImages);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    images.forEach((image) => {
      data.append("images", image);
    });

    await api.post("/orphanages", data);

    alert("Cadastro realizado com sucesso!");

    history.push("/app");
  }

  return (
    <div id="page-edit-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="edit-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            <Map
              center={[-25.2112642, -49.1120413]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>

              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
              </label>

              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => (
                  <div key={image.originalName}>
                  <img src={image.URL} alt={name} />
                    <button type="button" onClick={() => deleteImage(image)}>
                      <FiX size={24} color="#ff669d" />
                    </button>
                    </div>
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>

              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>

              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Salvar
          </button>
        </form>
      </main>
    </div>
  )
}