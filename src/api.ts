import { OpenAPIHono } from "@hono/zod-openapi";
import { routes } from "./routes";

export const api = new OpenAPIHono();

export const apiRoute = api
  .openapi(routes["/users"].get, (c) => {
    return c.json([{ id: "1", name: "John" }]);
  })
  .openapi(routes["/users/{id}"].get, (c) => {
    return c.json({ id: "1", name: "John" });
  });
