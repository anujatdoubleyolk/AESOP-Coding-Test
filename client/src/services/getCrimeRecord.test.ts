import getCrimeRecord from "./getCrimeRecord";

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
    "Suburb - Incident": "ADELAIDE",
    "Postcode - Incident": "5000",
    "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
    "Offence Level 2 Description": "PROPERTY DAMAGE AND ENVIRONMENTAL",
    "Offence Level 3 Description": "Graffiti",
    "Offence count": "1",
  },
  {
    _id: "4",
    "Reported Date": "01/07/2019",
    "Suburb - Incident": "ADELAIDE",
    "Postcode - Incident": "5000",
    "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
    "Offence Level 2 Description": "PROPERTY DAMAGE AND ENVIRONMENTAL",
    "Offence Level 3 Description": "Other property damage and environmental",
    "Offence count": "2",
  },
];

test("Api Fetching Successfully", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: mockData }),
    })
  ) as jest.Mock;
  const result = await getCrimeRecord();
  expect(result).toMatchObject(mockData);
});

test("Api throw error", async () => {
  const error = new Error("Unknown");
  global.fetch = jest.fn(() => Promise.reject(error)) as jest.Mock;
  const result = await getCrimeRecord();
  expect(result).toBe(error);
});
