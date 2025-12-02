import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMG } from "./config.js";

const input = document.getElementById("search-input");
const box = document.getElementById("autocomplete");

if (input) {
  input.addEventListener("input", async () => {
    const query = input.value.trim();
    if (query.length < 2) {
      box.innerHTML = "";
      return;
    }

    const res = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${query}`
    );
    const data = await res.json();

    box.innerHTML = data.results
      .slice(0, 10)
      .map(
        (i) => `
            <div class="autocomplete-item">
                <a style="text-decoration: none;
                    color: #000;
                    font-weight: bold;
                    margin: 5px 0;
                    display: block;" href="details.html?id=${i.id}
                    &type=${i.title ? "movie" : "tv"}">
                      ${i.title || i.name}
                </a>
            </div>
        `
      )
      .join("");
  });
}
