import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/root";
import { createContextInner } from "@/server/trpc";
// export API handler
// @link https://trpc.io/docs/v11/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContextInner,
});
