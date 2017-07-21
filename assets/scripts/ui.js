const store = require('./store')

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

const mealListElement = $('#-meal-list')
const mealListTemplate = require('./templates/meal-list.handlebars')

const populateMealList = (meals) => {
  mealListElement.html('')
  console.log('Populating meals list')
  console.log(meals)
  const mealListHTML = mealListTemplate({meals})
  mealListElement.append(mealListHTML)
}

const addMealToList = (meal) => {
  const mealHTML = mealListTemplate({meals: [meal]})
  mealListElement.append(mealHTML)
  // $(mealListElement).children('[data-id="' + meal.id + '"]').attr('active')
  // mealListElement.append('<button type="button" class="list-group-item list-group-item-action" data-id="' + meal.id + '">' + meal.name + '</button>')
}

const addMealSuccess = function (response) {
  console.log('addMealSuccess')
  console.log(response)
  addMealToList(response.meal)
  // store.meal = response.meal // Store meal for use later
  // Add meal to list of meals for user
  // Rename meal list title to this meals name
}

const addMealError = function (response) {
  console.log('addMealError')
  console.log(response)
}

const getMealsSuccess = function (response) {
  console.log('getMealsSuccess')
  console.log(response)
  populateMealList(response.meals)
}

const getMealsError = function (response) {
  console.log('getMealsError')
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
  changePasswordError,
  addMealSuccess,
  addMealError,
  getMealsSuccess,
  getMealsError
}
