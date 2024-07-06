import { hc } from "hono/client";
import { apiRoute } from "./api";

export const client = hc<typeof apiRoute>("");
// The type does not match the intended shape
// const client: {
//   [x: string]: ClientRequest<{
//       [Method: `$${Lowercase<string>}`]: Endpoint;
//   }>;
// }
