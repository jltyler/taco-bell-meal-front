const store = require('../store')
const mealsApi = require('../api/meals')

const selectMeal = function (event) {
  console.log('selectMeal')
  const mealId = event.target.dataset.id
  console.log('ID: ', mealId)
  // console.log('Event:', event.target)
   // API call to get meal items
   // Populate Meal Item list
  mealsApi.getMealItems(mealId)
  .done(function (response) {
    getMealItemsSuccess(response)
    // Rename meal list title to this meals name
    mealTitleElement.text($(event.target).text())
    store.meal = mealId
  })
  .catch(getMealItemsError)
}

const removeMeal = function (event) {
  console.log('removeMeal')
  console.log('ID: ', event.target.dataset.id)
  store.deleting = event.target.dataset.id
  mealsApi.deleteMeal(event.target.dataset.id)
  .done(deleteMealSuccess)
  .catch(deleteMealError)
}

const mealListElement = $('#-meal-list')
const mealListTemplate = require('../templates/meal-list.handlebars')
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
  // console.log($('[data-id=' + store.deleting + ']'))
  $('.meal-button[data-id=' + store.deleting + ']').remove() // Remove the item clicked
  $('.meal-button-delete[data-id=' + store.deleting + ']').remove()
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

const mealItemsElement = $('#-meal-items-list')
const mealItemsTemplate = require('../templates/meal-items.handlebars')

const populateMealItems = function (items) {
  mealItemsElement.html('')
  const mealItemsHTML = mealItemsTemplate({items}) // Use template to get HTML element(s)
  mealItemsElement.append(mealItemsHTML)
  $('.meal-item-button-delete').on('click', onDeleteMealItem)
}

// const onGetMealItems = (event) => {
//   event.preventDefault()
//   if (store.user && store.meal) {
//     mealsApi.getMealItems()
//     .done(getMealItemsSuccess)
//     .catch(getMealItemsError)
//   }
// }

const getMealItemsSuccess = function (response) {
  console.log('getMealItemsSuccess')
  console.log(response)
  // Populate meal items list
  populateMealItems(response.menu_items)
}

const getMealItemsError = function (response) {
  console.log('getMealItemsError')
  console.log(response)
}

const menuItemsElement = $('#-menu-items-list')
const menuItemsTemplate = require('../templates/menu-items.handlebars')

const onAddMealItem = (event) => {
  event.preventDefault()
  console.log('onAddMealItem: ', event)
  if (store.user && store.meal) {
    const menuId = event.target.dataset.id
    console.log('Menu ID: ', menuId)
    mealsApi.addMealItem(menuId)
    .done(function (response) {
      addMealItemSuccess(response)
      // Use template to get HTML element(s)
      const mealItemsHTML = mealItemsTemplate({items: [{
        id: menuId,
        name: $('.menu-item[data-id=' + menuId + ']').text()
      }]})
      mealItemsElement.append(mealItemsHTML)
    })
    .catch(addMealItemError)
  }
}

const populateMenuItems = function (items) {
  menuItemsElement.html('')
  const menuItemsHTML = menuItemsTemplate({items}) // Use template to get HTML element(s)
  menuItemsElement.append(menuItemsHTML)
  // Attach add item event to menu items button
  $('.menu-button-add').on('click', onAddMealItem)
}

const getMenuItemsSuccess = function (response) {
  console.log('getMenuItemsSuccess')
  console.log(response)
  populateMenuItems(response.menu_items)
}

const getMenuItemsError = function (response) {
  console.log('getMenuItemsError')
  console.log(response)
}

const addMealItemSuccess = function (response) {
  console.log('addMealItemSuccess')
  console.log(response)
}

const addMealItemError = function (response) {
  console.log('addMealItemError')
  console.log(response)
}

const onDeleteMealItem = (event) => {
  event.preventDefault()
  console.log('onDeleteMealItem: ', event)
  if (store.user && store.meal) {
    const menuId = event.target.dataset.id
    console.log('Menu ID: ', menuId)
    mealsApi.deleteMealItem(menuId)
    .done(function (response) {
      deleteMealItemSuccess(response)
      // $('meal-item[data-id=' + menuId + ']').remove()
      $(event.target).parent().remove()
      // $('meal-item-button-delete[data-id=' + menuId + ']').remove()
    })
    .catch(deleteMealItemError)
  }
}

const deleteMealItemSuccess = function (response) {
  console.log('deleteMealItemSuccess')
  console.log(response)
}

const deleteMealItemError = function (response) {
  console.log('deleteMealItemError')
  console.log(response)
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
  getMenuItemsError
}
