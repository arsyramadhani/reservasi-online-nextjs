import { useEffect, useState } from "react";

import Styles from "../../styles/AddReservation.module.css";
import reservationApi from "../../services/api/reservation";

const arr = [];
for (let i = 0; i < 39; i++) {
  arr.push(i + 1);
}

const ReservationListTable = ({ data }) => {
  const [timeSchedule, setTimeSchedule] = useState([]);

  useEffect(() => {
    // if (timeSchedule.length === 0) {
    // }
    reservationApi.getTimeSchedule().then((val) => setTimeSchedule(val));
  }, []);
  console.log("List Table Rendered");

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <div className="row">
        <div className="col-md-3">
          <label style={{ color: "white" }}>Schedule</label>
        </div>
        <div className="col d-flex">
          <div className="d-flex mr-4">
            <div
              className={Styles.square}
              style={{ backgroundColor: "white" }}
            ></div>
            <label style={{ color: "white" }}>Empty</label>
          </div>
          <div className="d-flex">
            <div
              className={Styles.square}
              style={{ backgroundColor: "red" }}
            ></div>
            <label style={{ color: "white" }}>Full</label>
          </div>
        </div>
      </div>
      <table className="table table-bordered">
        <thead id="column_schedule" className="thead-dark">
          <tr>
            <th scope="col">Time</th>
            <th scope="col">05</th>
            <th scope="col">06</th>
            <th scope="col">07</th>
            <th scope="col">08</th>
            <th scope="col">09</th>
            <th scope="col">10</th>
            <th scope="col">11</th>
            <th scope="col">12</th>
            <th scope="col">13</th>
            <th scope="col">14</th>
            <th scope="col">15</th>
            <th scope="col">16</th>
            <th scope="col">17</th>
            <th scope="col">18</th>
            <th scope="col">19</th>
            <th scope="col">20</th>
            <th scope="col">21</th>
            <th scope="col">22</th>
            <th scope="col">23</th>
            <th scope="col">00</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <div>
                00<span>/</span>
              </div>
              <div>30</div>
            </th>
            {/* {JSON.stringify(
              timeSchedule
                .filter((val) => val.RO_Value % 2 !== 0)
                .map((val, i) => timeSchedule[val?.RO_Value])
            )} */}

            {timeSchedule
              .filter((val) => val.RO_Value % 2 !== 0)
              .map((val, i) => (
                <td key={i}>
                  <div
                    className={Styles.square}
                    style={{
                      backgroundColor: data.find(
                        (itm) =>
                          itm.TimeFrom === val?.RO_Time ||
                          itm.TimeTo === val?.RO_Time
                      )
                        ? "red"
                        : "white",
                    }}
                  >
                    {val.RO_Time}
                  </div>
                  <div
                    className={Styles.square}
                    style={{
                      backgroundColor: data.find(
                        (itm) =>
                          itm.TimeTo === timeSchedule[val.RO_Value]?.RO_Time ||
                          itm.TimeFrom === timeSchedule[val.RO_Value]?.RO_Time
                      )
                        ? "red"
                        : "white",
                    }}
                  >
                    {timeSchedule[val.RO_Value]?.RO_Time}
                  </div>
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReservationListTable;
