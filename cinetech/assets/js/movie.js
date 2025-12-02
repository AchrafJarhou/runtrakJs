import { loadPaginated } from "./pagination.js";
import { tmdb } from "./api.js";
import { TMDB_IMG } from "./config.js";
import {
  toggleFavorite as toggleFavModule,
  isFavorite,
  getFavorites,
} from "./favorites.js";

/* ---------------- FILMS ---------------- */
if (document.getElementById("movies-list")) {
  handleMoviesPagination();
}

async function handleMoviesPagination() {
  let page = 1;

  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const pageNumber = document.getElementById("page-number");
  const list = document.getElementById("movies-list");

  async function load() {
    const data = await loadPaginated("/movie/popular", page);

    pageNumber.textContent = `Page ${page}`;
    displayGrid(list, data.results);
  }

  btnPrev.onclick = () => {
    if (page > 1) page--;
    load();
  };
  btnNext.onclick = () => {
    if (page < 500) page++;
    load();
  };

  load();
}

/* ---------------- SERIES ---------------- */
if (document.getElementById("series-list")) {
  handleSeriesPagination();
}

async function handleSeriesPagination() {
  let page = 1;

  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const pageNumber = document.getElementById("page-number");
  const list = document.getElementById("series-list");

  async function load() {
    const data = await loadPaginated("/tv/popular", page);

    pageNumber.textContent = `Page ${page}`;
    displayGrid(list, data.results);
  }

  btnPrev.onclick = () => {
    if (page > 1) page--;
    load();
  };
  btnNext.onclick = () => {
    if (page < 500) page++;
    load();
  };

  load();
}

/* ---------------- DÉTAIL ---------------- */
if (document.getElementById("details")) {
  loadDetails();
}

/* ---------------- FAVORIS PAGE ---------------- */
if (document.getElementById("favorites-list")) {
  displayFavorites();
}

function displayFavorites() {
  const container = document.getElementById("favorites-list");
  const favs = getFavorites();

  // Concatène movies et tv en conservant le type pour chaque élément
  const items = [];
  (favs.movie || []).forEach((i) =>
    items.push({ id: i.id, title: i.title, poster: i.poster, _type: "movie" })
  );
  (favs.tv || []).forEach((i) =>
    items.push({ id: i.id, title: i.title, poster: i.poster, _type: "tv" })
  );

  if (items.length === 0) {
    container.innerHTML = "<p>Aucun favori pour le moment.</p>";
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <a class="card" href="details.html?id=${item.id}&type=${item._type}">
            <img src="${TMDB_IMG}${item.poster}">
            <p>${item.title}</p>
        </a>
    `
    )
    .join("");
}

async function loadDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const type = params.get("type");

  const data = await tmdb(`/${type}/${id}`);
  const similar = await tmdb(`/${type}/${id}/similar`);
  const comments = await tmdb(`/${type}/${id}/reviews`);

  displayDetails(data, type);
  displaySimilar(similar.results);
  displayApiComments(comments.results);
  loadUserComments(id);
  setupCommentSystem(id);
}

function displayDetails(item, type) {
  document.getElementById("details").innerHTML = `
        <h2>${item.title || item.name}</h2>
        <img src="${TMDB_IMG}${item.poster_path}">
        <p>${item.overview}</p>
        <button id="fav-btn">Ajouter aux Favoris</button>
    `;

  // Attacher un listener sans utiliser d'attribut inline (évite les problèmes
  // lorsque le titre contient des quotes) et déléguer au module `favorites.js`.
  const btn = document.getElementById("fav-btn");
  if (btn) {
    // État initial
    const initial = isFavorite(type, item.id);
    btn.textContent = initial ? "Retirer des favoris" : "Ajouter aux Favoris";

    btn.addEventListener("click", () => {
      toggleFavModule(type, item);
      const now = isFavorite(type, item.id);
      btn.textContent = now ? "Retirer des favoris" : "Ajouter aux Favoris";
    });
  }
}

function displaySimilar(items) {
  document.getElementById("similar").innerHTML = items
    .map(
      (i) => `
        <a href="details.html?id=${i.id}&type=${i.title ? "movie" : "tv"}">
            <img src="${TMDB_IMG}${i.poster_path}">
            <p>${i.title || i.name}</p>
        </a>
    `
    )
    .join("");
}

function displayApiComments(comments) {
  document.getElementById("comments").innerHTML = comments
    .map(
      (c) => `
        <div class="comment">
            <b>${c.author}</b>
            <p>${c.content}</p>
        </div>
    `
    )
    .join("");
}

/* ----------- Favoris (LocalStorage) ----------- */

/* ----------- Commentaires utilisateurs ----------- */

function setupCommentSystem(id) {
  const btn = document.getElementById("add-comment");
  const input = document.getElementById("comment-input");

  btn.onclick = () => {
    let comments = JSON.parse(localStorage.getItem("comments_" + id) || "[]");

    comments.push({
      content: input.value,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("comments_" + id, JSON.stringify(comments));

    input.value = "";
    loadUserComments(id);
  };
}

function loadUserComments(id) {
  const container = document.getElementById("user-comments");
  const comments = JSON.parse(localStorage.getItem("comments_" + id) || "[]");

  container.innerHTML = comments
    .map(
      (c) => `
        <div class="comment">
            <b>Vous</b> - <small>${c.date}</small>
            <p>${c.content}</p>
        </div>
    `
    )
    .join("");
}

/* ---------------- Shared ---------------- */

function displayGrid(container, items) {
  container.innerHTML = items
    .map(
      (item) => `
        <a style="display:grid;grid-template-rows: auto 1fr;text-decoration:none;font-weight:bold;" class="card" href="details.html?id=${
          item.id
        }&type=${item.title ? "movie" : "tv"}">
            <img style="height:100%;" src="${TMDB_IMG}${item.poster_path}">
            <p style="text-align:center;">${item.title || item.name}</p>
        </a>
    `
    )
    .join("");
}
