import { fetchTimeout, getJsonRequest } from './utils/fetch';

// export const fetchSharePrice = (token) =>
//   fetchTimeout('http://qfx.quartalflife.com/Clients/uk/unite_group2/XML/xml.aspx', postJsonRequest(token));

  //CurrentPrice

// export const fetchNewsArticles = async (url, accessToken) => {
//   return fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + accessToken,
//       'Accept': 'application/json;odata=verbose',
//       'Content-Type': 'application/json;odata=verbose',
//       'xhrFields': { withCredentials: true },
//       'withCredentials': false,
//     },
//   });
// };



export const fetchNewsArticles = (url, accessToken) => {
  const headers = {
    // 'Authorization': 'Bearer ' + accessToken,
    'Accept': 'application/json;odata=verbose',
    // 'Content-Type': 'application/json;odata=verbose',
    'xhrFields': { withCredentials: true },
    'withCredentials': false,
  };
  return fetchTimeout(url, getJsonRequest(accessToken, headers));
}
  

export const fetcSharePointAuth = async (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      // 'Authorization': 'Bearer ' + jwt,
      // 'Accept': 'application/json;odata=verbose',
      // 'Content-Type': 'application/json;odata=verbose',
      // 'xhrFields': { withCredentials: true },
      // 'withCredentials': false,
    },
  });
};


