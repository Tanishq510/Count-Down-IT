import React, { useEffect } from 'react';
import './style.css';
import moment from 'moment';
require('moment-precise-range-plugin');
export default function App() {
  const [date, setDate] = React.useState({});
  const [state, setState] = React.useState({});
  const initiateContDown = () => {
    let currentDate = moment();
    let vd = moment('14-02-2022', 'DD-MM-YYYY');
    let toDate = vd.add('90', 'days');
    let fomateToDate = toDate.format('DD-MMM-YYYY');
    let months = moment.preciseDiff(vd, currentDate, true);
    let diff = toDate.diff(currentDate, 'days');
    setState({ ...state, diff, fomateToDate });
    setDate({ ...months });
  };
  useEffect(() => {
    const timer = setTimeout(() => initiateContDown(), 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="">
      <div className="rounded bg-gradient-4 text-white shadow p-5 text-center mb-5">
        <p className="mb-0 font-weight-bold text-uppercase">
          CountDown To last day
        </p>
        {Object.keys(date).length ? (
          <>
            <div id="clock-c" className="countdown py-4">
              <div className="holder m-2">
                <span className="h1 font-weight-bold">{date.months}</span> Month
              </div>
              <div className="holder m-2">
                <span className="h1 font-weight-bold">{date.days}</span> Days
              </div>
              <div className="holder m-2">
                <span className="h1 font-weight-bold">{date.hours}</span> Hours
              </div>
              <div className="holder m-2">
                <span className="h1 font-weight-bold">{date.minutes}</span>{' '}
                Minutes
              </div>
              <div className="holder m-2">
                <span className="h1 font-weight-bold">{date.seconds}</span>{' '}
                Seconds
              </div>
            </div>
            <div>Expected Date : {state?.fomateToDate}</div>
            <div>Days : {state?.diff}</div>
          </>
        ) : (
          <div className="spinner-border text-light" role="status"></div>
        )}
      </div>
    </div>
  );
}
