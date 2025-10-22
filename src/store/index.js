// src/store/index.js
import { createStore } from 'vuex'

// 创建store实例
export default createStore({
  state: {
    user: null,
    isLoggedIn: false,
    movies: [
      { id: 1, title: "肖申克的救赎", year: 1994, rating: 9.7, genres: ["剧情", "犯罪"] },
      { id: 2, title: "教父", year: 1972, rating: 9.2, genres: ["剧情", "犯罪"] },
      { id: 3, title: "教父2", year: 1974, rating: 9.0, genres: ["剧情", "犯罪"] },
      { id: 4, title: "黑暗骑士", year: 2008, rating: 9.0, genres: ["动作", "犯罪", "剧情"] },
      { id: 5, title: "12怒汉", year: 1957, rating: 8.9, genres: ["剧情"] }
    ],
    searchQuery: '',
    selectedMovies: [],
    customRankings: [
      { id: 1, name: "我的最爱", movies: [1, 2] }
    ]
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isLoggedIn = !!user
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    ADD_SELECTED_MOVIE(state, movie) {
      const exists = state.selectedMovies.some(m => m.id === movie.id)
      if (!exists) {
        state.selectedMovies.push(movie)
      }
    },
    REMOVE_SELECTED_MOVIE(state, movieId) {
      state.selectedMovies = state.selectedMovies.filter(m => m.id !== movieId)
    },
    CLEAR_SELECTED_MOVIES(state) {
      state.selectedMovies = []
    },
    ADD_CUSTOM_RANKING(state, ranking) {
      state.customRankings.push(ranking)
    }
  },
  actions: {
    login({ commit }, user) {
      commit('SET_USER', user)
    },
    logout({ commit }) {
      commit('SET_USER', null)
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query)
    },
    addSelectedMovie({ commit }, movie) {
      commit('ADD_SELECTED_MOVIE', movie)
    },
    removeSelectedMovie({ commit }, movieId) {
      commit('REMOVE_SELECTED_MOVIE', movieId)
    },
    clearSelectedMovies({ commit }) {
      commit('CLEAR_SELECTED_MOVIES')
    },
    addCustomRanking({ commit }, ranking) {
      commit('ADD_CUSTOM_RANKING', ranking)
    }
  },
  getters: {
    filteredMovies: (state) => {
      if (!state.searchQuery) return state.movies
      
      return state.movies.filter(movie => 
        movie.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        movie.genres.some(genre => 
          genre.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      )
    },
    getUser: (state) => state.user,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getSelectedMovies: (state) => state.selectedMovies,
    getCustomRankings: (state) => state.customRankings
  }
})



