import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchsuperheroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const [btnShow, setBtnShow] = useState(false);
  //FUNCTIONS THAT DEFINE FETCH ERROR AND FAILURE
  const onSuccess = (data) => {
    console.log("performs a task when data is fetched", data);
  };
  const onError = (err) => {
    console.log("fetch failure", err);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes" /*UNIQUE KEY */,
    fetchsuperheroes /* FETCHER FUNCTION */,

    // OBJECT SPECIFYING FUNCTIONS OR CONFIGURATIONS 🚨
    // CACHING IN REACT QUERY  🚨
    // {
    //   /*default cacheTime is 5 minutes */
    //   cacheTime:5000,
    //   staleTime: 0 /*no request is made in this timeframe,data remains fresh,default staleTime is zero  second*/,
    //   refetchOnMount: true /*true,false,"always"*/ /*always refetch when component is loaded*/,
    //   refetchOnWindowFocus:
    //     "always" /*true,false,"always"*/ /*refresh pages when user comes back to application */,
    //   refetchInterval: 2000 /*true,false,number(2000)*/ /*time for refetching data*/,
    //   refetchIntervalInBackground: true /*continues to fecth and poll data when not in application */,
    // }

    //CONTROLS WHEN DATA IS FETCHED ,CONTROLLER IN HIDDEN BTN 🚨
    // {
    //   enabled: false /* data will not be fetched,destructure the refetch function to use enable fetch and pass in a button */,
    // }

    //HANDLING FETCH SUCCESS AND ERROR 🚨
    {
      onError,
      onSuccess,
      // FILTERING DATA BEFORE USING THEM 🚨
      select: (data) => {
        const superHeroNames = data?.data.map((hero) => hero.name);
        return superHeroNames;
      },
    }
  );
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
      {/* {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })} */}
      {/* WRIITING FILTERED DATA FROM SELECT FUNCTION DESTRUCTURED 🚨 */}
      {data.map((heroNames) => {
        return <div key={heroNames}>{heroNames}</div>;
      })}
    </>
  );
};
