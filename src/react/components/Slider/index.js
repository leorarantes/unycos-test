import React from "react";

import styles from "./index.module.css";
import getApiKey from "../../../services/getApiKey";
import api from "../../../services/api";

export default function Slider() {
  const key = getApiKey();
  const [info, setInfo] = React.useState([]);
  const [selectedSpotlight, setSelectedSpotlight] = React.useState({});

  React.useEffect(() => {
    async function loadComponent() {
      try {
        const { data } = await api.getSliderInfo(key);
        const spotlights = data.spotlights;
        setInfo([...spotlights]);
        setSelectedSpotlight({...spotlights[0]});
      } catch(error) {
        console.log(error);
      }
    }
    loadComponent();
  }, []);

  function selectSpotlight(spotlight) {
    setSelectedSpotlight({...spotlight});
  }

  return (
    <>
      <img src={selectedSpotlight.image} className={styles.selected}></img>
      <div className={styles.container}>
        <h2 className={styles.title}>{selectedSpotlight.title}</h2>
        <p className={styles.description}>{selectedSpotlight.description}</p>
        <ul className={styles.spotlights}>
          {info
            .filter((spotlight) => spotlight._id !== selectedSpotlight._id)
            .map((spotlight) => {
              const {_id, title, image} = spotlight;
              return (
                <li key={_id} onClick={() => selectSpotlight(spotlight)} className={styles.spotlight}>
                  <img src={image}></img>
                  <h3>{title}</h3>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
}