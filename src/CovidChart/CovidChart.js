import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as covidChartActions from './Redux/CovidChart.actions';
import { DAYS, MONTHS } from './CovidChart.constants';
import {
  aggregateByDaysOrMonths,
  groupByStates,
  aggregateByStatesOnDaysOrMonths
} from "./CovidChart.helpers";

const CovidChart = (props) => {
  if (props.covidData) {
    console.log('aggregateByDays', aggregateByDaysOrMonths(DAYS, props.covidData));
    console.log('aggregateByMonths', aggregateByDaysOrMonths(MONTHS, props.covidData));
    console.log('groupByStates', groupByStates(props.covidData));
    console.log('aggregateByStatesOnDays', aggregateByStatesOnDaysOrMonths(DAYS, props.covidData));
    console.log('aggregateByStatesOnMonths', aggregateByStatesOnDaysOrMonths(MONTHS, props.covidData));
  }

    return (
      <div>
          <button onClick={props.fetchCovidData}>Get data</button>
      </div>
    );
}

CovidChart.propTypes = {
  covidData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    cases: PropTypes.number.isRequired,
    deaths: PropTypes.number.isRequired
  })),
  fetchCovidData: PropTypes.func.isRequired
};

const mapStateToProps = state => state.covidChart;
const mapDispatchToProps =
    dispatch => bindActionCreators(covidChartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CovidChart);
