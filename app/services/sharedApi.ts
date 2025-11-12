import httpClient from '~/services/httpClient'

export const sharedApi = {
  // Category
  getNameAndIdOfAllCategories: (): Promise<any> => {
    return httpClient
      .get('/Category/short')
      .then((res) => res.data.value)
      .then((data) => data?.categories ?? data)
  }
}
