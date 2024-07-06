import { RouteConfig, createRoute, z } from "@hono/zod-openapi";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type Paths = "/users" | "/users/{id}";

export const routes = {
  "/users": {
    get: createRoute({
      summary: "全てのUserを取得します",
      tags: ["users"],
      method: "get",
      path: "/users",
      responses: {
        200: {
          content: {
            "application/json": {
              schema: z.array(userSchema),
            },
          },
          description: "Get all users",
        },
      },
    }),
  },
  "/users/{id}": {
    get: createRoute({
      summary: "指定されたIDのUserを取得します",
      tags: ["users"],
      method: "get",
      path: "/users/{id}",
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
        404: {
          description: "User not found",
        },
      },
    }),
  },
} as const satisfies {
  [P in Paths]: Partial<{
    [M in HttpMethods]: Omit<RouteConfig, "path" | "method"> & {
      path: P;
      method: M;
    };
  }>;
};

type HttpMethods = "get" | "post" | "put" | "delete";
