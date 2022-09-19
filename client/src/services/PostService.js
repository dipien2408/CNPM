import Api from './Api'

const PostService = {
  getAll(data, params) {
    return Api.get(`posts/${data}`, {
      params
    })
  },
  getById(id) {
    return Api.get(`posts/${id}`)
  },
  uploadPost(data, optional) {
    return Api.post('posts', data, optional)
  },
  updatePost(id, data) {
    return Api.put(`posts/${id}`, data)
  },
  updateViews(id) {
    return Api.put(`posts/${id}/views`)
  },
  deleteById(id) {
    return Api.delete(`posts/${id}`)
  }
}

export default PostService;
