import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesHooked = () => {
  const [btnShow, setBtnShow] = useState(false);
  //FUNCTIONS THAT DEFINE FETCH ERROR AND FAILURE
  const onSuccess = (data) => { 
    console.log("performs a task when data is fetched", data);
  };
  const onError = (err) => {
    console.log("fetch failure", err);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>loading......</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroes</h2>
      {btnShow && <button onClick={refetch}>fetch data</button>}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/single/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* WRIITING FILTERED DATA FROM SELECT FUNCTION DESTRUCTURED 🚨 */}
      {/* {data.map((heroNames) => {
        return <div key={heroNames}>{heroNames}</div>;
      })} */}
    </>
  );
};
