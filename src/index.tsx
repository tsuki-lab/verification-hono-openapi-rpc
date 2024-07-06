import { renderer } from "./renderer";
import { api } from "./api";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

app.route("/api", api);

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello!</h1>);
});

app.get(
  "/swagger-ui",
  swaggerUI({
    url: "/openapi.json",
  })
);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "API",
    version: "1.0.0",
  },
});

export default app;
