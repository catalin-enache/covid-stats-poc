
import { ALL_STATES, INTERVALS } from './CovidChart.constants';

export const parserCovidDataCSV = (str) => {
  // current csv data represents total cases/deaths accumulated for that state and that day
  // we return new cases/deaths instead for that state and that day
  const previousCases = {};
  const states = new Set();
  const lines = str.split('\n').slice(1).map((line) => {
    const [date, state, _, cases, deaths] = line.split(',');
    states.add(state);
    const newCases = cases - ((previousCases[state] || {}).cases || 0);
    const newDeaths = deaths - ((previousCases[state] || {}).deaths || 0);

    previousCases[state] = { cases, deaths };

    return {
      date,
      state,
      /*
      newDeaths might be negative sometimes
      Quote:
      This can occur when a state or county corrects an error in the number of cases or deaths
      they've reported in the past, or when a state moves cases from one county to another
      */
      cases: newCases < 0 ? 0 : newCases,
      deaths: newDeaths < 0 ? 0 : newDeaths // correction
      // cases: newCases,
      // deaths: newDeaths // should we allow negative newDeaths ?
    }
  });

  return [lines, Array.from(states).sort((a, b) => a < b ? -1 : a > b ? 1 : 0)];
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

export const aggregateBy = (interval, entries) => {
  return entries.reduce((acc, entry) => {
    const { date, cases, deaths } = entry;
    const slice = interval === INTERVALS.BY_MONTHS ? date.slice(0, 7) : date;
    acc[slice] = {
      cases: ((acc[slice] || {}).cases || 0) + cases,
      deaths: ((acc[slice] || {}).deaths || 0) + deaths,
    };
    return acc;
  }, {});
};

export const aggregationToArray = (aggObj, { key = 'interval' } = {}) => {
  return Object.keys(aggObj)
    .map((_key) => ({ [key]: _key, ...aggObj[_key] }));
};

export const getFilteredData = (data, interval, state) => {
  const _data = state === ALL_STATES ? data : groupByStates(data)[state] || [];
  return {
    [INTERVALS.BY_DAYS]: () => {
      return aggregationToArray(aggregateBy(INTERVALS.BY_DAYS, _data));
    },
    [INTERVALS.BY_MONTHS]: () => {
      return aggregationToArray(aggregateBy(INTERVALS.BY_MONTHS, _data));
    },
    [INTERVALS.LAST_SEVEN_DAYS]: () => {
      return aggregationToArray(aggregateBy(INTERVALS.BY_DAYS, _data)).slice(-7);
    },
    [INTERVALS.LAST_MONTH]: () => {
      const _dataByDays = aggregationToArray(aggregateBy(INTERVALS.BY_DAYS, _data));
      const _lastDayDate = _dataByDays.slice(-1)[0].interval.slice(0, 7);
      return _dataByDays.filter((entry) => entry.interval.startsWith(_lastDayDate));
    }
  }[interval]();
};

export const getDrillDownData = (data, interval) => {
  if (interval.length === 10) { // per day
    return data.filter((entry) => entry.date === interval);
  }
  return aggregationToArray(data.filter((entry) => entry.date.startsWith(interval)).reduce((acc, entry) => {
    const { date, state, cases, deaths } = entry;
    acc[state] = {
      cases: ((acc[state] || {}).cases || 0) + cases,
      deaths: ((acc[state] || {}).deaths || 0) + deaths,
      date: date.slice(0, 7)
    }
    return acc;
  }, {}), { key: 'state' }).sort((a, b) => a.state < b.state ? -1 : a.state > b.state ? 1 : 0);
}