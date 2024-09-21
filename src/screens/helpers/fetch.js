import { useEffect } from "react";
import { getData } from "./asyncStorage";

const SHOW_LOG = true;
export const devURL = 'https://dev.ofa-capital.com'
export const productionURL = 'https://www.ofa-capital.com'

// const [appMode,setAppMode] = useState()

// async () =>{
//   const user = await getData('appMode')
//   setUser(user)
// }

//path



export const apiQROrderGET = async (path, body) => {


  const urlFetch = await getData('appMode') + path;
  SHOW_LOG && console.log('GET ', urlFetch, JSON.stringify(body));
  const res = await fetch(urlFetch, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${body}`
    },
  });


  return (await res.json());
  // }
  // catch{error}{
  //   return error
  // }

}

  export const apiQROrderGETProfile = async (path, body) => {


    const urlFetch = await getData('appMode') + path;
    SHOW_LOG && console.log('GET', urlFetch,'token', body);
    const res = await fetch(urlFetch, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${body}`
      },
      
    });

  
    return (await res.json());

    }
  

export const apiQROrderPOST = async (path, body) => {



  const urlFetch = await getData('appMode') + path;
  SHOW_LOG && console.log('POST ', urlFetch, JSON.stringify(body));


  const res = await fetch(urlFetch, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      body
    ),
  });

  return (await res.json());
   

  }

export const apiCreateTransPOST = async (path, body,token) => {


  const urlFetch = await getData('appMode') + path;
  SHOW_LOG && console.log('POST ', urlFetch, JSON.stringify(body),'Token',token);


  const res = await fetch(urlFetch, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(
      body
    ),
  });

  return (await res.json());
}
  

export const apiQROrderRegisterPOST = async (path, body) => {


  const urlFetch = await getData('appMode') + path;
  SHOW_LOG && console.log('POST ', urlFetch, JSON.stringify(body));


  const res = await fetch(urlFetch, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
   
    body: JSON.stringify(
      body
    ),
  });

  return (await res.json());

  }