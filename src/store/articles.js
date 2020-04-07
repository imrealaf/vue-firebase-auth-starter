import _ from 'lodash';
import { articles } from '@/services/firebase';

const DEFAULT_SORT_FIELD = 'dateCreated';

/**
 * -------------------------------------------------------------------
 *  State
 * -------------------------------------------------------------------
 */
const state = () => ({
  data: null,
  count: 0
});

/**
 * -------------------------------------------------------------------
 *  Mutations
 * -------------------------------------------------------------------
 */
const mutations = {
  /**
   * SET_ARTICLES
   * @description sets the articles array
   * @param {Object} state - the current state
   * @param {Array} data - the data array
   */
  SET_ARTICLES(state, data) {
    state.data = data;
  },

  /**
   * SET_COUNT
   * @description sets the total articles count
   * @param {Object} state - the current state
   * @param {Number} value - the count value
   */
  SET_COUNT(state, value) {
    state.count = value;
  }
};

/**
 * -------------------------------------------------------------------
 *  Actions
 * -------------------------------------------------------------------
 */
const actions = {
  setData({ commit }, payload) {
    const { result, orderBy } = payload;
    let data = [];
    result.forEach((doc) => {
      const { id } = doc;
      data.push({ id, ...doc.data() });
    });

    if (orderBy) {
      data = data.sort((a, b) => b[orderBy] - a[orderBy]);
    }

    commit('SET_ARTICLES', data);
    commit('SET_COUNT', data.length);

    return data;
  },

  async getAll({ dispatch }, payload) {
    const { orderBy } = payload;

    try {
      let query = await articles.get();
      dispatch('setData', {
        query,
        orderBy: orderBy || DEFAULT_SORT_FIELD
      });
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
  },

  async getAllByUserId({ dispatch }, payload) {
    const { userId, orderBy, isPublished } = payload;

    // Build query ..
    let query = articles.where('userId', '==', userId);
    if (isPublished) {
      query = query.where('isPublished', '==', isPublished);
    }

    // Execute query ..
    try {
      let result = await query.get();
      const data = dispatch('setData', {
        result,
        orderBy: orderBy || DEFAULT_SORT_FIELD
      });

      return data;
    } catch (error) {
      console.log('Error getting documents: ', error);
      return error;
    }
  },

  async getById(id) {
    try {
      let query = articles.doc(id).get();
      console.log(query);
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
