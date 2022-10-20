import React, { Fragment, useEffect, useState } from "react";
import Accodian from "../components/Accodian";
import ListBox from "../components/ListBox";
import Table from "../components/Table";
import getCrimeRecord from "../services/getCrimeRecord";
import getGroupByFilterWithTitle from "../utils/getGroupByFilterWithTitle";

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
    (async () => {
      const data = await getCrimeRecord();
      setState((prevState) => ({
        ...prevState,
        records: data,
        groupBy: "Suburb",
      }));
    })();
  }, []);

  useEffect(() => {
    const { title, groupByFilter } = getGroupByFilterWithTitle(
      records,
      groupBy
    );
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
