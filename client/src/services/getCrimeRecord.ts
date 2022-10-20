const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

async function getCrimeRecord() {
  try {
    const response = await fetch(API_BASE_URL + "getRecords");
    const { data } = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default getCrimeRecord;
