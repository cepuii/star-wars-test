import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CardItem from "../src/components/cardsList/cardItem/cardItem";

describe("CardItem", () => {
  it("renders card with person info", async () => {
    const mockData = {
      id: 1,
      name: "Luke Skywalker",
      birthYear: "12",
      films: [1, 2],
      starships: [22, 33],
    };

    render(<CardItem person={mockData} />);

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });
});
