import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchsuperheroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchsuperheroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data?.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

const addSuperHeroes = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHeroes, {
    // onSuccess: (data) => {
    //   // causes background refetch
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },

    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }, // can use uuid package for id
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
