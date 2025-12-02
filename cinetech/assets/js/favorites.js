export function getFavorites() {
  const raw = localStorage.getItem("favorites");
  if (!raw) return { movie: [], tv: [] };

  try {
    const parsed = JSON.parse(raw);

    // Si l'utilisateur a un ancien format (tableau simple), on le normalise
    if (Array.isArray(parsed)) {
      return { movie: parsed, tv: [] };
    }

    // Si les clés sont au pluriel (movies), on les mappe vers les clés attendues
    if (parsed.movies) {
      return { movie: parsed.movies || [], tv: parsed.tv || [] };
    }

    // Si le format est déjà correct (movie / tv), on le renvoie
    if (parsed.movie || parsed.tv) {
      return { movie: parsed.movie || [], tv: parsed.tv || [] };
    }

    // Par défaut, retourner une structure vide
    return { movie: [], tv: [] };
  } catch (e) {
    // En cas d'erreur de parsing, réinitialiser la structure
    return { movie: [], tv: [] };
  }
}

export function toggleFavorite(type, item) {
  const favs = getFavorites();

  const list = favs[type] || [];
  const exists = list.find((i) => i.id === item.id);

  if (exists) {
    favs[type] = list.filter((i) => i.id !== item.id);
  } else {
    favs[type] = list.concat({
      id: item.id,
      title: item.title || item.name,
      poster: item.poster_path,
    });
  }

  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(type, id) {
  const favs = getFavorites();
  const list = favs[type] || [];
  return list.some((i) => i.id == id);
}
