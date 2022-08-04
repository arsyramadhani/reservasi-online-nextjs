// import "../../styles/Home.module.css";

import Link from "next/link";

const Sidebar = () => {
  return (
    <nav
      id="sidebar"
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="custom-menu"></div>
      <div
        className="img bg-wrap text-center py-4"
        style={{
          backgroundImage: `url('/TrialReservationOnline/images/bg_1.jpg')`,
        }}
      >
        <div className="user-logo">
          <div
            className="img"
            // style="background-image: url(../../Content/images/logo.png);"
            style={{
              backgroundImage: `url('/TrialReservationOnline/images/logo.png')`,
            }}
          ></div>
          {/* <h3>@Session["Username"]</h3> */}
        </div>
      </div>
      <ul className="list-unstyled components mb-5">
        <li className="active">
          <Link href="/">
            <a id="home_btn">
              <span className="fa fa-home mr-3"></span> Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Reservation/AddReservation">
            <a id="new_reservation">
              <span className="fa fa-plus mr-3 "></span> New Reservation
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Reservation/ListReservation">
            <a id="list_reservation">
              <span className="fa fa-th-list mr-3"></span> List Reservation
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Reservation/RoomResource">
            <a id="RoomReservation">
              <span className="fa fa-th-list mr-3"></span> Room and Resource
            </a>
          </Link>
        </li>

        <li>
          <Link href="/Login/Login">
            <a id="btn_logout">
              <span className="fa fa-sign-out mr-3"></span> Sign Out
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
