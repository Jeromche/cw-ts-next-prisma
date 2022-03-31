export default async function mockFetchPromise(url: string) {
  switch (url) {
    case '/api/shift/active': {
      return {
        ok: true,
        status: 304,
        json: async () => ({ shift: null }),
      }
    }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}

beforeAll(() => jest.spyOn(window, 'fetch'))
beforeEach(() => window.fetch.mockImplementation(mockFetchPromise))
