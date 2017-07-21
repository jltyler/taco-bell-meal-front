const store = require('./store')
const api = require('./api')

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

const selectMeal = function (event) {
  console.log('selectMeal')
  console.log('ID: ', event.target.dataset.id)
  // console.log('Event:', event.target)
  mealTitleElement.text($(event.target).text()) // Rename meal list title to this meals name
  store.meal = event.target.dataset.id
  // Populate Meal Item list
}

const removeMeal = function (event) {
  console.log('removeMeal')
  console.log('ID: ', event.target.dataset.id)
  store.deleting = event.target.dataset.id
  api.deleteMeal(event.target.dataset.id)
  .done(deleteMealSuccess)
  .catch(deleteMealError)
}

const mealListElement = $('#-meal-list')
const mealListTemplate = require('./templates/meal-list.handlebars')
const mealTitleElement = $('#-meal-title')

const populateMealList = (meals) => {
  mealListElement.html('')
  console.log('Populating meals list')
  console.log(meals)
  const mealListHTML = mealListTemplate({meals})
  mealListElement.append(mealListHTML)
  $('.meal-button').on('click', selectMeal)
  $('.meal-button-delete').on('click', removeMeal)
}

const addMealToList = (meal) => {
  const mealHTML = mealListTemplate({meals: [meal]})
  mealListElement.append(mealHTML)
  // $(mealListElement).children('[data-id="' + meal.id + '"]').addClass('active')
  // mealListElement.append('<button type="button" class="list-group-item list-group-item-action" data-id="' + meal.id + '">' + meal.name + '</button>')
}

const addMealSuccess = function (response) {
  console.log('addMealSuccess')
  console.log(response)
  addMealToList(response.meal) // Add meal to list of meals in the DOM
  store.meal = response.meal.id // Store meal for use later
  mealTitleElement.text(response.meal.name) // Rename meal list title to this meals name
  // Populate Meal Item list
}

const addMealError = function (response) {
  console.log('addMealError')
  console.log(response)
}

const getMealsSuccess = function (response) {
  console.log('getMealsSuccess')
  console.log(response)
  populateMealList(response.meals) // Add meals to list in the DOM
}

const getMealsError = function (response) {
  console.log('getMealsError')
  console.log(response)
}

const deleteMealSuccess = function (response) {
  console.log('deleteMealSuccess')
  console.log(response)
  console.log($('[data-id=' + store.deleting + ']'))
  $('[data-id=' + store.deleting + ']').remove() // Remove the item clicked
}

const deleteMealError = function (response) {
  console.log('deleteMealError')
  console.log(response)
}

const renameMealSuccess = function (response) {
  console.log('renameMealSuccess')
  console.log(response)
  const meal = response.meal
  mealTitleElement.text(meal.name)
  $('.meal-button[data-id=' + meal.id + ']').text(meal.name)
  $('#-form-rename-meal input').val('')
}

const renameMealError = function (response) {
  console.log('renameMealError')
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
  getMealsError,
  deleteMealSuccess,
  deleteMealError,
  renameMealSuccess,
  renameMealError
}
