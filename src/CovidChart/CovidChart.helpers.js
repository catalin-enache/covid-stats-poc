
import { MONTHS } from './CovidChart.constants';

export const parserCovidDataCSV = (str) => {
  // current csv data represents total cases/deaths accumulated for that state and that day
  // we return new cases/deaths instead for that state and that day
  const previousCases = {};
  const lines = str.split('\n').slice(1).map((line) => {
    const [date, state, _, cases, deaths] = line.split(',');
    const newCases = cases - ((previousCases[state] || {}).cases || 0);
    const newDeaths = deaths - ((previousCases[state] || {}).deaths || 0);

    previousCases[state] = { cases, deaths };

    return {
      date,
      state,
      // addressing incoherent data where
      // reported total for current day is less than reported total for prev day
      cases: newCases < 0 ? 0 : newCases,
      deaths: newDeaths < 0 ? 0 : newDeaths
    }
  });

  return lines;
};

export const groupByStates = (entries) => {
  return entries.reduce((acc, entry) => {
    const { state } = entry;
    if (!acc[state]) {
      acc[state] = [entry];
    } else {
      acc[state].push(entry);
    }
    return acc;
  }, {});
};

export const aggregateByStatesOnDaysOrMonths = (interval, entries) => {
  const aggregatedByStates = groupByStates(entries);
  for (const [state, entries] of Object.entries(aggregatedByStates)) {
    aggregatedByStates[state] = aggregateByDaysOrMonths(interval, entries);
  }
  return aggregatedByStates
}

export const aggregateByDaysOrMonths = (interval, entries) => {
  return entries.reduce((acc, entry) => {
    const { date, cases, deaths } = entry;
    const slice = interval === MONTHS ? date.slice(0, 7) : date;
    acc[slice] = {
      cases: ((acc[slice] || {}).cases || 0) + cases,
      deaths: ((acc[slice] || {}).deaths || 0) + deaths,
    };
    return acc;
  }, {});
};