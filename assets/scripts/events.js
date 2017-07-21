// Events that fire when things are clicked

const api = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const ui = require('./ui')
const store = require('./store')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .done(ui.signUpSuccess
      // function (response) {
      // const sdata = {
      //   credentials: {
      //     email: data.credentials.email,
      //     password: data.credentials.password
      //   }
      // }
      // api.signIn(sdata)
      //   .done(ui.signInSuccess)
      //   .catch(ui.signInError)
      // }
    )
    .catch(ui.signUpError)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .done(ui.signInSuccess)
    .catch(ui.signInError)
}

const onSignOut = (event) => {
  event.preventDefault()
  if (store.user) {
    api.signOut()
    .done(ui.signOutSuccess)
    .catch(ui.signOutError)
  } else {
  }
}

const onChangePassword = (event) => {
  event.preventDefault()
  if (store.user) {
    const data = getFormFields(event.target)
    api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .catch(ui.changePasswordError)
  } else {
  }
}

const onAddMeal = (event) => {
  event.preventDefault()
  if (store.user) {
    const data = getFormFields(event.target)
    api.addMeal(data)
    .done(ui.addMealSuccess)
    .catch(ui.addMealError)
  }
}

const attachHandlers = function () {
  // Auth API events
  $('#-form-signup').on('submit', onSignUp)
  $('#-form-signin').on('submit', onSignIn)
  $('#-form-changepw').on('submit', onChangePassword)
  $('#-button-logout').on('click', onSignOut)
  $('#-form-add-meal').on('submit', onAddMeal)
}

module.exports = {
  attachHandlers
}
