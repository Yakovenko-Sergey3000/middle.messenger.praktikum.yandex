type BaseApiParams = unknown;
class BaseApi {
  async request<T>(...params: [BaseApiParams[]?]): Promise<T> {
    throw new Error(`Not implemented, ${params}`);
  }

  async create<T>(...params: BaseApiParams[]): Promise<T> {
    throw new Error(`Not implemented, ${params}`);
  }

  async update<T>(...params: BaseApiParams[]): Promise<T> {
    throw new Error(`Not implemented, ${params}`);
  }

  async delete<T>(...params: BaseApiParams[]): Promise<T> {
    throw new Error(`Not implemented, ${params}`);
  }
}

export default BaseApi;
