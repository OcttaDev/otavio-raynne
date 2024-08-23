// pages/api/json-server.ts

import { NextApiRequest, NextApiResponse } from "next";
import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default (req: NextApiRequest, res: NextApiResponse) => {
  server(req, res);
};
