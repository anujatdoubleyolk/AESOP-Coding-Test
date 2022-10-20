import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";

const mockData = [
  {
    _id: "1",
    "Reported Date": "01/07/2019",
    "Suburb - Incident": "ADELAIDE",
    "Postcode - Incident": "5000",
    "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
    "Offence Level 2 Description": "FRAUD DECEPTION AND RELATED OFFENCES",
    "Offence Level 3 Description": "Obtain benefit by deception",
    "Offence count": "1",
  },
  {
    _id: "2",
    "Reported Date": "01/07/2019",
    "Suburb - Incident": "ADELAIDE",
    "Postcode - Incident": "5000",
    "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
    "Offence Level 2 Description": "FRAUD DECEPTION AND RELATED OFFENCES",
    "Offence Level 3 Description":
      "Other fraud, deception and related offences",
    "Offence count": "1",
  },
  {
    _id: "3",
    "Reported Date": "01/07/2019",
    "Suburb - Incident": "ADELAIDE AIRPORT",
    "Postcode - Incident": "5000",
    "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
    "Offence Level 2 Description": "PROPERTY DAMAGE AND ENVIRONMENTAL",
    "Offence Level 3 Description": "Graffiti",
    "Offence count": "1",
  },
  {
    _id: "4",
    "Reported Date": "01/07/2019",
    "Suburb - Incident": "ADELAIDE AIRPORT",
    "Postcode - Incident": "5000",
    "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
    "Offence Level 2 Description": "PROPERTY DAMAGE AND ENVIRONMENTAL",
    "Offence Level 3 Description": "Other property damage and environmental",
    "Offence count": "2",
  },
];

test("renders successfully", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: mockData }),
    })
  ) as jest.Mock;
  render(<Home />);
  const drpElement = screen.getByText(/Group BY/i);
  expect(drpElement).toBeInTheDocument();
  await waitFor(() => {
    const accodianTitles = screen.getAllByTestId("accodian-btn");
    expect(accodianTitles).toHaveLength(2);
  });
});

test("Grop by records ", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: mockData }),
    })
  ) as jest.Mock;
  render(<Home />);
  const drpElement = screen.getByText(/Group BY/i);
  expect(drpElement).toBeInTheDocument();
  const dropdown = screen.getByRole("button");
  fireEvent.click(dropdown);
  const dropdownOption = screen.getByText(/Offence Level 1/i);
  fireEvent.click(dropdownOption);
  await waitFor(() => {
    const accodianTitles = screen.getAllByTestId("accodian-btn");
    expect(accodianTitles).toHaveLength(2);
  });
});
