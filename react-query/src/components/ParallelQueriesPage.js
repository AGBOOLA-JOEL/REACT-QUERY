import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);
  return (
    <div>
      {friends?.data.map((data) => {
        return <div key={data.id}>{data.name}</div>;
      })}

      {superHeroes?.data.map((data) => {
        return <div key={data.id}>{data.name}</div>;
      })}
    </div>
  );
};
