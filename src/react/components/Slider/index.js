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
        const spotlights = [
          {
            _id: "5e4c9964d4162a18fb16dd5e",
            title: "Entrena para el éxito",
            description: "Mireia Belmonte  y su equipo ponen a tu alcance los conocimientos y técnicas detrás del entrenamiento de una campeona olímpica. \nConoce su preparación dentro y fuera del agua de la mano de su entrenador y preparador físico.",
            order: 1,
            image: "https://content.unycos.com/courses/natacion/img/spotlights/Mireia-1847.jpg"
          },
          {
            _id: "5e4c997cd4162a18fb16dd60",
            title: "Estilos de natación",
            description: "Una perfecta ejecución de estos estilos, unida al control y a la resistencia, te permitirá convertirte en un nadador interdisciplinar. Mireia y su equipo te enseñarán las claves y los secretos para dominarlos todos desde cero.",
            order: 2,
            image: "https://content.unycos.com/courses/natacion/img/spotlights/mireia-belmonte-curso-natacion-slide-02.jpg"
          },
          {
            _id: "5e4c9994d4162a18fb16dd65",
            title: "Preparación física",
            description: "Estar en forma va mucho más allá de la piscina. Los preparadores físicos de Mireia te proporcionan una rutina de entrenamiento y tablas de ejercicios que mejorarán tu resistencia, fuerza y flexibilidad para rendir al máximo en el agua.",
            order: 3,
            image: "https://content.unycos.com/courses/natacion/img/spotlights/mireia-belmonte-curso-natacion-slide-03.jpg"
          },
          {
            _id: "5e4c99a5d4162a18fb16dd69",
            title: "Virajes y saltos",
            description: "El manejo de los saltos y virajes mejorará considerablemente tu rendimiento y tu técnica de natación. Los profesionales de fama internacional que asisten a Mireia te enseñan a perfeccionar esta técnica.",
            order: 4,
            image: "https://content.unycos.com/courses/natacion/img/spotlights/mireia-belmonte-curso-natacion-slide-04.jpg"
          }
        ]
        setInfo([...spotlights]);
        setSelectedSpotlight({...spotlights[0]});
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