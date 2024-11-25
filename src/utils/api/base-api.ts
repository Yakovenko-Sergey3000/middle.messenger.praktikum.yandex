class BaseApi {
  async request(params?: unknown): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }

  async create(params?: unknown): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }

  async update(params?: unknown): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }

  async delete(params?: unknown): Promise<unknown> {
    throw new Error(`Not implemented, ${params}`);
  }
}

export default BaseApi;
