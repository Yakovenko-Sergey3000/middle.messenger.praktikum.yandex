type BaseApiParams = unknown;
class BaseApi {
  async request(params?: BaseApiParams): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }

  async create(params?: BaseApiParams): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }

  async update(params?: BaseApiParams): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }

  async delete(params?: BaseApiParams): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }
}

export default BaseApi;
