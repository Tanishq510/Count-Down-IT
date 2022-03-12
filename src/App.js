import React, { useEffect } from 'react';
import './style.css';
import moment from 'moment';
require('moment-precise-range-plugin');
export default function App() {
  const totalDays = 90;
  const [date, setDate] = React.useState({});
  const [state, setState] = React.useState({});
  const [quote, setQuote] = React.useState({});
  const initiateContDown = () => {
    let currentDate = moment();
    let vd = moment('14-02-2022', 'DD-MM-YYYY');
    let toDate = vd.add('90', 'days');
    let fomateToDate = toDate.format('DD-MMM-YYYY');
    let months = moment.preciseDiff(vd, currentDate, true);
    let diff = toDate.diff(currentDate, 'days');
    let percentage = (totalDays - diff) % totalDays;
    setState({ ...state, diff, fomateToDate, percentage });
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
        setQuote(quote);
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
    <div className="container">
      <div className="row justify-content-center">
        {Object.keys(state).length ? (
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
                <div className="mt-3">
                  <span className="text1">
                    <b>Expected Date</b>
                    <i className="text-primary"> {state?.fomateToDate}</i>
                  </span>
                </div>
                <div className="mt-3">
                  <div className="progress">
                    <div
                      className="progress-bar text-primary"
                      role="progressbar"
                      style={{ width: state.percentage }}
                    />
                  </div>
                </div>
                <figure className="quote mt-3">
                  <blockquote>
                    <b>{quote.text}</b>
                  </blockquote>
                  <figcaption>
                    &mdash;<i>{quote.author}</i>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="spinner-border text-primary text-center"
            role="status"
          ></div>
        )}
      </div>
    </div>
  );
}
