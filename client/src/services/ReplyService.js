import Api from './Api'

const ReplyService = {
  createReply(data) {
    return Api.post('replies', data)
  },
  updateReply(id, data) {
    return Api.put(`replies/${id}`, data)
  },
  deleteById(id) {
    return Api.delete(`replies/${id}`)
  }
}

export default ReplyService;
