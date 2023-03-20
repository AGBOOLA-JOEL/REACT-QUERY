import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  console.log(queryClient);
  return useQuery(["super-hero", heroId], fetchHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero, // helps to put out info even when fetching data in background
        };
      } else {
        return undefined;
      }
    },
  });
};
