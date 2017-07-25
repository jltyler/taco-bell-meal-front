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
    .done([authUi.signUpSuccess,
      function (response) {
        authApi.signIn(data)
          .done([authUi.signInSuccess,
            function (response) {
              mealsApi.getMeals()
              .done(mealsUi.getMealsSuccess)
              .catch(mealsUi.getMealsError)
            }])
          .catch(authUi.signInError)
      }])
    .catch(authUi.signUpError)
}

const onSignIn = (event) => {
  console.log('onSignIn')
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.signIn(data)
    .done([authUi.signInSuccess,
      function (response) {
        console.log('Sign in success. Getting meals...')
        mealsApi.getMeals()
        .done(mealsUi.getMealsSuccess)
        .catch(mealsUi.getMealsError)
      }
    ])
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
  // event.preventDefault()
  mealsApi.getMenuItems()
  .done(mealsUi.getMenuItemsSuccess)
  .catch(mealsUi.getMenuItemsError)
}

const attachHandlers = function () {
  // Auth API events
  // $('#-form-signup').on('submit', onSignUp)
  $('#-signup-modal-form').on('submit', onSignUp)
  // $('#-form-signin').on('submit', onSignIn)
  $('#-signin-modal-form').on('submit', onSignIn)
  $('#-signup-modal').on('hidden.bs.modal', authUi.signUpFormClear)
  // $('#-form-changepw').on('submit', onChangePassword)
  $('#-changepwd-modal-form').on('submit', onChangePassword)
  $('#-changepwd-modal').on('hidden.bs.modal', authUi.changePasswordFormClear)
  $('#-logout-button').on('click', onSignOut)
  // $('#-form-add-meal').on('submit', onAddMeal)
  $('#-addmeal-modal-form').on('submit', onAddMeal)
  $('#-button-get-meals').on('click', onGetMeals)
  // $('#-form-rename-meal').on('submit', onRenameMeal)
  $('#-renamemeal-modal-form').on('submit', onRenameMeal)
  // $('#-button-get-menu').on('click', onGetMenuItems)
}

module.exports = {
  attachHandlers,
  onGetMenuItems
}
