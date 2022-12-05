import { afterAll, expect, test } from "vitest";

import build from "../src/app";

const server = build();
test("with HTTP injection", async () => {
  const response = await server.inject({
    method: "GET",
    url: "/",
  });
  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.payload)).toStrictEqual({ root: true });
});

afterAll(async () => {
  await server.close();
});
