import React from "react";

import { Map, Marker, TileLayer } from "react-leaflet";

import { FiArrowRight } from "react-icons/fi";

import { useHistory } from "react-router-dom";

import notFound from "../images/not-found.svg";
import mapIcon from "../utils/mapIcon";

import "../styles/pages/pending-registrations.css";
import ProfileSidebar from "../components/ProfileSidebar";

export default function PendingRegistrations() {
  const navigate = useHistory();
  return (
    <div id="page-pending-registrations">
      <ProfileSidebar
        buttons={{ firstClass: "blue-button", secondClass: "yellow-button" }}
      />
      <main>
        <div className="pending-orphanages">
          <div className="top-bar">
            <h1>Cadastros pendentes</h1>
            <span>1 orfanato</span>
          </div>
          <div className="orphanage-list">
            <div className="orphanage-preview">
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
                  position={[-22.2890228, -46.606513]}
                />
              </Map>

              <footer>
                <h1>Orf. Esperança</h1>
                <div className="icons">
                  <div className="icon">
                    <FiArrowRight
                      size={18}
                      onClick={() => navigate.push("edit-orphanage")}
                    />
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
