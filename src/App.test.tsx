import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders App component", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/podcast/i)).toBeInTheDocument();
  });

  it("renders a table", () => {
    render(<App />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
