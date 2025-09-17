import React, { memo } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./pokemon-card.module.css";

export interface PockemonCardProps {
  id: number;
  name: string;
}

export const PockemonCard: React.FC<PockemonCardProps> = memo(
  ({ id, name }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/pokemon/${id}`);
    };

    return (
      <figure className={styles.pokemonCardContainer} onClick={handleClick}>
        <img className={styles.image} src={`/assets/${id}.png`} alt={name} />
        <figcaption className={styles.name}>
          <Link to={`/pokemon/${id}`} className={styles.link}>
            {name}
          </Link>
        </figcaption>
        <span className={styles.id}>{id}</span>
      </figure>
    );
  }
);
