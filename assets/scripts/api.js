// Holds functions to help with the AJAX calls to the back-end

const config = require('./config')
const store = require('./store')

const signUp = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const addMeal = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/meals',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const getMeals = () => {
  return $.ajax({
    url: config.apiOrigin + '/meals',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const deleteMeal = (mealId) => {
  return $.ajax({
    url: config.apiOrigin + '/meals/' + mealId,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const updateMeal = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/meals/' + store.meal,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const getMealItems = (mealId) => {
  return $.ajax({
    url: config.apiOrigin + '/meal-items/' + mealId,
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const getMenuItems = () => {
  return $.ajax({
    url: config.apiOrigin + '/menu-items',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const addMealItem = (menuItemId) => {
  return $.ajax({
    url: config.apiOrigin + '/add-item/' + store.meal,
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    dataType: 'json text',
    data: {
      meal: {
        menu_item_id: menuItemId
      }
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  addMeal,
  getMeals,
  deleteMeal,
  updateMeal,
  getMealItems,
  getMenuItems,
  addMealItem
}
