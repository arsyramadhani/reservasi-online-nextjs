import axios from "axios";
import config from "../../config";

axios.defaults.baseURL = config.API_URL;

const reservationApi = {
  onGetNoId: async () => {
    try {
      const res = await axios.get("/Reservation/GetNoID");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  GetLocation: async () => {
    try {
      const res = await axios.get("/Reservation/GetLocation");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  GetAllLocation: async () => {
    const res = await axios.get("/Reservation/GetLocation");
    return res;
  },
  GetAllGetListReservation: async () => {
    const res = await axios.get("/Reservation/GetListReservation");
    return res.data;
  },
  GetRoomByLocation: async (val) => {
    const res = await axios.post("/Reservation/GetRoom", {
      KdLokasi: val,
    });
    return res;
  },
  onGetRoom: async (val) => {
    try {
      const res = await axios.post("/Reservation/GetRoom", {
        KdLokasi: val,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  DeleteReservation: async (val) => {
    try {
      const res = await axios.post("/Reservation/DeleteReservation", {
        NoID: val.NoID,
        RequestDate: val.RequestDate,
        KdBarang: val.KdBarang,
        TimeFrom: val.TimeFrom,
        TimeTo: val.TimeTo,
        Tanggal: val.Tanggal,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  checkMappingTime: async (val) => {
    try {
      const res = await axios.post("/Reservation/CheckMappingTime", {
        KdBarang: val.KdBarang,
        Tanggal: val.Tanggal,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  checkShedule: async (val) => {
    try {
      const res = await axios.post("/Reservation/CheckSchedule", val);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getReservation: async (val) => {
    try {
      const res = await axios.post("/Reservation/GetReservation", {
        NoID: val.NoID,
        // "30/06/2022 2:33:31 PM - 00526",
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getTimeSchedule: async (val) => {
    try {
      const res = await axios.post("/Reservation/GetTimeSchedule");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllTimeSchedule: async (val) => {
    const res = await axios.post("/Reservation/GetTimeSchedule");
    return res;
  },
  saveHeader: async (val) => {
    try {
      const res = await axios.post("/Reservation/SaveHeader", {
        NoID: val.NoID,
        RequestDate: new Date().toISOString(),
        RequestName: val.RequestName,
        RequestDept: val.RequestDept,
        Description: val.Description,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  saveDetail: async (val) => {
    try {
      const res = await axios.post("/Reservation/SaveDetail", {
        NoID: val.NoID,
        KdBarang: val.KdBarang,
        KdType: val.KdType,
        Tanggal: val.Tanggal,
        TimeFrom: val.TimeFrom,
        TimeTo: val.TimeTo,
        Participants: val.Participants,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  displayTableBooking: async (val) => {
    try {
      const res = await axios.post("/Reservation/DisplayTableBooking", {
        KdBarang: val.KdBarang,
        Tanggal: val.Tanggal,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default reservationApi;
