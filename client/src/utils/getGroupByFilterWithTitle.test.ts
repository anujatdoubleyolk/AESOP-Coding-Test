import getGroupByFilterWithTitle from "./getGroupByFilterWithTitle";

const mockRecords = [
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
    _id: "8",
    "Reported Date": "01/07/2019",
    "Suburb - Incident": "ADELAIDE",
    "Postcode - Incident": "5000",
    "Offence Level 1 Description": "OFFENCES AGAINST THE PERSON",
    "Offence Level 2 Description": "ACTS INTENDED TO CAUSE INJURY",
    "Offence Level 3 Description": "Common Assault",
    "Offence count": "3",
  },
];

test("getGroupByFilterWithTitle for 'Offence Level 1'", () => {
  const { title, groupByFilter } = getGroupByFilterWithTitle(
    mockRecords,
    "Offence Level 1"
  );
  expect(title).toEqual([
    "OFFENCES AGAINST PROPERTY",
    "OFFENCES AGAINST THE PERSON",
  ]);
  expect(groupByFilter).toEqual([
    {
      "OFFENCES AGAINST PROPERTY": [
        {
          "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
          "Offence Level 2 Description": "FRAUD DECEPTION AND RELATED OFFENCES",
          "Offence Level 3 Description": "Obtain benefit by deception",
          "Offence count": "1",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "1",
        },
      ],
      "OFFENCES AGAINST THE PERSON": [
        {
          "Offence Level 1 Description": "OFFENCES AGAINST THE PERSON",
          "Offence Level 2 Description": "ACTS INTENDED TO CAUSE INJURY",
          "Offence Level 3 Description": "Common Assault",
          "Offence count": "3",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "8",
        },
      ],
    },
  ]);
});

test("getGroupByFilterWithTitle for 'Offence Level 2'", () => {
  const { title, groupByFilter } = getGroupByFilterWithTitle(
    mockRecords,
    "Offence Level 2"
  );
  expect(title).toEqual([
    "FRAUD DECEPTION AND RELATED OFFENCES",
    "ACTS INTENDED TO CAUSE INJURY",
  ]);
  expect(groupByFilter).toEqual([
    {
      "ACTS INTENDED TO CAUSE INJURY": [
        {
          "Offence Level 1 Description": "OFFENCES AGAINST THE PERSON",
          "Offence Level 2 Description": "ACTS INTENDED TO CAUSE INJURY",
          "Offence Level 3 Description": "Common Assault",
          "Offence count": "3",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "8",
        },
      ],
      "FRAUD DECEPTION AND RELATED OFFENCES": [
        {
          "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
          "Offence Level 2 Description": "FRAUD DECEPTION AND RELATED OFFENCES",
          "Offence Level 3 Description": "Obtain benefit by deception",
          "Offence count": "1",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "1",
        },
      ],
    },
  ]);
});

test("getGroupByFilterWithTitle for 'Offence Level 3'", () => {
  const { title, groupByFilter } = getGroupByFilterWithTitle(
    mockRecords,
    "Offence Level 3"
  );
  expect(title).toEqual(["Obtain benefit by deception", "Common Assault"]);
  expect(groupByFilter).toEqual([
    {
      "Common Assault": [
        {
          "Offence Level 1 Description": "OFFENCES AGAINST THE PERSON",
          "Offence Level 2 Description": "ACTS INTENDED TO CAUSE INJURY",
          "Offence Level 3 Description": "Common Assault",
          "Offence count": "3",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "8",
        },
      ],
      "Obtain benefit by deception": [
        {
          "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
          "Offence Level 2 Description": "FRAUD DECEPTION AND RELATED OFFENCES",
          "Offence Level 3 Description": "Obtain benefit by deception",
          "Offence count": "1",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "1",
        },
      ],
    },
  ]);
});

test("getGroupByFilterWithTitle for 'Reported Date'", () => {
  const { title, groupByFilter } = getGroupByFilterWithTitle(
    mockRecords,
    "Reported Date"
  );
  expect(title).toEqual(["01/07/2019"]);
  expect(groupByFilter).toEqual([
    {
      "01/07/2019": [
        {
          "Offence Level 1 Description": "OFFENCES AGAINST PROPERTY",
          "Offence Level 2 Description": "FRAUD DECEPTION AND RELATED OFFENCES",
          "Offence Level 3 Description": "Obtain benefit by deception",
          "Offence count": "1",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "1",
        },
        {
          "Offence Level 1 Description": "OFFENCES AGAINST THE PERSON",
          "Offence Level 2 Description": "ACTS INTENDED TO CAUSE INJURY",
          "Offence Level 3 Description": "Common Assault",
          "Offence count": "3",
          "Postcode - Incident": "5000",
          "Reported Date": "01/07/2019",
          "Suburb - Incident": "ADELAIDE",
          _id: "8",
        },
      ],
    },
  ]);
});
