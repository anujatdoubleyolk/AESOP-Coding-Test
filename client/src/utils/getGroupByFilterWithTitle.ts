const getRecordsBasedOnTitle = (
  desc: string,
  groupByFilter: Record<string, any>[],
  record: any,
  title: string[]
) => {
  if (!title.includes(record[desc])) {
    title.push(record[desc]);
    groupByFilter[0][record[desc]] = [record];
  } else {
    groupByFilter[0][record[desc]] = [
      ...groupByFilter[0][record[desc]],
      record,
    ];
  }
};

const getGroupByFilterWithTitle = (records: any, groupBy: string) => {
  let title: string[] = [],
    groupByFilter: Record<string, any>[] = [{}];
  for (const record of records) {
    if (groupBy === "Suburb") {
      getRecordsBasedOnTitle(`Suburb - Incident`, groupByFilter, record, title);
    } else if (groupBy === "Offence Level 1") {
      getRecordsBasedOnTitle(
        `Offence Level 1 Description`,
        groupByFilter,
        record,
        title
      );
    } else if (groupBy === "Offence Level 2") {
      getRecordsBasedOnTitle(
        `Offence Level 2 Description`,
        groupByFilter,
        record,
        title
      );
    } else if (groupBy === "Offence Level 3") {
      getRecordsBasedOnTitle(
        `Offence Level 3 Description`,
        groupByFilter,
        record,
        title
      );
    } else if (groupBy === "Reported Date") {
      getRecordsBasedOnTitle(`Reported Date`, groupByFilter, record, title);
    }
  }
  return { title, groupByFilter };
};

export default getGroupByFilterWithTitle;
