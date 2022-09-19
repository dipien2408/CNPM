import Api from './Api'

const AuthenticationService = {
  signIn(credentials) {
    return Api.post('auth/login', credentials)
  },
  signUp(data) {
    return Api.post('auth/register', data)
  },
  updateUserDetails(data) {
    return Api.put('auth/updatedetails', data)
  },
  updatePassword(data) {
    return Api.put('auth/updatepassword', data)
  },
  me(token) {
    console.log(token)
    return Api.post('auth/me', {
      headers: { 'Authorization': 'Bearer ' + token },
    })
  },
  logout() {
    return Api.post('auth/logout')
  }
}

export default AuthenticationService;
