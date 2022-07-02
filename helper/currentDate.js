const currentDate = () => {
  var html = new Date();
  var month = String(html.getMonth() + 1).padStart(2, "0");
  var day = String(html.getDate()).padStart(2, "0");
  //mengambil date hari ini
  return html.getFullYear() + "-" + month + "-" + day;
};

export default currentDate;
