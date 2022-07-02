import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Layout from "../../components/Layouts/Layout";
import Style from "../../styles/AddReservation.module.css";
import currentDate from "../../helper/currentDate";
import { fetchLocation } from "../../store/slices/locationSlice";
import { getRoomByLocation } from "../../store/slices/roomSlice";
import reservationApi from "../../services/api/reservation";

const ListReservation = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.data);
  const room = useSelector((state) => state.room.data);

  const [allReservation, setAllReservation] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState([]);

  const getAllReservation = async () => {
    if (allReservation.length === 0) {
      const data = await reservationApi.GetAllGetListReservation();
      setAllReservation(data);
    }
  };

  useEffect(() => {
    console.log(selectedReservation);
  }, [selectedReservation]);

  const submitHandler = (val) => {
    console.log(val);
    getAllReservation().then(() => {
      // console.log(allReservation);
      let filtered = allReservation.filter(
        (item) => item.Tgl === val.selectedDate
      );

      if (val.selectedLocation !== "ALL") {
        filtered = filtered.filter(
          (item) => item.KdLokasi === val.selectedLocation
        );
      }
      if (val.selectedRoom !== "ALL") {
        filtered = filtered.filter(
          (item) => item.NmBarang === val.selectedRoom
        );
      }
      setSelectedReservation(filtered);
    });
  };

  useEffect(() => {
    if (!location) {
      dispatch(fetchLocation());
    }
  }, []);

  return (
    <div>
      <div className={Style.divBox}>
        <h1 className={Style.textWhite}>LIST RESERVATION</h1>
      </div>
      <Formik
        initialValues={{
          selectedDate: currentDate(),
          selectedLocation: "ALL",
          selectedRoom: "ALL",
        }}
        onSubmit={submitHandler}
      >
        {(formikProps) => (
          <Form>
            <div className={Style.divBox}>
              <div className="container">
                <div className="row mb-2">
                  <div className="col-md-3">
                    <h6 style={{ color: "white" }}>Date</h6>
                  </div>
                  <div className="col-md-3">
                    <input
                      // id="reservation-date"
                      className="form-control"
                      // defaultValue={currentDate()}
                      value={formikProps.values.selectedDate}
                      onChange={(event) => {
                        event.preventDefault();
                        formikProps.setFieldValue(
                          "selectedDate",
                          event.target.value
                        );
                        console.log(event.target.value);
                      }}
                      // min={currentDate()}
                      type="date"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h6 style={{ color: "white" }}>Search</h6>
                  </div>
                  <div className="col-md-3">
                    <select
                      id="location"
                      className="form-control"
                      onChange={(event) => {
                        event.preventDefault();
                        // onGetRoom(event.target.value);

                        formikProps.setFieldValue(
                          "selectedLocation",
                          event.target.value
                        );
                        formikProps.setFieldValue("selectedRoom", "ALL");
                        dispatch(getRoomByLocation(event.target.value));
                      }}
                      // defaultValue={formikProps.values.selectedLocation}
                      value={formikProps.values.selectedLocation}
                    >
                      <option value="ALL">ALL</option>
                      {location &&
                        location?.map((val, i) => (
                          <option value={val.KdLokasi} key={i}>
                            {val.NmLokasi}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-control"
                      onChange={(event) => {
                        event.preventDefault();
                        formikProps.setFieldValue(
                          "selectedRoom",
                          event.target.value
                        );
                      }}
                      // defaultValue={formikProps.values.selectedRoom}
                      value={formikProps.values.selectedRoom}
                    >
                      <option value="ALL">ALL</option>
                      {room &&
                        room?.map((val, i) => (
                          <option key={i} value={val.NmBarang}>
                            {val.NmBarang}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={formikProps.submitForm}
                    >
                      SHOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div
        className={Style.divBoxPlain}
        style={{
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">NoID</th>
              <td scope="col">TimeFrom</td>
              <td scope="col">TimeTo</td>
              <td scope="col">Location</td>
              <td scope="col">Room/Resource</td>
              <td scope="col">Reserved For</td>
              <td scope="col">Department</td>
              <td scope="col">Participant</td>
              <td scope="col">Description</td>
            </tr>
          </thead>
          <tbody>
            {selectedReservation.length > 0 ? (
              selectedReservation.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.TimeFrom}</td>
                  <td>{item.TimeTo}</td>
                  <td>{item.KdLokasi}</td>
                  <td>{item.NmBarang}</td>
                  <td>{item.RequestName}</td>
                  <td>{item.RequestDept}</td>
                  <td>{item.Participants}</td>
                  <td>{item.Description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Data Belum / Tidak Tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListReservation;

ListReservation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
