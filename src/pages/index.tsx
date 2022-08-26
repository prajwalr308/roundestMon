import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";

import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote);
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(["get pokemon by id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get pokemon by id", { id: second }]);
  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>loading...</div>;
  }
  const voteForTheBest = (selected: number) => {
    updateIds(getOptionsForVote);
  };
  const btn =
    " text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center"> which pokemon is better ?</div>
      <div className="p-2" />
      <div className=" border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-74 flex flex-col items-center">
          <img
            className="w-full"
            src={firstPokemon.data?.sprites.front_default || ""}
          />

          <div className="text-xl text-center capitalize">
            {firstPokemon.data?.name}
          </div>

          <button className={btn} onClick={() => voteForTheBest(first)}>
            better
          </button>
        </div>
        <div className="p-8">vs</div>
        <div className="w-64 h-74 flex flex-col items-center">
          <img
            className="w-full"
            src={secondPokemon.data?.sprites.front_default || ""}
          />
          <div className="text-xl text-center capitalize">
            {secondPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForTheBest(second)}>
            better
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
