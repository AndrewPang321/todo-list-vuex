import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '@/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    todos: []
  },
  mutations: {
    login(state, user) {
      state.user = user.uid;
    },
    logout(state) {
      state.user = '';
    },
    getTodo(state, { list }) {
      if (list === null) {
        state.todos = [];
      } else {
        state.todos = Object.keys(list).map(key => ({
          // id is the unique key generated from the Firebase
          id: key,
          // Extract the content with the unique key
          ...list[key],
          deleted: false
        }));
      }
    },
    addTodo(state, { value }) {
      state.todos.push(value);
    },
    deleteTodo(state) {
      state.todos = state.todos.filter(item => {
        return item.deleted == false;
      });
    },
    checkDeleteTodo(state, item) {
      item.deleted = !item.deleted;
    },
    cancelDeleteTodo(state) {
      state.todos.forEach(item => {
        return item.deleted = false;
      });
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const user = await api.authenticate(email, password);
        commit('login', user);
      } catch (error) {
        console.log(error);
      }
    },
    async logout({ commit }) {
      try {
        await api.deauthenticate();
        commit('logout');
      } catch (error) {
        console.log(error);
      }
    },
    async getTodo({ commit }) {
      try {
        commit('getTodo', {
          list: await api.list('get')
        });
      } catch (error) {
        console.log(error);
      }
    },
    async addTodo({ commit }, newTodoTitle) {
      const newTodo = {
        title: newTodoTitle,
        checked: false
      };
      try {
        commit('addTodo', {
          value: {
            ...newTodo,
            id: await api.list('add', newTodo),
            deleted: false
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async checkTodo({ commit }, todoItem) {
      try {
        todoItem.checked = !todoItem.checked;
        await api.list('update', {
          id: todoItem.id,
          content: {
            title: todoItem.title,
            checked: todoItem.checked,
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodo({ commit }) {
      try {
        let toBeDeleted = this.state.todos.filter(item => {
          return item.deleted == true;
        });
        toBeDeleted = toBeDeleted.map(item => item.id);
        await api.list('delete', { trash: toBeDeleted });
        commit('deleteTodo');
      } catch (error) {
        console.log(error);
      }
    },
    checkDeleteTodo({ commit }, item) {
      commit('checkDeleteTodo', item);
    },
    cancelDeleteTodo({ commit }) {
      commit('cancelDeleteTodo');
    }
  },
  getters: {
    userId: state => state.user,
    todos: state => state.todos
  }
})
