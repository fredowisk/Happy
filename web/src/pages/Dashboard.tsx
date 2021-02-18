import React, { useEffect, useState } from "react";

import { Map, Marker, TileLayer } from "react-leaflet";

import { FiEdit3, FiTrash } from "react-icons/fi";

import mapIcon from "../utils/mapIcon";
import notFound from "../images/not-found.svg";
import "../styles/pages/dashboard.css";
import api from "../services/api";
import ProfileSidebar from "../components/ProfileSidebar";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/auth";

interface OrphanageItem {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigation = useHistory();
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);

  useEffect(() => {
    api
      .get(`/orphanages/${user.id}`)
      .then((response) => setOrphanages(response.data));
  }, [user.id]);

  return (
    <div id="page-dashboard">
      <ProfileSidebar
        buttons={{ firstClass: "yellow-button", secondClass: "blue-button" }}
      />
      <main>
        <div className="registered-orphanages">
          <div className="top-bar">
            <h1>Orfanatos Cadastrados</h1>
            <span>2 orfanatos</span>
          </div>
          {orphanages.length > 0 ? (
            <div className="orphanage-list">
              {orphanages.map((orphanage) => {
                return (
                  <div className="orphanage-preview" key={orphanage.id}>
                    <Map
                      center={[-22.2890228, -46.606513]}
                      zoom={16}
                      style={{ width: "100%", height: 220 }}
                      dragging={false}
                      touchZoom={false}
                      zoomControl={false}
                      scrollWheelZoom={false}
                      doubleClickZoom={false}
                    >
                      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker
                        interactive={false}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                      />
                    </Map>

                    <footer>
                      <h1>{orphanage.name}</h1>
                      <div className="icons">
                        <div className="icon">
                          <FiEdit3
                            size={18}
                            onClick={() => navigation.push("/edit-orphanage")}
                          />
                        </div>
                        <div className="icon">
                          <FiTrash size={18} />
                        </div>
                      </div>
                    </footer>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="image-container">
              <img src={notFound} alt="Nenhum no momento" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
