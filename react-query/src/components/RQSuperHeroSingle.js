import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";
export const RQSuperHeroSingle = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>loading....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name}-{data?.data.alterEgo}
    </div>
  );
};
