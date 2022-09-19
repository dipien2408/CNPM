import Api from './Api'

const FeelingService = {
  checkFeeling(data) {
    return Api.post('feelings/check', data)
  },
  createFeeling(data) {
    return Api.post('feelings', data)
  },
  getLikedPosts(page) {
    return Api.get('feelings/posts', {
      params: {
        page,
        limit: 12
      }
    })
  }
}

export default FeelingService;
