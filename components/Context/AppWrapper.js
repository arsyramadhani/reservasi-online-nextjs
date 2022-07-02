import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setuserState] = useState({
    UserAD: "febrian.ramadhani",
    Name: "FEBRIAN ARSY RAMADHANI",
    NIK: "K2021000241",
    Dept: "Information Technology",
  });

  const SetUser = ({ UserAD, Name, NIK, Dept }) => {
    setuserState((val) => {
      val.UserAD = UserAD;
      val.Name = Name;
      val.NIK = NIK;
      val.Dept = Dept;
    });
  };
  const ClearUser = (UserAD, Name, NIK, Dept) => {
    setuserState({ UserAD: "", Name: "", NIK: "", Dept: "" });
  };

  const provided = useMemo(
    () => ({
      user,
      setUser: (value) => setuserState(value),
      clearUser: () => {
        setuserState({
          UserAD: "",
          Name: "",
          NIK: "",
          Dept: "",
        });
      },
    }),
    [user]
  );

  return <AppContext.Provider value={provided}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
