import React, { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import "./App.css";
import Accodian from "./components/Accodian";
import Table from "./components/Table";

const initialState = {
  records: [],
  recordByGroup: [],
  titles: [],
  groupBy: "",
};

const cols = [
  "Id",
  "Reported Date",
  "Suburb - Incident",
  "Postcode - Incident",
  "Offence Level 1 Description",
  "Offence Level 2 Description",
  "Offence Level 3 Description",
  "Offence count",
];

const filters = [
  "Suburb",
  "Offence Level 1",
  "Offence Level 2",
  "Offence Level 3",
  "Reported Date",
];
const App: React.FC = () => {
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
          `${process.env.REACT_APP_BASE_URL}` + "getRecords"
        );
        const { data } = await response.json();
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
    <>
      <div className="ml-6 mx-6 my-6">
        <span className="font-semibold text-sm mr-5">Group BY</span>
        <Listbox
          value={groupBy}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              groupBy: e,
            }))
          }
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 sm:text-sm">
              <span className="block truncate">{groupBy}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filters?.map((filter, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-purple-200 text-purple-900"
                          : "text-gray-900"
                      }`
                    }
                    value={filter}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {filter}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {titles?.map((title, index) => (
        <Accodian key={index} title={title}>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <Table cols={cols} data={recordByGroup?.[0]?.[title]} />
                </div>
              </div>
            </div>
          </div>
        </Accodian>
      ))}
    </>
  );
};

export default App;
