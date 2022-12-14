import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";

import type { NextPage } from "next";
import { useState } from "react";
import { inferQueryReponse } from "./api/trpc/[trpc]";

const btn =
  " text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";
const Home: NextPage = () => {
  const [ids, updateIds] = useState(()=>getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);
  const voteForTheBest = (selected: number) => {
    if(selected === first) {
      voteMutation.mutate({votedFor:first, votedAgainst:second });
    } else {
      voteMutation.mutate({votedFor:second, votedAgainst:first });
    }
    updateIds(getOptionsForVote());
  };

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center"> which pokemon is better ?</div>
      <div className="p-2" />
      <div className=" border rounded p-8 flex justify-between items-center max-w-2xl">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <> <PokemonListing
            pokemon={firstPokemon.data}
            vote={() => voteForTheBest(first)}
          />
                 <div className="p-8">vs</div>
                 <PokemonListing
            pokemon={secondPokemon.data}
            vote={() => voteForTheBest(second)}
          />
          </>
           
          )}
      </div>
      <div className="p-2"></div>
    </div>
  );
};
type PokemonFromServer = inferQueryReponse<"get-pokemon-by-id">;

export const PokemonListing: React.FC<{ pokemon: PokemonFromServer,vote:()=>void }> = (
  props
) => {
  return (
    <div className="w-64 h-74 flex flex-col items-center">
      <img
        className="w-full"
        src={props.pokemon?.sprites.front_default || ""}
      />

      <div className="text-xl text-center capitalize">
        {props.pokemon?.name}
      </div>

      <button className={btn} onClick={() => props.vote()}>
        better
      </button>
    </div>
  );
};


export default Home;

