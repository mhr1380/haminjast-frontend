import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SmallPoster from "../SmallPoster";

describe("SmallPoster component", () => {
  const sampleProps = {
    image: "path/to/image.jpg",
    title: "Sample Title",
    description: "This is a sample description.",
    found: true,
    lost: false,
    location: "Sample Location",
    time_description: "Sample Time",
    categories: [{ name: "Category 1" }, { name: "Category 2" }],
    id: 123,
    award: 1,
    special_type: "premium",
    state: "accepted",
  };
  // test
  test("renders SmallPoster component with provided props", () => {
    render(<SmallPoster {...sampleProps} />);

    // expect(screen.getByTestId("test")).toHaveAttribute("href", "/poster/123");
    expect(screen.getByText("Sample Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample description.")
    ).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
    expect(screen.getByText("مژدگانی")).toBeInTheDocument();
    expect(screen.getByText("ویژه")).toBeInTheDocument();
    expect(screen.getByText("تایید شده")).toBeInTheDocument();

    expect(screen.queryByText("گم شده")).toBeNull();
  });

  test("truncates long descriptions", () => {
    const longDescription =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    render(<SmallPoster {...sampleProps} description={longDescription} />);

    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit am ..."
      )
    ).toBeInTheDocument();
  });

  test("renders SmallPoster component for lost item", () => {
    const lostProps = {
      ...sampleProps,
      found: false,
      lost: true,
    };
    render(<SmallPoster {...lostProps} />);

    expect(screen.queryByText("پیدا شده")).toBeNull();
  });
});
