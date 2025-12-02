import { tmdbWithPage } from "./api.js";

export async function loadPaginated(endpoint, page) {
  if (page < 1) page = 1;
  if (page > 500) page = 500;

  return tmdbWithPage(endpoint, page);
}
