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

const onGetMeals = (event) => {
  event.preventDefault()
  if (store.user) {
    api.getMeals()
    .done(ui.getMealsSuccess)
    .catch(ui.getMealsError)
  }
}

const onRenameMeal = (event) => {
  event.preventDefault()
  if (store.user && store.meal) {
    const data = getFormFields(event.target)
    api.updateMeal(data)
    .done(ui.renameMealSuccess)
    .catch(ui.renameMealError)
  }
}

const onGetMealItems = (event) => {
  event.preventDefault()
  if (store.user && store.meal) {
    const data = getFormFields(event.target)
    api.updateMeal(data)
    .done(ui.getMealItemsSuccess)
    .catch(ui.getMealItemsError)
  }
}

const attachHandlers = function () {
  // Auth API events
  $('#-form-signup').on('submit', onSignUp)
  $('#-form-signin').on('submit', onSignIn)
  $('#-form-changepw').on('submit', onChangePassword)
  $('#-button-logout').on('click', onSignOut)
  $('#-form-add-meal').on('submit', onAddMeal)
  $('#-button-get-meals').on('click', onGetMeals)
  $('#-form-rename-meal').on('submit', onRenameMeal)
}

module.exports = {
  attachHandlers
}
