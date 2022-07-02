import * as Yup from "yup";

import { CLEAR_USER, FILL_USER } from "../../store/slices/userSlice";
import { Form, Formik } from "formik";

import Styles from "../../styles/Login.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    dispatch(CLEAR_USER());
  }, []);

  const YupUserValidation = Yup.object().shape({
    username: Yup.string().required("username tidak boleh kosong"),
    password: Yup.string().required("Password"),
  });

  const loginHandler = async (val) => {
    const res = await axios.post(`${config.API_URL}/Login/PostLogin`, {
      UserAD: val.username,
      Password: val.password,
    });
    if (res.data.UserAD) {
      dispatch(FILL_USER(res.data));
      router.push("/");
    } else {
      Swal.fire({
        title: "Error",
        text: "Username / Password salah",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // useEffect(() => {
  //   clearUser();
  // }, []);

  return (
    <div className={Styles.wrapper}>
      <div className="container">
        <div className={Styles.row}>
          <div className="col-lg-6 px-5 pt-5">
            <img
              src="/images/calendar.png"
              className="img-fluid logologin"
              alt=" "
            />
          </div>

          <div className="col-lg-5">
            <div>
              <img
                src="/images/logob7.png"
                style={{ width: "180px" }}
                alt="Alternate Text"
              />
              <h4>Welcome To Reservation Online</h4>
            </div>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={YupUserValidation}
              onSubmit={(val) => loginHandler(val)}
            >
              {(formikProps) => (
                <Form>
                  <div className="form-row">
                    <div className="col-lg-7">
                      <label style={{ fontWeight: "bold" }}>
                        <i className="fa fa-user" aria-hidden="true"></i>{" "}
                        Username{" "}
                      </label>
                      <input
                        type="text"
                        name="username"
                        className="form-control "
                        placeholder="Input Username"
                        onChange={(event) => {
                          formikProps.setFieldValue(
                            "username",
                            event.target.value
                          );
                        }}
                        style={{ width: "350px" }}
                        value={formikProps.values.username}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-row">
                    <div className="col-lg-7">
                      <label style={{ fontWeight: "bold" }}>
                        <i className="fa fa-lock" aria-hidden="true"></i>{" "}
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="txt_password"
                        className="form-control"
                        onChange={(event) =>
                          formikProps.setFieldValue(
                            "password",
                            event.target.value
                          )
                        }
                        placeholder="Input Password"
                        style={{ width: "350px" }}
                        value={formikProps.values.password}
                      />
                      {/* <input type="checkbox" onClick="visibility()" /> Show */}
                      {/* Password */}
                    </div>
                  </div>
                  <br />
                  <div className="form-row">
                    <div className="col-lg-7">
                      <button
                        type="button"
                        className={Styles.btn1}
                        style={{ width: "350px" }}
                        onClick={(event) => {
                          formikProps.validateForm().then((val) => {
                            if (
                              Object.keys(val).length === 0 &&
                              val.constructor === Object
                            ) {
                              formikProps.submitForm();
                            } else {
                              // Error
                              Swal.fire({
                                title: "Error",
                                text: "Username / Password salah",
                                icon: "error",
                                timer: 1500,
                                showConfirmButton: false,
                              });
                            }
                          });
                          // formikProps.submitForm().then((val) => {
                          //   console.log(val);
                          // });
                        }}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
