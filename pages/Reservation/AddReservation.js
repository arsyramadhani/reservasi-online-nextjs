import * as Yup from "yup";

import { Form, Formik } from "formik";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layouts/Layout";
import Style from "../../styles/AddReservation.module.css";
import Swal from "sweetalert2";
import arrOfHours from "../../helper/clockHelper";
import currentDate from "../../helper/currentDate";
import dynamic from "next/dynamic";
import { fetchLocation } from "../../store/slices/locationSlice";
import reservationApi from "../../services/api/reservation";

// import ReservationListTable from "../../components/Common/ReservationListTable";
// import ReservationListTableDetail from "../../components/Common/ReservationListTableDetail";
// import ReservationTable from "../../components/Common/ReservationTable";

const rowLength = () => {
  let arr = [];
  for (let i = 1; i <= 20; i++) {
    arr.push(i);
  }
  return arr;
};

const ReservationListTable = dynamic(() =>
  import("../../components/Common/ReservationListTable")
);
const ReservationListTableDetail = dynamic(() =>
  import("../../components/Common/ReservationListTableDetail")
);
const ReservationTable = dynamic(() =>
  import("../../components/Common/ReservationTable")
);

const AddReservation = () => {
  // const location = useQuery("dataLocation", reservationApi.GetLocation);
  // const [location, setLocation] = useState([]);

  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [roomList, setRoomList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [displayInfo, setDisplayInfo] = useState({
    currentDate: currentDate(),
    name: "",
    dept: "",
  });
  const checkRef = createRef();
  const [reservationList, setReservationList] = useState([]);
  const [dataReservation, setDataReservation] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [displayTableBooking, setDisplayTableBooking] = useState([]);
  const [mappingTime, setMappingTime] = useState([]);
  const [isButtonSaveEnabled, setIsButtonSaveEnabled] = useState(false);

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.data);
  useEffect(() => {
    if (!location) {
      dispatch(fetchLocation());
    }
  }, []);

  const dataFetcher = async (val, type) => {
    reservationApi
      .displayTableBooking({
        KdBarang: val.selectedRoom,
        Tanggal: val.reservationDate,
      })
      .then((val) => {
        setDisplayTableBooking(val);
      });
    reservationApi
      .checkMappingTime({
        KdBarang: val.selectedRoom,
        Tanggal: val.reservationDate,
      })
      .then((res) => {
        setMappingTime(res);
        console.log(res);
        const indeex = res.findIndex(
          (item) =>
            item.TimeFrom === val.clockFrom && item.TimeTo === val.clockTo
        );

        if (indeex > -1) {
          console.log(res);
          setIsButtonSaveEnabled(true);
          type !== "false" &&
            Swal.fire({
              title: "Error",
              text: "Jam Tidak Tersedia",
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
        } else {
          console.log(res);
          setIsButtonSaveEnabled(false);
        }
      });
    // console.log(currentId === "");
    if (currentId !== "") {
      const reserv = await reservationApi.getReservation({
        NoID: currentId,
      });

      setDataReservation(reserv);
    }
  };

  const checkHandler = (val) => {
    dataFetcher(val);
  };

  const onSubmit = async (val) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.value) {
        console.log(val);
        let id = currentId === "" ? "" : currentId;

        // get new id
        if (currentId === "") {
          const newId = await reservationApi.onGetNoId();
          id = newId[0]?.Generate_Number;
          setCurrentId(id);
        }

        await reservationApi.saveHeader({
          NoID: id,
          RequestName: displayInfo.name,
          RequestDept: displayInfo.dept,
          Description: val.description,
        });

        await reservationApi.saveDetail({
          NoID: id,
          KdBarang: val.selectedRoom,
          KdType: val.reservationType,
          Tanggal: val.reservationDate,
          TimeFrom: val.clockFrom,
          TimeTo: val.clockTo,
          Participants: val.participantAmount,
        });

        dataFetcher(val, "false");
      }
    });
  };

  const YupReserveValidation = Yup.object().shape({
    // username: Yup.string().required("username tidak boleh kosong"),
    // password: Yup.string().required("Password"),

    clockFrom: Yup.string().required("Jam Tidak Boleh Kosong"),
    clockTo: Yup.string().required("Jam Tidak Boleh Kosong"),
    description: Yup.string().required("Deskripsi Tidak Boleh Kosong"),
    participantAmount: Yup.number().required("Partisipan Tidak Boleh Kosong"),
    reservationDate: Yup.string().required(
      "Tanggal Reservasi Tidak Boleh Kosong"
    ),
    reservationType: Yup.string().required("Tipe Reservasi Tidak Boleh Kosong"),
    selectedLocation: Yup.string().required("Lokasi Tidak Boleh Kosong"),
    selectedRoom: Yup.string().required("Ruangan Tidak Boleh Kosong"),
  });

  const deleteHandler = async (val) => {
    await reservationApi.DeleteReservation({
      ...val,
      NoID: currentId,
      RequestDate: currentDate(),
    });
    const reserv = await reservationApi.getReservation({
      NoID: currentId,
    });
    setDataReservation(reserv);
  };

  return (
    <div
      style={
        {
          // backgroundImage: `url("/images/background_brighter.png")`,
          // padding: "32px",
        }
      }
    >
      <h1
        style={{
          textAlign: "center",
        }}
        className={Style.textWhite}
      >
        Reservation Meeting Room &quot; Resource
      </h1>
      <div className={Style.divBox}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h4 className={Style.textWhite}>Request Date :</h4>
            </div>
            <div className="col-md">
              <h4 className={Style.textWhite}>{currentDate()}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <h4 className={Style.textWhite}>Request Name : </h4>
            </div>
            <div className="col-md">
              <h4 className={Style.textWhite} id="txt_name">
                {user.Name}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <h4 className={Style.textWhite}>Request Dept : </h4>
            </div>
            <div className="col-md">
              <h4 className={Style.textWhite} id="txt_dept">
                {user.Dept}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
          selectedLocation: "",
          clockFrom: arrOfHours[0] || "",
          clockTo: arrOfHours[1] || "",
          selectedRoom: "",
          reservationDate: currentDate(),
          reservationType: "RM",
          participantAmount: 1,
          selectedType: "",
          description: "",
        }}
        validationSchema={YupReserveValidation}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <Form>
            <div className={Style.divBox}>
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <label style={{ color: "white" }}>
                      Reservation Description{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-md-9">
                    <textarea
                      id="description"
                      value={formikProps.values.description}
                      onChange={(event) => {
                        event.preventDefault();
                        formikProps.setFieldValue(
                          "description",
                          event.target.value
                        );
                      }}
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="form-group"></div>
                <div className="row">
                  <div className="col-md-3">
                    <label style={{ color: "white" }}>
                      Reservation Type <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <input
                      className="radio-type ResType"
                      type="radio"
                      id="radio1"
                      name="resource"
                      defaultChecked
                      value="RM"
                      onChange={(event) =>
                        formikProps.setFieldValue(
                          "reservationType",
                          event.target.value
                        )
                      }
                    />
                    <label style={{ color: "white" }}>Meeting Room</label>
                  </div>
                  <div className="col-md-2">
                    <input
                      className="radio-type ResType"
                      type="radio"
                      id="radio2"
                      name="resource"
                      value="Others"
                      onChange={(event) =>
                        formikProps.setFieldValue(
                          "reservationType",
                          event.target.value
                        )
                      }
                    />
                    <label style={{ color: "white" }}>Others</label>
                  </div>
                  <div className="col-md-2">
                    <label style={{ color: "white" }}>
                      Participant Amount
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <input
                      id="participants"
                      className="form-control"
                      type="number"
                      value={formikProps.values.participantAmount}
                      onChange={(event) => {
                        event.preventDefault();
                        formikProps.setFieldValue(
                          "participantAmount",
                          event.target.value
                        );
                      }}
                      // onInput="this.value = Math.abs(this.value)"
                      min="1"
                      max="99"
                    />
                  </div>
                </div>
                <div className="form-group"></div>
                <div className="row">
                  <div className="col-md-3">
                    <label style={{ color: "white" }}>
                      Reservation Date <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      // id="reservation-date"
                      className="form-control"
                      value={formikProps.values.reservationDate}
                      onChange={(event) => {
                        event.preventDefault();
                        formikProps.setFieldValue(
                          "reservationDate",
                          event.target.value
                        );
                        console.log(event.target.value);
                      }}
                      min={currentDate()}
                      type="date"
                    />
                  </div>
                </div>
                <div className="form-group"></div>
                <div className="row">
                  <div className="col-md-3">
                    <label style={{ color: "white" }}>
                      Reservation Time <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-md-1">
                    <p style={{ color: "white" }}>From</p>
                  </div>
                  <div className="col-md-2">
                    <select
                      id="from_time"
                      className="form-control"
                      value={formikProps.values.clockFrom || arrOfHours[0]}
                      onChange={(event) =>
                        formikProps.setFieldValue(
                          "clockFrom",
                          event.target.value
                        )
                      }
                    >
                      {arrOfHours.map((val, i) => (
                        <option value={val} key={i}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-1">
                    <p style={{ color: "white" }}>To</p>
                  </div>
                  <div className="col-md-2">
                    <select
                      id="to_time"
                      className="form-control"
                      value={formikProps.values.clockTo || arrOfHours[0]}
                      onChange={(event) =>
                        formikProps.setFieldValue("clockTo", event.target.value)
                      }
                    >
                      {arrOfHours.map((val, i) => (
                        <option value={val} key={i}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={Style.divBox}>
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <label style={{ color: "white" }}>
                      Location <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <select
                      id="location"
                      className="form-control"
                      onChange={(event) => {
                        event.preventDefault();
                        // onGetRoom(event.target.value);
                        formikProps.setFieldValue("selectedRoom", "");
                        reservationApi
                          .onGetRoom(event.target.value)
                          .then((val) => setRoomList(val));
                        formikProps.setFieldValue(
                          "selectedLocation",
                          event.target.value
                        );
                      }}
                      value={formikProps.values.selectedLocation}
                    >
                      <option value="" disabled>
                        Select your option
                      </option>
                      <option value="ALL">ALL</option>
                      {location?.map((val, i) => (
                        <option value={val.KdLokasi} key={i}>
                          {val.NmLokasi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group"></div>
                <div className="row">
                  <div className="col-md-3">
                    <label style={{ color: "white" }}>
                      Search <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-md-5">
                    <select
                      id="search"
                      className="form-control"
                      value={formikProps.values.selectedRoom}
                      onChange={(event) =>
                        formikProps.setFieldValue(
                          "selectedRoom",
                          event.target.value
                        )
                      }
                    >
                      <option value="">--</option>
                      {roomList.length > 0 &&
                        roomList.map((val, i) => (
                          <option key={i} value={val.KdBarang}>
                            {val.NmBarang}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    {/* <input
                      id="check"
                      className="btn btn-primary"
                      style={{ borderRadius: "0.5rem" }}
                      type="button"
                      value="C H E C K"
                    /> */}
                    <button
                      id="check"
                      className="btn btn-primary"
                      style={{ borderRadius: "0.5rem" }}
                      type="button"
                      ref={checkRef}
                      onClick={(event) => {
                        event.preventDefault();

                        formikProps.validateForm().then((val) => {
                          if (
                            Object.keys(val).length === 0 &&
                            val.constructor === Object
                          ) {
                            // OKE
                            // formikProps.submitForm();
                            // checkHandler(formikProps.values);
                            checkHandler(formikProps.values);
                          } else {
                            // Error
                            Swal.fire({
                              title: "Error",
                              text: `${JSON.stringify(val)}`,
                              icon: "error",
                              timer: 2000,
                              showConfirmButton: false,
                            });
                          }
                        });
                      }}
                    >
                      CHECK
                    </button>
                  </div>
                  <div className="col-md-2">
                    <input
                      id="save"
                      className="btn btn-primary"
                      style={{ borderRadius: "0.5rem" }}
                      disabled={isButtonSaveEnabled}
                      onClick={(event) => {
                        event.preventDefault();
                        formikProps.submitForm();
                      }}
                      type="button"
                      value="S A V E"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className={Style.divBox}>
        <div className="container">
          test
          <ReservationListTable data={mappingTime} />
        </div>
        <div className="container">
          <ReservationListTableDetail data={displayTableBooking || []} />
        </div>
      </div>
      <div className={Style.divBox}>
        <ReservationTable
          data={dataReservation || []}
          onDelete={(data) =>
            deleteHandler(data).then(() => {
              const node = checkRef.current;
              node.click();
            })
          }
        />
      </div>
    </div>
  );
};

export default AddReservation;

AddReservation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
