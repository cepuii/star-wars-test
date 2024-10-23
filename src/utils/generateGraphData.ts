export const generateGraphData = (
  films: Film[],
  starships: Starship[],
  width: number
) => {
  const filmNodes = films?.map((film, index) => ({
    id: `film-${film.id}`,
    type: "customNode",
    position: {
      x: index * (width / films.length - 30),
      y: (films.length - index) * 100,
    },
    data: { id: film.id, title: film.title, episodeId: film.episode_id },
  }));

  const starshipNodes = starships?.map((starship, index) => ({
    id: `starship-${starship.id}`,
    type: "customNode",
    position: {
      x: index * (width / films.length - 30),
      y: films.length * 100 + 50 + (starships.length - index) * 80,
    },
    data: { id: starship.id, title: starship.name, model: starship.model },
  }));

  const filmEdges = films?.map((film) => ({
    id: `hero-to-film-${film.id}`,
    source: "hero",
    target: `film-${film.id}`,
  }));

  const starshipEdges = starships?.flatMap((starship) => {
    return films
      .filter((film) => starship?.films.includes(film.id))
      .map((film) => ({
        id: `film-${film.id}-to-starship-${starship.id}`,
        source: `film-${film.id}`,
        target: `starship-${starship.id}`,
      }));
  });
  return { filmNodes, starshipNodes, filmEdges, starshipEdges };
};
