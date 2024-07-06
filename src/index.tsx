import { hc } from "hono/client";
import { renderer } from "./renderer";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const userSchema = z
  .object({
    id: z.string().openapi({ description: "userId", example: "1" }),
    name: z.string().openapi({ description: "userName", example: "John" }),
  })
  .openapi("User");

const app = new OpenAPIHono();

const routes = app.openapi(
  createRoute({
    method: "get",
    path: "/api/users/{id}",
    request: {
      params: z.object({
        id: z.coerce.number().openapi({ description: "userId", example: 1 }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: userSchema,
          },
        },
        description: "Get a user",
      },
    },
  }),
  (c) => {
    return c.json({ id: "1", name: "John" });
  }
);

const client = hc<typeof routes>("/");
// The type does not match the intended shape
// const client: {
//   [x: string]: ClientRequest<{
//       [Method: `$${Lowercase<string>}`]: Endpoint;
//   }>;
// }

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello!</h1>);
});

export default app;
