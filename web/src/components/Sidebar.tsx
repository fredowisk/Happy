import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/sidebar.css";

export default function Sidebar() {
  const navigation = useHistory();
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />
      <button type="button" onClick={navigation.goBack} className="blue-button">
        <FiArrowLeft size={24} />
      </button>
    </aside>
  );
}
