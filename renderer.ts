import server from "./src/server";
import { toRequest } from "h3";

export default async function renderer(event: any) {
  let req: Request;
  if (event?.req instanceof Request) {
    req = event.req;
  } else if (event?.node?.req) {
    req = toRequest(event);
  } else if (event instanceof Request) {
    req = event;
  } else {
    try {
      req = toRequest(event);
    } catch {
      req = event.req;
    }
  }
  return await server.fetch(req, {}, {});
}
