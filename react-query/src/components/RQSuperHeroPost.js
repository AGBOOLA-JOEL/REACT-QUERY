import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroesData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroPost = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const onSuccess = (data) => {
    console.log("performs a task when data is fetched", data);
  };
  const onError = (err) => {
    console.log("fetch failure", err);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate: heroMutate } = useAddSuperHeroesData(); // can also add states like isLoading,isError and error
  const handleAddHero = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    heroMutate(hero);
    
  };

  if (isLoading || isFetching) {
    return <h2>loading......</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Post Request</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => {
            setAlterEgo(e.target.value);
          }}
        />
        <button onClick={handleAddHero}>Add heroes</button>
      </div>
      <button onClick={refetch}>fetch heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/single/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
