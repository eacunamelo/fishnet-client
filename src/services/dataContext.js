import { createContext, useState, useEffect } from "react";
import AuthService from "./AuthService";
import LotRepository from '../services/repository/LotRepository'

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [dataContext, setDataContext] = useState({ 
      auth: { 
        isLoggedIn: AuthService.isLoggedIn() 
      },
      profile: {
        hasStartedLot: false
      }
  });

  useEffect(() => {
    const profile = AuthService.getProfile();
    if (profile) {
      AuthService.reLogin(profile)
      .then((res) => {
        LotRepository.getCurrent().then((res) => {
          setDataContext({
            auth: { isLoggedIn: true }, 
            profile: { 
              hasStartedLot: res.hasOwnProperty('id')
            }
          })
        })
      })
      .catch((error) => {
        AuthService.logOut();
        setDataContext({
          auth: { isLoggedIn: false }, 
          profile: { 
            hasStartedLot: false
          }
        })
      })
    } else {
      AuthService.logOut();
      setDataContext({
        auth: { isLoggedIn: false }, 
        profile: { 
          hasStartedLot: false
        }
      })
    }
  }, [])
  
  // useEffect(() => {
  //     LotRepository.getCurrent().then((res) => {
  //       setDataContext({
  //         ...dataContext, 
  //         profile: { 
  //           hasStartedLot: res.hasOwnProperty('id')
  //         }
  //       })
  //     })

  // }, [])

  return (
    <DataContext.Provider value={{ dataContext, setDataContext }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };