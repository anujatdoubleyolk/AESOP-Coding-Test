import React, { Fragment, useEffect, useState } from "react";
import Accodian from "../components/Accodian";
import ListBox from "../components/ListBox";
import Table from "../components/Table";

const initialState = {
  records: [],
  recordByGroup: [],
  titles: [],
  groupBy: "",
};

const filters = [
  "Suburb",
  "Offence Level 1",
  "Offence Level 2",
  "Offence Level 3",
  "Reported Date",
];

const Home = () => {
  const [{ groupBy, recordByGroup, records, titles }, setState] = useState<{
    groupBy: string;
    recordByGroup: Record<string, any>[];
    records: Record<string, string>[];
    titles: string[];
  }>(initialState);

  useEffect(() => {
    async function getCrimeRecord() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}getRecords`
        );
        const { data } = await response.json();
        console.log("data", Object.keys(data[0]));
        setState((prevState) => ({
          ...prevState,
          records: data,
          groupBy: "Suburb",
        }));
      } catch (error) {
        setState(initialState);
      }
    }

    getCrimeRecord();
  }, []);

  useEffect(() => {
    let title: string[] = [],
      groupByFilter: Record<string, any>[] = [{}];
    for (const record of records) {
      if (groupBy === "Suburb") {
        if (!title.includes(record[`Suburb - Incident`])) {
          title.push(record[`Suburb - Incident`]);
          groupByFilter[0][record[`Suburb - Incident`]] = [record];
        } else {
          groupByFilter[0][record[`Suburb - Incident`]] = [
            ...groupByFilter[0][record[`Suburb - Incident`]],
            record,
          ];
        }
      } else if (groupBy === "Offence Level 1") {
        if (!title.includes(record[`Offence Level 1 Description`])) {
          title.push(record[`Offence Level 1 Description`]);
          groupByFilter[0][record[`Offence Level 1 Description`]] = [record];
        } else {
          groupByFilter[0][record[`Offence Level 1 Description`]] = [
            ...groupByFilter[0][record[`Offence Level 1 Description`]],
            record,
          ];
        }
      } else if (groupBy === "Offence Level 2") {
        if (!title.includes(record[`Offence Level 2 Description`])) {
          title.push(record[`Offence Level 2 Description`]);
          groupByFilter[0][record[`Offence Level 2 Description`]] = [record];
        } else {
          groupByFilter[0][record[`Offence Level 2 Description`]] = [
            ...groupByFilter[0][record[`Offence Level 2 Description`]],
            record,
          ];
        }
      } else if (groupBy === "Offence Level 3") {
        if (!title.includes(record[`Offence Level 3 Description`])) {
          title.push(record[`Offence Level 3 Description`]);
          groupByFilter[0][record[`Offence Level 3 Description`]] = [record];
        } else {
          groupByFilter[0][record[`Offence Level 3 Description`]] = [
            ...groupByFilter[0][record[`Offence Level 3 Description`]],
            record,
          ];
        }
      } else if (groupBy === "Reported Date") {
        if (!title.includes(record[`Reported Date`])) {
          title.push(record[`Reported Date`]);
          groupByFilter[0][record[`Reported Date`]] = [record];
        } else {
          groupByFilter[0][record[`Reported Date`]] = [
            ...groupByFilter[0][record[`Reported Date`]],
            record,
          ];
        }
      }
    }
    setState((prevState) => ({
      ...prevState,
      titles: title,
      recordByGroup: groupByFilter,
    }));
  }, [groupBy]);

  return (
    <Fragment>
      <div className="ml-6 mx-6 my-6">
        <span className="font-semibold text-sm mr-5">Group BY</span>
        <ListBox
          value={groupBy}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              groupBy: e,
            }))
          }
          options={filters}
        />
      </div>
      {titles?.map((title, index) => (
        <Accodian key={index} title={title}>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <Table
                    cols={Object.keys(records?.[0])}
                    data={recordByGroup?.[0]?.[title]}
                  />
                </div>
              </div>
            </div>
          </div>
        </Accodian>
      ))}
    </Fragment>
  );
};

export default Home;
