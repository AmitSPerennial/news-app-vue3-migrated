// import Vue from "vue";
// import Vuex from "vuex";
import { createStore } from 'vuex'
import CountriesData from "../data/countries.json";
import { getBaseUrl } from "../constant";

export const store = createStore({
  state: {
    country: CountriesData,
    categories: {
      business: "business",
      entertainment: "entertainment",
      general: "general",
      health: "health",
      science: "science",
      sports: "sports",
      technology: "technology",
    },
    selectedBookmarks: [],
    newsData: [],
    selectedCategory: "",
    selectedCountry: "IN",
    searchQuery: "",
    totalResults: 0,
    popupNewsData: {},
    displayNewsDetailsPopup: false,
  },
  getters: {
    getCountriesData: (state) => {
      return state.country;
    },
    getCategoriesData: (state) => {
      return state.categories;
    },
    getNewsData: (state) => {
      return JSON.parse(JSON.stringify(state.newsData));
    },
    getBookmarksData: (state) => {
      return state.selectedBookmarks;
    },
    getBookmarksCount: (state) => {
      return state.selectedBookmarks.length;
    },
    getNewsCount: (state) => {
      return state.totalResults;
    },
  },
  mutations: {
    getCountriesData: (state) => {
      return state.country;
    },
    getCategoriesData: (state) => {
      return state.categories;
    },
    getNewsData: (state) => {
      return JSON.parse(JSON.stringify(state.newsData));
    },
    getBookmarksData: (state) => {
      return state.selectedBookmarks;
    },
    getBookmarksCount: (state) => {
      return state.selectedBookmarks.length;
    },
    getNewsCount: (state) => {
      return state.totalResults;
    },
    saveBookmark: (state, payload) => {
      let bookmark = state.selectedBookmarks;
      return (state.selectedBookmarks = [...bookmark, payload]);
    },
    removeBookmark: (state, payload) => {
      let bookmarks = state.selectedBookmarks;
      return state.selectedBookmarks.splice(
        bookmarks.findIndex((a) => a.title === payload),
        1
      );
    },
    fetchNewsData: (state) => {
      let selectedCategory = state.selectedCategory;
      let selectedCountry = state.selectedCountry;
      let searchQuery = state.searchQuery;
      let baseUrl = getBaseUrl(selectedCountry, selectedCategory, searchQuery);
      fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
          state.totalResults = data?.totalResults;
          state.newsData = data?.articles;
        });
    },
    fetchTopHeadlines: (state) => {
      let baseUrl = getBaseUrl();
      fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
          state.totalResults = data?.totalResults;
          state.newsData = data?.articles;
        });
    },
    handleCategoryChange: (state, payload) => {
      return (state.selectedCategory = payload);
    },
    handleCountryChange: (state, payload) => {
      return (state.selectedCountry = payload);
    },
    handleInputChange: (state, payload) => {
      return (state.searchQuery = payload);
    },
    updatePopupNewsData: (state, payload) => {
      return (state.popupNewsData = payload);
    },
    handleNewsDisplayPopup: (state, payload) => {
      return (state.displayNewsDetailsPopup = payload);
    },
    fetchMoreNews: (state, payload) => {
      let selectedCategory = state.selectedCategory;
      let selectedCountry = state.selectedCountry;
      let searchQuery = state.searchQuery;
      let oldNewsData = state.newsData;

      let baseUrl = getBaseUrl(
        selectedCountry,
        selectedCategory,
        searchQuery,
        payload
      );
      fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
          state.newsData = oldNewsData.concat(data?.articles);
        });
    },
  },
  actions: {
    addBookmark: ({ commit }, payload) => {
      commit("saveBookmark", payload);
    },
    removeBookmark: ({ commit }, payload) => {
      commit("removeBookmark", payload);
    },
    fetchNewsData: ({ commit }) => {
      commit("fetchNewsData");
    },
    fetchTopHeadlines: ({ commit }) => {
      commit("fetchTopHeadlines");
    },
    handleCategoryChange: ({ commit }, payload) => {
      commit("handleCategoryChange", payload);
    },
    handleCountryChange: ({ commit }, payload) => {
      commit("handleCountryChange", payload);
    },
    handleInputChange: ({ commit }, payload) => {
      commit("handleInputChange", payload);
    },
    updatePopupNewsData: ({ commit }, payload) => {
      commit("updatePopupNewsData", payload);
      commit("handleNewsDisplayPopup", true);
    },
    handleNewsDisplayPopup: ({ commit }) => {
      commit("handleNewsDisplayPopup", false);
    },
    fetchMoreNews: ({ commit }, payload) => {
      commit("fetchMoreNews", payload);
    },
  },
});
