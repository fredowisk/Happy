import React from "react";

import { useHistory } from "react-router-dom";

import { FiPower, FiMapPin, FiInfo } from "react-icons/fi";
import mapMarkerImg from "../images/map-marker.svg";

interface Props {
  buttons: {
    firstClass: string;
    secondClass: string;
  };
}

export default function ProfileSidebar(props: Props) {
  const navigation = useHistory();
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />
      <div>
        <button
          className={props.buttons.firstClass}
          onClick={() => navigation.push("/dashboard")}
        >
          <FiMapPin size={24} />
        </button>
        <button
          className={props.buttons.secondClass}
          onClick={() => navigation.push("/pending-registrations")}
        >
          <FiInfo size={24} />
        </button>
      </div>
      <button type="button" onClick={navigation.goBack} className="blue-button">
        <FiPower size={24} />
      </button>
    </aside>
  );
}
