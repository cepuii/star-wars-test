import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import {
  addEdge,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FILMS_URL, STARSHIPS_URL } from "../../constants/urls";
import useResponsiveWidth from "../../hooks/useResponsiveWidth";
import { generateGraphData } from "../../utils/generateGraphData";
import CustomNode from "../customNode/customNode";
import Loader from "../ui/loader/loader";
import "./cardInfoModal.style.css";

interface CardInfoModalProps {
  person: Person;
  open: boolean;
  handleClose: () => void;
}

const CardInfoModal = ({ person, open, handleClose }: CardInfoModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const width = useResponsiveWidth();
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "hero",
      type: "customNode",
      position: { x: 20, y: 20 },
      data: { id: person?.id, title: person?.name },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "", source: "", target: "" },
  ]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    const fetchFilmsAndStarships = async () => {
      const films = await Promise.all(
        person.films.map(async (film) => {
          const res = await axios.get<Film>(`${FILMS_URL}${film}/`);
          return res.data;
        })
      );

      const starships = await Promise.all(
        person.starships.map(async (starship) => {
          const res = await axios.get<Starship>(`${STARSHIPS_URL}${starship}/`);
          return res.data;
        })
      );

      const { filmEdges, filmNodes, starshipEdges, starshipNodes } =
        // Generate graph nodes and edges based on fetched data
        generateGraphData(films, starships, width);

      setNodes((prevNodes) => [...prevNodes, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipEdges]);

      setIsLoading(false);
    };

    fetchFilmsAndStarships();
  }, [person.films, person.starships, setEdges, setNodes, width]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal">
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
        <button onClick={handleClose} className="modal__button">
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};

export default CardInfoModal;
