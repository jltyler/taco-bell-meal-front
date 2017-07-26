const store = require('../store')
const mealsApi = require('../api/meals')

const bellSound = document.getElementById('-bell-snd')
bellSound.load()
const yoquieroSound = document.getElementById('-yoquiero-snd')
yoquieroSound.load()

const choose = function (choices) {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

const animateChihuahua = function () {
  const choice = choose(['chihuahua-right', 'chihuahua', 'chihuahua-bottom'])
  // $('.chihuahua-right').addClass('chihuahua-right-active')
  // setTimeout(function () { $('.chihuahua-right').removeClass('chihuahua-right-active') }, 1800)
  $('.' + choice).addClass(choice + '-active')
  setTimeout(function () { $('.' + choice).removeClass(choice + '-active') }, 1800)
}

// MEALS

const mealListElement = $('#-meal-list')
const mealListTemplate = require('../templates/meal-list.handlebars')
const mealTitleElement = $('#-meal-title').find('h1')

const selectMeal = function (event) {
  // console.log('selectMeal')
  const mealId = event.target.dataset.id
  // console.log('ID: ', mealId)
  // console.log('Event:', event.target)
   // API call to get meal items
   // Populate Meal Item list
  mealsApi.getMealItems(mealId)
  .done(function (response) {
    getMealItemsSuccess(response)
    // Rename meal list title to this meals name
    mealTitleElement.text($(event.target).text())
    store.meal = mealId
    $('#-renamemeal-button').removeClass('hidden')
    yoquieroSound.play()
    animateChihuahua()
  })
  .catch(getMealItemsError)
}

const removeMeal = function (event) {
  // console.log('removeMeal')
  // console.log('ID: ', event.target.dataset.id)
  store.deleting = event.target.dataset.id
  mealsApi.deleteMeal(event.target.dataset.id)
  .done(deleteMealSuccess)
  .catch(deleteMealError)
}

const clearMealList = function () {
  mealListElement.html('')
}

const populateMealList = (meals) => {
  clearMealList()
  // console.log('Populating meals list')
  // console.log(meals)
  const mealListHTML = mealListTemplate({meals})
  mealListElement.append(mealListHTML)
  $('.meal-button').on('click', selectMeal)
  $('.meal-button-delete').on('click', removeMeal)
}

const addMealToList = (meal) => {
  const mealHTML = mealListTemplate({meals: [meal]})
  mealListElement.append(mealHTML)
  $('.meal-button').off('click')
  $('.meal-button').on('click', selectMeal)
  $('.meal-button-delete').off('click')
  $('.meal-button-delete').on('click', removeMeal)
  // $(mealListElement).children('[data-id="' + meal.id + '"]').addClass('active')
  // mealListElement.append('<button type="button" class="list-group-item list-group-item-action" data-id="' + meal.id + '">' + meal.name + '</button>')
}

const clearAddMealForm = function () {
  $('#-addmeal-modal-form input').val('')
  $('#-addmeal-error').addClass('hidden')
}

const addMealSuccess = function (response) {
  // console.log('addMealSuccess')
  // console.log(response)
  addMealToList(response.meal) // Add meal to list of meals in the DOM
  store.meal = response.meal.id // Store meal for use later
  mealTitleElement.text(response.meal.name) // Rename meal list title to this meals name
  $('#-renamemeal-button').removeClass('hidden')
  clearAddMealForm()
  $('#-addmeal-modal').modal('hide')

  yoquieroSound.play()
  animateChihuahua()
  // clear Meal Item list
  clearMealItems()
  updateMealPrice()
}

const addMealError = function (response) {
  // console.log('addMealError')
  // console.log(response)
  $('#-addmeal-error').removeClass('hidden')
}

const getMealsSuccess = function (response) {
  // console.log('getMealsSuccess')
  // console.log(response)
  populateMealList(response.meals) // Add meals to list in the DOM
}

const getMealsError = function (response) {
  // console.log('getMealsError')
  // console.log(response)
}

const deleteMealSuccess = function (response) {
  // console.log('deleteMealSuccess')
  // console.log(response)
  // console.log($('[data-id=' + store.deleting + ']'))
  // console.log('store.deleting: ' + store.deleting)
  // console.log('store.meal: ' + store.meal)
  if (store.deleting !== undefined && parseInt(store.deleting) === parseInt(store.meal)) {
    // console.log('Meal ' + store.meal + ' was selected!')
    mealTitleElement.text('No meal selected!')
    clearMealItems()
    store.meal = undefined
    $('#-renamemeal-button').addClass('hidden')
    mealItemsPriceElement.addClass('hidden')
  }
  $('.meal-div[data-id=' + store.deleting + ']').remove() // Remove the item clicked
  store.deleting = undefined
}

const deleteMealError = function (response) {
  // console.log('deleteMealError')
  // console.log(response)
}

const clearRenameMealForm = function () {
  $('#-renamemeal-modal-form input').val('')
  $('#-renamemeal-error').addClass('hidden')
}

const renameMealSuccess = function (response) {
  // console.log('renameMealSuccess')
  // console.log(response)
  const meal = response.meal
  mealTitleElement.text(meal.name)
  $('.meal-button[data-id=' + meal.id + ']').text(meal.name)
  // $('#-form-rename-meal input').val('')
  clearRenameMealForm()
  $('#-renamemeal-modal').modal('hide')
}

const renameMealError = function (response) {
  // console.log('renameMealError')
  // console.log(response)
  $('#-renamemeal-error').removeClass('hidden')
}

// MEAL ITEMS

const mealItemsElement = $('#-meal-items-list')
const mealItemsTemplate = require('../templates/meal-items.handlebars')

const clearMealItems = function () {
  mealItemsElement.html('')
}

const mealItemsPriceElement = $('#-meal-items-price')

const updateMealPrice = function () {
  // console.log('updateMealPrice')
  let sumTotal = 0
  mealItemsElement.children().each(function (i, e) {
    sumTotal += parseFloat($(e).data('cost'))
  })
  // console.log('Total: ', sumTotal)
  mealItemsPriceElement.removeClass('hidden')
  mealItemsPriceElement.text('Total: $' + sumTotal.toFixed(2))
}

const populateMealItems = function (items) {
  clearMealItems()
  const mealItemsHTML = mealItemsTemplate({items}) // Use template to get HTML element(s)
  mealItemsElement.append(mealItemsHTML)
  $('.meal-item-button-delete').on('click', onDeleteMealItem)
  updateMealPrice()
}

const getMealItemsSuccess = function (response) {
  // console.log('getMealItemsSuccess')
  // console.log(response)
  // Populate meal items list
  populateMealItems(response.menu_items)
}

const getMealItemsError = function (response) {
  // console.log('getMealItemsError')
  // console.log(response)
}

const onAddMealItem = (event) => {
  event.preventDefault()
  // console.log('onAddMealItem: ', event)
  if (store.user && store.meal) {
    const menuId = event.target.dataset.id
    // console.log('Menu ID: ', menuId)
    mealsApi.addMealItem(menuId)
    .done(addMealItemSuccess)
    .catch(addMealItemError)
  }
}

const addMealItemSuccess = function (response) {
  // console.log('addMealItemSuccess')
  // console.log(response)
  // console.log(response.menu_item)
  const mealItemsHTML = mealItemsTemplate({items: [response.menu_item]})
  mealItemsElement.append(mealItemsHTML)
  $('.meal-item-button-delete').off('click')
  $('.meal-item-button-delete').on('click', onDeleteMealItem)
  updateMealPrice()
  bellSound.play()
}

const addMealItemError = function (response) {
  // console.log('addMealItemError')
  // console.log(response)
}

const onDeleteMealItem = (event) => {
  event.preventDefault()
  // console.log('onDeleteMealItem: ', event)
  if (store.user && store.meal) {
    const menuId = event.target.dataset.id
    // console.log('Menu ID: ', menuId)
    mealsApi.deleteMealItem(menuId)
    .done(function (response) {
      $(event.target).closest('.meal-item').remove()
      deleteMealItemSuccess(response)
    })
    .catch(deleteMealItemError)
  }
}

const deleteMealItemSuccess = function (response) {
  // console.log('deleteMealItemSuccess')
  // console.log(response)
  updateMealPrice()
}

const deleteMealItemError = function (response) {
  // console.log('deleteMealItemError')
  // console.log(response)
}

// MENU ITEMS

const menuItemsElement = $('#-menu-items-list')
const menuItemsTemplate = require('../templates/menu-items.handlebars')

const populateMenuItems = function (items) {
  menuItemsElement.html('')
  const menuItemsHTML = menuItemsTemplate({items}) // Use template to get HTML element(s)
  menuItemsElement.append(menuItemsHTML)
  // Attach add item event to menu items button
  $('.menu-button-add').on('click', onAddMealItem)
}

const getMenuItemsSuccess = function (response) {
  // console.log('getMenuItemsSuccess')
  // console.log(response)
  populateMenuItems(response.menu_items)
}

const getMenuItemsError = function (response) {
  // console.log('getMenuItemsError')
  // console.log(response)
}

module.exports = {
  addMealSuccess,
  addMealError,
  getMealsSuccess,
  getMealsError,
  deleteMealSuccess,
  deleteMealError,
  renameMealSuccess,
  renameMealError,
  getMealItemsSuccess,
  getMealItemsError,
  getMenuItemsSuccess,
  getMenuItemsError,
  clearAddMealForm,
  clearRenameMealForm
}
