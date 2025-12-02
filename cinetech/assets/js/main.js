import { tmdb } from "./api.js";
import { TMDB_IMG } from "./config.js";

const moviesDiv = document.getElementById("popular-movies");
const seriesDiv = document.getElementById("popular-series");

async function loadHome() {
  const movies = await tmdb("/movie/popular");
  const series = await tmdb("/tv/popular");

  displayGrid(moviesDiv, movies.results);
  displayGrid(seriesDiv, series.results);
}

function displayGrid(container, items) {
  container.innerHTML = items
    .map(
      (item) => `
        <a class="card" href="details.html?id=${item.id}&type=${
        item.title ? "movie" : "tv"
      }">
            <img src="${TMDB_IMG}${item.poster_path}">
            <p>${item.title || item.name}</p>
        </a>
    `
    )
    .join("");
}

loadHome();
