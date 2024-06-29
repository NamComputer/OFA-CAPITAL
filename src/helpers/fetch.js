
const SHOW_LOG = true;

//path
export const apiQROrderGET = async (path, body) => {

  
  const urlFetch = 'https://dev.ofa-capital.com' + path;
  // SHOW_LOG && console.log('POST ', urlFetch);
  const res = await fetch(urlFetch, {
    method: 'GET',
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



export const apiQROrderPOST = async (path, body, willDisplayErr = true) => {

 
  const urlFetch = 'https://dev.ofa-capital.com' + path;
  SHOW_LOG && console.log('POSTTT ', urlFetch);
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

};
