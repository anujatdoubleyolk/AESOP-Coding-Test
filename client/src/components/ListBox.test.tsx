import { fireEvent, render, waitFor } from "@testing-library/react";
import ListBox from "./ListBox";

const onChange = jest.fn();

test("should render ListBox and show options once click on dropdown", async () => {
  const { getByRole, getByText, queryByText } = render(
    <ListBox
      value="Suburb"
      onChange={onChange}
      options={[
        "Suburb1",
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
      ]}
    />
  );

  // to check its options are visible on dropdown click
  const dropdown = getByRole("button", { name: "Suburb" });
  expect(queryByText(/Option 1/i)).toBeNull();
  expect(queryByText(/Option 2/i)).toBeNull();
  expect(queryByText(/Option 3/i)).toBeNull();
  expect(queryByText(/Option 4/i)).toBeNull();
  fireEvent.click(dropdown);

  getByText(/Option 1/i);
  getByText(/Option 2/i);
  getByText(/Option 3/i);
  getByText(/Option 4/i);

  // to check onchange function call
  const dropdownOption = getByText(/Option 2/i);
  fireEvent.click(dropdownOption);
  expect(onChange).toHaveBeenCalledWith("Option 2");

  // to check its options are hidden once select any option
  await waitFor(() => {
    expect(queryByText(/Option 1/i)).toBeNull();
    expect(queryByText(/Option 3/i)).toBeNull();
    expect(queryByText(/Option 4/i)).toBeNull();
    expect(queryByText(/Option 2/i)).toBeDefined();
  });
});
