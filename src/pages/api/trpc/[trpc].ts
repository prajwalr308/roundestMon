
import { AppRouter, appRouter } from '@/backend/router';
import { inferProcedureOutput } from '@trpc/server';

import * as trpcNext from '@trpc/server/adapters/next';

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
  });

  export type inferQueryReponse<TRouteKey extends keyof AppRouter["_def"]["queries"]> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;