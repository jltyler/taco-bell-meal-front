const store = require('../store')

const signUpSuccess = function (response) {
  // console.log('signUpSuccess!')
  // console.log(response)
}

const signUpError = function (response) {
  // console.log('signUpError!')
  // console.log(response)
  $('#-signup-error').removeClass('hidden')
}

const clearForms = function () {
  $('.form-control').val('')
}

const signUpFormClear = function () {
  // $('#-signin-modal-form input').val('')
  clearForms()
  $('#-signin-error').addClass('hidden')
  $('#-signup-error').addClass('hidden')
}

const signInSuccess = function (response) {
  // console.log('signInSuccess!')
  // console.log(response)
  store.user = response.user
  // console.log('store.user:', store.user)
  $('#-signup-modal').modal('hide')
  $('#-signup-button').addClass('hidden')
  $('#-logout-button').removeClass('hidden')
  $('#-options-button').removeClass('hidden')
  $('#-changepwd-button').removeClass('hidden')
  $('.meal-div').removeClass('hidden')
  $('.meal-items-div').removeClass('hidden')
  $('.signin-to-continue').addClass('hidden')
}

const signInError = function (response) {
  // console.log('signInError!')
  // console.log(response)
  $('#-signin-error').removeClass('hidden')
}

const signOutSuccess = function (response) {
  // console.log('signOutSuccess!')
  // console.log(response)
  store.user = undefined
  store.meal = undefined
  // console.log('store.user:', store.user)
  $('#-signup-button').removeClass('hidden')
  $('#-logout-button').addClass('hidden')
  $('#-options-button').addClass('hidden')
  $('#-changepwd-button').addClass('hidden')
  $('#-meal-list').html('')
  $('.meal-div').addClass('hidden')
  $('.meal-items-div').addClass('hidden')
  $('.signin-to-continue').removeClass('hidden')
  $('#-meal-items-list').html('')
  $('#-meal-title h1').text('No meal selected!')
  $('#-meal-items-price').addClass('hidden')
  $('#-renamemeal-button').addClass('hidden')
  $('#-menu-items-list').addClass('hidden')
  $('#-menu-instruct').removeClass('hidden')
}

const signOutError = function (response) {
  // console.log('signOutError!')
  // console.log(response)
}

const changePasswordFormClear = function () {
  clearForms()
  $('#-changepwd-error').addClass('hidden')
}

const changePasswordSuccess = function (response) {
  // console.log('changePasswordSuccess!')
  // console.log(response)
  $('#-changepwd-modal').modal('hide')
}

const changePasswordError = function (response) {
  // console.log('changePasswordError!')
  // console.log(response)
  $('#-changepwd-error').removeClass('hidden')
}

module.exports = {
  signUpSuccess,
  signUpError,
  signUpFormClear,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError,
  changePasswordFormClear,
  changePasswordSuccess,
  changePasswordError
}
