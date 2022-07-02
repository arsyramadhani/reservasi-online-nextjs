const currentHour = () => {
  let hour = new Date().getHours();
  let minutes = new Date().getMinutes();

  hour = hour.toString().padStart(2, 0);
  minutes = minutes > 30 ? 3 : 0;
  minutes = minutes.toString().padStart(2, 0);

  return `${hour}:${minutes}`;
};

export default currentHour;
