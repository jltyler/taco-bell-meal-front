// Events that fire when things are clicked

const authApi = require('./api/auth')
const mealsApi = require('./api/meals')
const getFormFields = require('../../lib/get-form-fields')
const authUi = require('./ui/auth')
const mealsUi = require('./ui/meals')
const store = require('./store')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.signUp(data)
    .done(authUi.signUpSuccess
      // function (response) {
      // const sdata = {
      //   credentials: {
      //     email: data.credentials.email,
      //     password: data.credentials.password
      //   }
      // }
      // authApi.signIn(sdata)
      //   .done(authUi.signInSuccess)
      //   .catch(authUi.signInError)
      // }
    )
    .catch(authUi.signUpError)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.signIn(data)
    .done(authUi.signInSuccess)
    .catch(authUi.signInError)
}

const onSignOut = (event) => {
  event.preventDefault()
  if (store.user) {
    authApi.signOut()
    .done(authUi.signOutSuccess)
    .catch(authUi.signOutError)
  } else {
  }
}

const onChangePassword = (event) => {
  event.preventDefault()
  if (store.user) {
    const data = getFormFields(event.target)
    authApi.changePassword(data)
    .done(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordError)
  } else {
  }
}

const onAddMeal = (event) => {
  event.preventDefault()
  if (store.user) {
    const data = getFormFields(event.target)
    mealsApi.addMeal(data)
    .done(mealsUi.addMealSuccess)
    .catch(mealsUi.addMealError)
  }
}

const onGetMeals = (event) => {
  event.preventDefault()
  if (store.user) {
    mealsApi.getMeals()
    .done(mealsUi.getMealsSuccess)
    .catch(mealsUi.getMealsError)
  }
}

const onRenameMeal = (event) => {
  event.preventDefault()
  if (store.user && store.meal) {
    const data = getFormFields(event.target)
    mealsApi.updateMeal(data)
    .done(mealsUi.renameMealSuccess)
    .catch(mealsUi.renameMealError)
  }
}

const onGetMealItems = (event) => {
  event.preventDefault()
  if (store.user && store.meal) {
    mealsApi.updateMeal()
    .done(mealsUi.getMealItemsSuccess)
    .catch(mealsUi.getMealItemsError)
  }
}

const onGetMenuItems = (event) => {
  event.preventDefault()
  if (store.user) {
    mealsApi.getMenuItems()
    .done(mealsUi.getMenuItemsSuccess)
    .catch(mealsUi.getMenuItemsError)
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
  $('#-button-get-menu').on('click', onGetMenuItems)
}

module.exports = {
  attachHandlers
}
