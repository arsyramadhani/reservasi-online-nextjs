const GetToday = () => {
  var date = new Date();
  date = date.toJSON().slice(0, 10).split`-`.join``;

  return date;
};

export default GetToday;
