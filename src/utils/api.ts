import { Any } from "./global-types/index.ts";

type ApiPropsType = {
  headers?: Record<string, string>;
  data?: Record<string, Any>;
};

interface IApi {
  get(url: string, data: ApiPropsType): Promise<XMLHttpRequest>;

  post(url: string, data: ApiPropsType): Promise<XMLHttpRequest>;

  put(url: string, data: ApiPropsType): Promise<XMLHttpRequest>;

  delete(url: string, data: ApiPropsType): Promise<XMLHttpRequest>;
}

class Api implements IApi {
  static METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  };

  #queryStringify(url: string, data: Record<string, Any>): string {
    const newUrl = new URL(url);
    Object.entries(data).forEach(([key, val]) => newUrl.searchParams.set(key, val));

    return newUrl.toString();
  }

  #request = (
    url: string,
    options: { headers?: Record<string, string>; method: string; data?: Record<string, Any> },
    timeout: number = 5000,
  ): Promise<XMLHttpRequest> => {
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

      xhr.setRequestHeader("Content-Type", "application/json");
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        const responce: { status: number; response: Any } = {
          status: xhr.status,
          response: xhr.response ? JSON.parse(xhr.response) : {},
        };

        if (xhr.status >= 400) {
          reject(new Error(JSON.stringify(responce)));
        }

        resolve(responce as XMLHttpRequest);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };

  async get(url: string, { headers, data }: ApiPropsType = {}): Promise<XMLHttpRequest> {
    return this.#request(url, { method: Api.METHODS.GET, headers, data });
  }

  async post(url: string, { headers, data }: ApiPropsType = {}): Promise<XMLHttpRequest> {
    return this.#request(url, { method: Api.METHODS.POST, headers, data });
  }

  async put(url: string, { headers, data }: ApiPropsType = {}): Promise<XMLHttpRequest> {
    return this.#request(url, { method: Api.METHODS.PUT, headers, data });
  }

  async delete(url: string, { headers, data }: ApiPropsType = {}): Promise<XMLHttpRequest> {
    return this.#request(url, { method: Api.METHODS.DELETE, headers, data });
  }
}

export default new Api();
