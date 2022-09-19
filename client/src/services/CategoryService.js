import Api from './Api'

const CategoryService = {
  getAll() {
    return Api.get(`categories`)
  }
}

export default CategoryService;
