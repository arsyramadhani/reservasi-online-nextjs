import "../styles/Home.module.css";

import Layout from "../components/Layouts/Layout";

export default function Home() {
  return (
    <div id="content" className="p-4 p-md-5 pt-5" style={{ marginTop: "-5vh" }}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 px-5 pt-3">
              <img
                src={`/TrialReservationOnline/images/reservation2.png`}
                className="img-fluid ilus"
                alt=" "
              />
            </div>
            <div className="col-lg-5" style={{ paddingTop: "60px" }}>
              <img
                src={`/TrialReservationOnline/images/webTxt.png`}
                className="img-fluid"
                alt=" "
              />
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
