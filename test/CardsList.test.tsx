import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CardsList from "../src/components/cardsList/cardsList";
import useFetch from "../src/hooks/useFetch";

vi.mock("/src/hooks/useFetch.ts");
vi.mock("/src/hooks/useResponsiveWidth.ts");

vi.mock("/src/components/cardsList/cardItem/cardItem.tsx", () => ({
  default: ({ person }: { person: Person }) => <div>{person?.name}</div>,
}));

vi.mock("/src/components/ui/loader/loader.tsx", () => ({
  default: () => <div>{"Loading..."}</div>,
}));

describe("CardsList", () => {
  const mockData = {
    results: [
      {
        id: 1,
        name: "Luke Skywalker",
        films: [1, 2],
        starships: [22, 33],
      },
      {
        id: 2,
        name: "Yoda",
        films: [1, 2, 3, 4],
        starships: [22, 33, 32],
      },
      {
        id: 3,
        name: "Obi One Fenobi",
        films: [1, 2, 2],
        starships: [22, 33, 45],
      },
      {
        id: 4,
        name: "Dart Wayder",
        films: [1, 2],
        starships: [22, 33],
      },
      {
        id: 5,
        name: "Kevin",
        films: [1, 2],
        starships: [22, 33],
      },
      {
        id: 6,
        name: "Dart ",
        films: [1, 2],
        starships: [22, 33],
      },
      {
        id: 7,
        name: "Wayder",
        films: [1, 2],
        starships: [22, 33],
      },
    ],
    next: "next-url",
  };

  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });
  });

  it("should show loader while data is loading", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });

    render(<CardsList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error message when error occur", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Can't fetch data from API",
    });

    render(<CardsList />);

    expect(
      screen.getByText("Failed to load data. Please try again later.")
    ).toBeInTheDocument();
  });

  it("should render people cards when data is loaded", async () => {
    render(<CardsList />);

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Yoda/i)).toBeInTheDocument();
    expect(screen.getByText(/Obi One Fenobi/i)).toBeInTheDocument();
    expect(screen.getByText(/Dart Wayder/i)).toBeInTheDocument();
  });

  it("fetches the next page of people when scrolled to the bottom", async () => {
    render(<CardsList />);

    expect(useFetch).toHaveBeenCalled();

    const swiperSlide = document.querySelector(".swiper-wrapper");

    // Simulate a scroll event
    fireEvent.scroll(swiperSlide as Element, { target: { scrollTop: 1000 } });

    await waitFor(() => {
      expect(useFetch).toHaveBeenCalled();
    });
  });
});
