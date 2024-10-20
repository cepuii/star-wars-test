type Person = {
  id: number;
  name: string;
  birthYear: string;
  films: number[];
  starships: number[];
};

type Film = {
  id: number;
  title: string;
  episode_id: number;
  starships: number[];
};

type Starship = {
  id: number;
  name: string;
  model: string;
  films: number[];
};
