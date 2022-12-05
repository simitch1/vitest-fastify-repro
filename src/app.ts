import { join } from "path";
import AutoLoad from "@fastify/autoload";
import Fastify, { FastifyInstance, FastifyServerOptions } from "fastify";

const build = (opts: FastifyServerOptions = {}) => {
  const server: FastifyInstance = Fastify(opts);
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void server.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void server.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
  server.get("/ping", async (request, reply) => {
    console.log("called");
    return { pong: "it worked!" };
  });
  return server;
};
export default build;
