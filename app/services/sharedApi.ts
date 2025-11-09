import httpClient from '~/services/httpClient'

export const sharedApi = {
  // Category
  getNameAndIdOfAllCategories: (): Promise<any> => {
    return httpClient
      .get('/short')
      .then((res) => res.data)
      .then((data) => data?.categories ?? data)
  }
}
