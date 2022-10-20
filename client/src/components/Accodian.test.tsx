import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Accodian from "./Accodian";

test("renders accodian with title", () => {
  render(
    <Accodian title="test">
      <div>test</div>
    </Accodian>
  );
  const titleText = screen.getByText(/test/i);
  expect(titleText).toBeInTheDocument();
});

test("User click on accodian title and see data", async () => {
  render(
    <Accodian title="test">
      <div>test</div>
    </Accodian>
  );
  screen.getByText(/test/i);
  const accoidanButton = screen.getByRole("button");
  fireEvent.click(accoidanButton);
  await waitFor(() => {
    const accoidanData = screen.getByTestId("accodian-data");
    expect(accoidanData).toBeInTheDocument();
  });
});
