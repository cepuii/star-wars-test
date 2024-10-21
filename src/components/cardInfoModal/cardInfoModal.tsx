import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import {
  addEdge,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import useResponsiveWidth from "../../hooks/useResponsiveWidth";
import CustomNode from "../customNode/customNode";
import Loader from "../ui/loader/loader";
import "./cardInfoModal.style.css";

interface CardInfoModalProps {
  person: Person;
  open: boolean;
  handleClose: () => void;
}

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const CardInfoModal = ({ person, open, handleClose }: CardInfoModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const width = useResponsiveWidth();
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "hero",
      type: "customNode",
      position: { x: 20, y: 20 },
      data: { title: person?.name },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const fetchHeroData = useCallback(async () => {
    const films = await Promise.all(
      person.films.map(async (film) => {
        const res = await fetch(`https://sw-api.starnavi.io/films/${film}/`);
        const data = await res.json();
        return data;
      })
    );

    const starships = await Promise.all(
      person.starships.map(async (starship) => {
        const res = await fetch(
          `https://sw-api.starnavi.io/starships/${starship}/`
        );
        const data = await res.json();
        return data;
      })
    );

    return { films, starships };
  }, [person]);

  // Generate graph nodes and edges based on fetched data
  const generateGraphData = useCallback(
    (films: Film[], starships: Starship[]) => {
      const filmNodes = films?.map((film, index) => ({
        id: `film-${film.id}`,
        type: "customNode",
        position: {
          x: index * (width / films.length - 30),
          y: (films.length - index) * 100,
        },
        data: { title: film.title, episodeId: film.episode_id },
      }));

      const starshipNodes = starships?.map((starship, index) => ({
        id: `starship-${starship.id}`,
        type: "customNode",
        position: {
          x: index * (width / films.length - 30),
          y: films.length * 100 + 50 + (starships.length - index) * 80,
        },
        data: { title: starship.name, model: starship.model },
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

      setNodes((prevNodes) => [...prevNodes, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipEdges]);
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    fetchHeroData().then(({ films, starships }) => {
      generateGraphData(films, starships);
      setIsLoading(false);
    });
  }, [fetchHeroData, generateGraphData]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          border: "2px solid #000",
          height: "70%",
          background: "#131313",
          color: "#FFF",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <ReactFlow
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            colorMode="dark"
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        )}
        <button
          onClick={handleClose}
          style={{ position: "absolute", right: "10px", top: "10px" }}
        >
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};

export default CardInfoModal;
