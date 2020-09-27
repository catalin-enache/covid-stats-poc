import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import Select from 'react-select'

import * as covidChartActions from './Redux/CovidChart.actions';
import { getFilteredData } from './CovidChart.helpers';
import './CovidCharts.css';
import { INTERVALS } from './CovidChart.constants';

const getBarChart = (data, onChartClick) => {
  return (
    <ResponsiveContainer>
      <BarChart
        onClick={onChartClick}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="interval" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="deaths" stackId="a" fill="indianred" />
        <Bar dataKey="cases" stackId="a" fill="orange" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const getDropDown = (items, onChange, value, firstValue) => {
  const options = (firstValue ? [firstValue] : [])
    .concat(items.map((item) => ({ value: item, label: item })));
  return (
    <Select value={value} options={options} onChange={onChange} />
  )
};

const getDrillDownTable = (data) => {
  return <table className="covid-chart-table">
    <tbody>
      <tr className="covid-chart-table-head-row">
        <th>State</th>
        <th>Date</th>
        <th className="covid-chart-table-numeric-cell">Cases</th>
        <th className="covid-chart-table-numeric-cell">Deaths</th>
      </tr>
      {data.map((entry, idx) => <tr key={idx} className="covid-chart-table-body-row">
        <td>{entry.state}</td>
        <td>{entry.date}</td>
        <td className="covid-chart-table-numeric-cell">{entry.cases}</td>
        <td className="covid-chart-table-numeric-cell">{entry.deaths}</td>
      </tr>)}
    </tbody>
  </table>;
};

const CovidChart = (props) => {
  const {
    fetchCovidData, covidData,
    states, setSelectedState, selectedState, defaultSelectedState,
    setSelectedInterval, selectedInterval,
    drillDownData, setDrillDownData
  } = props;

  useEffect(fetchCovidData, []);
  const onChartClick = useCallback((data) => {
    setDrillDownData(data && data.activeLabel);
  }, []);

  if (!covidData) {
    return 'Loading ...';
  }

  const data = getFilteredData(props.covidData, selectedInterval.value, selectedState.value);

  const bar = getBarChart(data, onChartClick);
  const statesDropDown = getDropDown(states, setSelectedState, selectedState, defaultSelectedState);
  const intervalsDropDown = getDropDown(Object.values(INTERVALS), setSelectedInterval, selectedInterval);
  const drillDownTable = !drillDownData ? null : getDrillDownTable(drillDownData);

  return (
    <div className="covid-chart">
      <div className="covid-chart-menu clearfix">
        <div className="covid-chart-title">Covid Chart: { selectedState.label } - {selectedInterval.value}</div>
        <div className="covid-chart-menu-right">
          <div className="covid-chart-dropdown">{statesDropDown}</div>
          <div className="covid-chart-dropdown">{intervalsDropDown}</div>
        </div>
      </div>
      <div className="covid-chart-graph">
        {bar}
      </div>
      {drillDownTable &&
      <div className="covid-chart-drill-down">
        {drillDownTable}
      </div>}
    </div>
  );
}

CovidChart.propTypes = {
  fetchCovidData: PropTypes.func.isRequired,
  covidData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    cases: PropTypes.number.isRequired,
    deaths: PropTypes.number.isRequired
  })),
  setSelectedState: PropTypes.func.isRequired,
  states: PropTypes.arrayOf(PropTypes.string),
  selectedState: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  defaultSelectedState: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  setSelectedInterval: PropTypes.func.isRequired,
  selectedInterval: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  drillDownData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    cases: PropTypes.number.isRequired,
    deaths: PropTypes.number.isRequired
  })),
  setDrillDownData: PropTypes.func.isRequired
};

const mapStateToProps = state => state.covidChart;
const mapDispatchToProps = dispatch => bindActionCreators(covidChartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CovidChart);
