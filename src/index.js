// @flow
import Cookies from 'js-cookie';

type Headers = {
  accept?: string,
  authorization?: string,
  'content-type'?: string,
};
type Method = 'GET' | 'DELETE' | 'PUT' | 'POST';
type ModuleOptions = {
  basePath: string,
  body?: {},
  headers?: Object,
  includeCookies?: boolean,
  method: Method,
  url: string,
};
type RequestOptions = {
  body?: string,
  credentials?: 'include',
  headers: Headers,
  method: Method,
};

const BASE_PATH = '/api';
const DEFAULT_HEADERS: Headers = {
  accept: 'application/json',
  'content-type': 'application/json',
};

const apiClient = async ({
  basePath,
  body,
  headers,
  includeCookies,
  method,
  url,
}: ModuleOptions) => {
  const fetchOptions: RequestOptions = {
    headers: headers || DEFAULT_HEADERS,
    method,
  };

  // If running on server, then don't bother fetching cookies.
  const SID: boolean | string = window !== undefined && Cookies.get('SID');

  if (includeCookies) fetchOptions.credentials = 'include';
  if (typeof SID === 'string') {
    fetchOptions.headers.authorization = `Bearer ${SID}`;
  }
  if (typeof body === 'object') fetchOptions.body = JSON.stringify(body);

  const fetchUrl = `${basePath || BASE_PATH}${url}`;

  try {
    const response = await fetch(fetchUrl, fetchOptions);
    const json = await response.json();
    return { json };
  } catch (error) {
    return { error };
  }
};

export default apiClient;
