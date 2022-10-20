import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders successfully", () => {
  render(<App />);
  const drpElement = screen.getByText(/Group BY/i);
  expect(drpElement).toBeInTheDocument();
});
