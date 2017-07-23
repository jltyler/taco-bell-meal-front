const store = require('../store')

const signUpSuccess = function (response) {
  console.log('signUpSuccess!')
  console.log(response)
}

const signUpError = function (response) {
  console.log('signUpError!')
  console.log(response)
}

const signInSuccess = function (response) {
  console.log('signInSuccess!')
  console.log(response)
  store.user = response.user
  console.log('store.user:', store.user)
  // Grab meals list

  // Grab menu list
}

const signInError = function (response) {
  console.log('signInError!')
  console.log(response)
}

const signOutSuccess = function (response) {
  console.log('signOutSuccess!')
  console.log(response)
  store.user = undefined
  console.log('store.user:', store.user)
}

const signOutError = function (response) {
  console.log('signOutError!')
  console.log(response)
}

const changePasswordSuccess = function (response) {
  console.log('changePasswordSuccess!')
  console.log(response)
}

const changePasswordError = function (response) {
  console.log('changePasswordError!')
  console.log(response)
}

module.exports = {
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError,
  changePasswordSuccess,
  changePasswordError
}
