import Api from './Api'

const SearchService = {
  search(page, data) {
    return Api.post(`search?page=${page}`, data)
  }
}

export default SearchService;
