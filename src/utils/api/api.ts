import { YA_ENDPOINTS } from "../../enums.ts";

type ApiPropsType = {
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  method?: string;
  timeout?: number;
};

type HTTPMethod = <T>(url: string, options?: ApiPropsType, timeout?: number) => Promise<T>;

interface IApi {
  get: HTTPMethod;
  post: HTTPMethod;
  put: HTTPMethod;
  delete: HTTPMethod;
}

class Api implements IApi {
  static METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  };

  #base_url: string;

  constructor(url: string) {
    this.#base_url = `${YA_ENDPOINTS.api}${url}`;
  }

  #queryStringify(url: string, data: unknown): string {
    const newUrl = new URL(url);
    if (data && typeof data === "object") {
      Object.entries(data).forEach(([key, val]) => newUrl.searchParams.set(key, val as string));
    }

    return newUrl.toString();
  }

  #request: HTTPMethod = (url, options = { method: Api.METHODS.GET }, timeout = 15000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      const isGet: boolean = method === Api.METHODS.GET;
      const preparedUrl: string = isGet ? this.#queryStringify(url, data || {}) : url;

      xhr.open(method, preparedUrl);
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        const responce: { status: number; response: unknown } = {
          status: xhr.status,
          response: xhr.response,
        };

        if (xhr.status >= 400) {
          reject(responce);
        }

        // @ts-expect-error ...
        resolve(responce);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  };

  get: HTTPMethod = async (url, options) =>
    this.#request(this.#base_url + url, { ...options, method: Api.METHODS.GET });

  post: HTTPMethod = async (url, options) =>
    this.#request(this.#base_url + url, { ...options, method: Api.METHODS.POST });

  put: HTTPMethod = async (url, options) =>
    this.#request(this.#base_url + url, { ...options, method: Api.METHODS.PUT });

  delete: HTTPMethod = async (url, options) =>
    this.#request(this.#base_url + url, { ...options, method: Api.METHODS.DELETE });
}

export default Api;
