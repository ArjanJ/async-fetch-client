// @flow
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';

type Headers = {
  accept?: string,
  authorization?: string,
  'content-type'?: string,
};

type Method = 'GET' | 'DELETE' | 'PUT' | 'POST';

type ModuleOptions = {
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

const DEFAULT_HEADERS: Headers = {
  accept: 'application/json',
  'content-type': 'application/json',
};

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const apiClient = async ({
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
  const SID: boolean | string = isBrowser && Cookies.get('SID');

  if (includeCookies) fetchOptions.credentials = 'include';
  if (typeof SID === 'string') {
    fetchOptions.headers.authorization = `Bearer ${SID}`;
  }
  if (typeof body === 'object') fetchOptions.body = JSON.stringify(body);

  try {
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get('content-type');

    /**
     * This isn't that accessible, because it's up to the consumer to
     * parse the non JSON response properly now.
     */
    if (contentType !== 'application/json') {
      return response;
    }

    const json = await response.json();
    return { json };
  } catch (error) {
    return {
      details: error.toString(),
      error: true,
      message: `Failed to fetch resource at ${url}.`,
    };
  }
};

export default apiClient;
