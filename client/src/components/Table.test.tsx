import { render, screen, waitFor } from "@testing-library/react";
import Table from "./Table";

test("Renders table successfully", async () => {
  render(
    <Table
      cols={["name", "description"]}
      data={[
        { name: "test name", description: "description1" },
        { name: "name abc", description: "description2" },
      ]}
    />
  );
  await waitFor(() => {
    const [_columnHeadersRow, ...rows] = screen.getAllByRole("row");
    expect(rows).toHaveLength(2);
  });
});
