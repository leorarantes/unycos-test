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
        //const { data } = await api.getSliderInfo(key);
        const data = {
          spotlights: [
            {
              _id: 1,
              title: "Estilos de natación",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu 
              lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi 
              tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque 
              purus magna, auctor et, sagittis ac.`,
              image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
              _id: 2,
              title: "Preparación física",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu 
              lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi 
              tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque 
              purus magna, auctor et, sagittis ac.`,
              image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
              _id: 3,
              title: "Entrenar para el éxito",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu 
              lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi 
              tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque 
              purus magna, auctor et, sagittis ac.`,
              image: "https://images.pexels.com/photos/8688534/pexels-photo-8688534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
              _id: 4,
              title: "Plan de entrenamiento",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu 
              lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi 
              tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque 
              purus magna, auctor et, sagittis ac.`,
              image: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          ]
        }
        const spotlights = data.spotlights;
        setInfo([...spotlights]);
        setSelectedSpotlight({...spotlights[0]});
        console.log(data);
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