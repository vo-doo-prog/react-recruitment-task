import { memo, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPokemonById } from "../../api/pokemon";
import { Alert } from "../../components/alert";
import { Breadcrumbs, BreadcrumbItem } from "../../components/breadcrumbs";
import { Button } from "../../components/button";
import { CircleLoader } from "../../components/loaders";
import { MAX_POKEMONS_LENGTH } from "../../constants/pokemon";
import { useFetch } from "../../hooks/use-fetch";
import styles from "./pokemon-page.module.css";

export const PokemonPage = memo(() => {
  const { id: idParam } = useParams<{ id: string }>();
  // NOTE: `idParam` expected to be within 1 to MAX_POKEMONS_LENGTH inclusive
  // Intentionally disallow fetching pokemon out of given range
  let id: number = Number(idParam) || 0;
  let isUnsupportedId = false;
  if (id - 1 < 0 || id > MAX_POKEMONS_LENGTH) {
    id = 0;
    isUnsupportedId = true;
  }

  const navigate = useNavigate();

  const { data, loading, errorMessage, retry } = useFetch({
    callback: getPokemonById,
    parameters: [id],
    skip: !id,
  });

  const handleBack = () => navigate("/");

  const { mappedStats, typesString } = useMemo(() => {
    const stats: Record<"hp" | "attack" | "defense", string> = {
      hp: "-",
      attack: "-",
      defense: "-",
    };

    if (!data) {
      return { typesString: "", mappedStats: stats };
    }

    data.stats.forEach((stat) => {
      const statName = stat.stat.name as keyof typeof stats;
      if (statName in stats) {
        stats[statName] = stat.base_stat.toString();
      }
    });

    return {
      typesString: data.types.map(({ type }) => type.name).join(", "),
      mappedStats: stats,
    };
  }, [data]);

  if (loading) {
    return (
      <main className={styles.pokemonPage}>
        <div className={styles.loadingContainer}>
          <CircleLoader />
        </div>
      </main>
    );
  }

  if (!id || errorMessage || !data) {
    return (
      <main className={styles.pokemonPage}>
        <div className={styles.errorContainer}>
          <Alert>
            Error: {errorMessage || "Invalid/Unsupported Pokemon id"}
          </Alert>
          <Button onClick={handleBack}>Go Back</Button>
          {!isUnsupportedId && <Button onClick={retry}>Retry</Button>}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.pokemonPage}>
      <Breadcrumbs>
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="#">{data.name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className={styles.pokemonInformationContainer}>
        <img
          className={styles.image}
          src={`/assets/${id}.png`}
          alt={data.name}
        />
        <div className={styles.pokemonInformation}>
          <h1 className={styles.pokemonName}>{data.name}</h1>

          <dl className={styles.pokemonStats}>
            <dt>Types</dt>
            <dd>{typesString}</dd>

            <dt>Height</dt>
            <dd>{data.height}</dd>

            <dt>Weight</dt>
            <dd>{data.weight}</dd>

            <dt>HP</dt>
            <dd>{mappedStats.hp}</dd>

            <dt>Attack</dt>
            <dd>{mappedStats.attack}</dd>

            <dt>Defense</dt>
            <dd>{mappedStats.defense}</dd>
          </dl>
        </div>
      </div>
    </main>
  );
});
