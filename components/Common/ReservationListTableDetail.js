const ReservationListTableDetail = ({ data }) => {
  return (
    <table className="table table-bordered ">
      <thead className="thead-dark">
        <tr>
          <th style={{ width: "30%" }}>Nama</th>
          <th style={{ width: "30%" }}>Department</th>
          <th style={{ width: "30%" }}>From</th>
          <th style={{ width: "30%" }}>To</th>
        </tr>
      </thead>
      <tbody id="user_book">
        {data.length > 0 ? (
          data.map((val, i) => (
            <tr key={i}>
              <td style={{ color: "white" }}>{val.RequestName}</td>
              <td style={{ color: "white" }}>{val.RequestDept}</td>
              <td style={{ color: "white" }}>{val.TimeFrom}</td>
              <td style={{ color: "white" }}>{val.TimeTo}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReservationListTableDetail;
