export default async function mockFetchPromise(url: string) {
  switch (url) {
    case '/api/shift/active': {
      return {
        ok: true,
        status: 304,
        json: async () => ({ shift: null }),
      }
    }
    case '/api/shift/inactive': {
      return {
        ok: true,
        status: 304,
        json: async () => ({
          shifts: [
            {
              location: 'Uruguay',
              createdAt: '2022-03-27T22:41:04.726Z',
              updatedAt: '2022-03-28T01:21:11.704Z',
            },
            {
              location: 'Uruguay',
              createdAt: '2022-03-28T01:24:51.797Z',
              updatedAt: '2022-03-28T01:28:20.647Z',
            },
            {
              location: 'Australia',
              createdAt: '2022-03-30T03:46:01.588Z',
              updatedAt: '2022-03-30T03:46:03.775Z',
            },
            {
              location: 'Australia',
              createdAt: '2022-03-30T04:11:32.398Z',
              updatedAt: '2022-03-30T04:11:35.530Z',
            },
            {
              location: 'Mexico',
              createdAt: '2022-03-30T04:27:46.842Z',
              updatedAt: '2022-03-30T04:27:50.029Z',
            },
            {
              location: 'Australia',
              createdAt: '2022-03-30T04:34:00.150Z',
              updatedAt: '2022-03-30T04:34:02.016Z',
            },
            {
              location: 'Australia',
              createdAt: '2022-03-30T04:35:49.463Z',
              updatedAt: '2022-03-30T04:35:56.444Z',
            },
            {
              location: 'Australia',
              createdAt: '2022-03-30T04:36:44.472Z',
              updatedAt: '2022-03-30T04:36:55.113Z',
            },
            {
              location: 'Mexico',
              createdAt: '2022-03-30T16:55:28.441Z',
              updatedAt: '2022-03-30T16:55:33.758Z',
            },
            {
              location: 'Australia',
              createdAt: '2022-03-30T23:26:10.916Z',
              updatedAt: '2022-03-30T23:26:19.114Z',
            },
            {
              location: 'Australia',
              createdAt: '2022-03-30T23:31:40.178Z',
              updatedAt: '2022-03-30T23:31:43.986Z',
            },
            {
              location: 'Mexico',
              createdAt: '2022-03-30T23:36:01.653Z',
              updatedAt: '2022-03-30T23:36:04.212Z',
            },
            {
              location: 'Uruguay',
              createdAt: '2022-03-30T23:36:47.794Z',
              updatedAt: '2022-03-30T23:36:50.407Z',
            },
          ],
        }),
      }
    }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}

beforeAll(() => jest.spyOn(window, 'fetch'))
beforeEach(() => window.fetch.mockImplementation(mockFetchPromise))
