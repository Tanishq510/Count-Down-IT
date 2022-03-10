import React, { useEffect } from 'react';
import './style.css';
import moment from 'moment';
require('moment-precise-range-plugin');
export default function App() {
  const [date, setDate] = React.useState({});
  const [state, setState] = React.useState({});
  // const [quote, setQuote] = React.useState({});
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
  const fetchQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let random = Math.floor(Math.random() * data.length);
        let quote = data[random];
        console.log(quote);
        // setQuote(quote);
      });
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => initiateContDown(), 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="container mt-5 mb-3">
      <div className="row justify-content-center">
        <div className="col-md-4 mt-4">
          <div className="card p-3 mb-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <div className="icon"></div>
                <div className="ms-2 c-details">
                  <h6 className="mb-0">Infosys</h6>{' '}
                  <span className="text-primary">{state?.diff}</span>
                  <span>{state?.diff > 1 ? ' days' : 'day'} to go</span>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="heading">
                {date?.months} <small>Months </small>
                {/* <br /> */}
                {date?.days} <small>Days </small>
                {/* <br /> */}
                {date?.hours} <small>Hours </small>
                {/* <br /> */}
                {date?.minutes} <small>Minutes </small>
                {/* <br /> */}
                {date?.seconds} <small>Seconds </small>
                {/* <br /> */}
              </h3>
              <div className="mt-5">
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '50%' }}
                  />
                </div>
                <div className="mt-3">
                  {' '}
                  <span className="text1">
                    <b>Expected Date</b>
                    <i className="text-primary"> {state?.fomateToDate}</i>
                  </span>{' '}
                </div>
                {/* <div className="mt-3">{quote.text}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
