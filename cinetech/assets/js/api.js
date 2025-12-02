import { TMDB_API_KEY, TMDB_BASE_URL } from "./config.js";
// function qui prend un endpoint et retourne les données de l'API TMDB
export async function tmdb(endpoint) {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=fr-FR`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Erreur API TMDB : " + res.status);

  return res.json();
}
// function qui prend un endpoint et une page, retourne les données paginées de l'API TMDB
export async function tmdbWithPage(endpoint, page = 1) {
  if (page > 500) page = 500; // TMDB limite
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`;

  const res = await fetch(url);
  return res.json();
}
