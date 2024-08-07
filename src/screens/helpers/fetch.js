const SHOW_LOG = true;

//path
export const apiQROrderGET = async (path, body) => {

  
  const urlFetch = 'https://dev.ofa-capital.com' + path;
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
  }

  export const apiQROrderGETProfile = async (path, body) => {

  
    const urlFetch = 'https://dev.ofa-capital.com' + path;
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

 
  const urlFetch = 'https://dev.ofa-capital.com' + path;
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

 
  const urlFetch = 'https://dev.ofa-capital.com' + path;
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


  const urlFetch = 'https://dev.ofa-capital.com' + path;
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