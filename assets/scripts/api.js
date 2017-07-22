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

const deleteMeal = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/meals/' + id,
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

const getMealItems = () => {
  return $.ajax({
    url: config.apiOrigin + '/meal-items/' + store.meal,
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
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
  getMealItems
}
