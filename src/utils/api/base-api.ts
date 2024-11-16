type BaseApiParams = unknown;
class BaseApi {
  async request(...params: BaseApiParams[]) {
    throw new Error(`Not implemented, ${params}`);
  }

  async create(...params: BaseApiParams[]) {
    throw new Error(`Not implemented, ${params}`);
  }

  async update(...params: BaseApiParams[]) {
    throw new Error(`Not implemented, ${params}`);
  }

  async delete(...params: BaseApiParams[]) {
    throw new Error(`Not implemented, ${params}`);
  }
}

export default BaseApi;
