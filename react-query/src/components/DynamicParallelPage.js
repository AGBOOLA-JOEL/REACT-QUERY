import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResult = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log(queryResult);
  return (
    <div>
      {/* {queryResult.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })} */}
      hshs
    </div>
  );
};
