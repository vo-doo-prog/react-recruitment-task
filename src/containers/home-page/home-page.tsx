import { memo, useState } from "react";

import { listPokemons } from "../../api/pokemon";
import { Alert } from "../../components/alert";
import { Button } from "../../components/button";
import { CircleLoader } from "../../components/loaders";
import { Pagination, PaginationProps } from "../../components/pagination";
import { PockemonCard } from "../../components/pokemon-card";
import { MAX_POKEMONS_LENGTH } from "../../constants/pokemon";
import { useFetch } from "../../hooks/use-fetch";
import styles from "./home-page.module.css";

export const Homepage = memo(() => {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);

  const { data, loading, errorMessage, retry } = useFetch({
    callback: listPokemons,
    parameters: [
      offset,
      // NOTE: limit should not exceed MAX_POKEMONS_LENGTH
      offset + limit > MAX_POKEMONS_LENGTH
        ? MAX_POKEMONS_LENGTH - offset
        : limit,
    ],
  });
  const count = Math.min(data?.count || 0, MAX_POKEMONS_LENGTH);
  const pageCount = Math.ceil(count / limit);
  const currentPage = offset / limit;

  const handlePageChange: PaginationProps["onPageChange"] = ({ selected }) => {
    setOffset(selected * limit);
  };

  return (
    <main className={styles.homePage}>
      <h1 className={styles.heading}>Pokedex</h1>

      {loading && (
        <div className={styles.loadingContainer}>
          <CircleLoader />
        </div>
      )}

      {!loading && errorMessage && (
        <div className={styles.errorContainer}>
          <Alert>Error: {errorMessage}</Alert>
          <Button onClick={retry}>Retry</Button>
        </div>
      )}

      {data && (
        <>
          <div className={styles.pokemonsContainer}>
            {data.results.map(({ name }, index) => (
              <PockemonCard key={name} id={offset + index + 1} name={name} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
});
