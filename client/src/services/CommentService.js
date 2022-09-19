import Api from './Api'

const CommentService = {
  getCommentByPostId(filters) {
    return Api.get(`comments/${filters}/posts`)
  },
  createComment(data) {
    return Api.post('comments', data)
  },
  updateComment(id, data) {
    return Api.put(`comments/${id}`, data)
  },
  deleteById(id) {
    return Api.delete(`comments/${id}`)
  }
}

export default CommentService;
