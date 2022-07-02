const ReservationTable = ({ data, onDelete }) => {
  // console.log(data);

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <h2 style={{ color: "white" }}>Reservation List</h2>
        </div>
        <div className="col-md-5">
          <p style={{ color: "red", marginTop: "3vh" }}>
            (to add more reservation please choose room/resource then click
            save)
          </p>
        </div>
        <div className="col-md-12">
          <table
            className="table table-bordered"
            // style={{ marginLeft: "20vh", marginRight: "20vh" }}
          >
            <thead className="thead-dark">
              <tr>
                <th>Location</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time From</th>
                <th>Time To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="data-reservation">
              {data.length > 0 &&
                data.map((val, i) => (
                  <tr key={i}>
                    <td style={{ color: "white" }}>{val.NmLokasi}</td>
                    <td style={{ color: "white" }}>{val.NmBarang}</td>
                    <td style={{ color: "white" }}>{val.Tgl}</td>
                    <td style={{ color: "white" }}>{val.TimeFrom}</td>
                    <td style={{ color: "white" }}>{val.TimeTo}</td>
                    <td>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          onDelete({
                            KdBarang: val.KdBarang,
                            TimeFrom: val.TimeFrom,
                            TimeTo: val.TimeTo,
                            Tanggal: val.Tgl,
                          });
                        }}
                      >
                        remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReservationTable;
