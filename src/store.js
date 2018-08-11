import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        title: 'todo1',
        checked: true,
        delete: false
      },
      {
        title: 'todo2',
        checked: false,
        delete: false
      },
      {
        title: 'todo3',
        checked: true,
        delete: false
      }
    ]
  },
  mutations: {
    checkTodo(state, item) {
      item.checked = !item.checked;
    },
    addTodo(state, newTodoTitle) {
      state.todos.push({
        title: newTodoTitle,
        checked: false,
        delete: false
      });
    },
    checkDeleteTodo(state, item) {
      item.delete = !item.delete;
    },
    deleteTodo(state) {
      state.todos = state.todos.filter(item => {
        return item.delete == false;
      });
    },
    cancelDeleteTodo(state) {
      state.todos.forEach(item => {
        return item.delete = false;
      });
    }
  },
  actions: {
    checkTodo({ commit }, item) {
      commit('checkTodo', item);
    },
    addTodo({ commit }, newTodoTitle) {
      try {
        commit('addTodo', newTodoTitle);
      } catch (error) {

      }
    },
    checkDeleteTodo({ commit }, item) {
      commit('checkDeleteTodo', item);
    },
    deleteTodo({ commit }) {
      try {
        commit('deleteTodo');
      } catch (error) {

      }
    },
    cancelDeleteTodo({ commit }) {
      try {
        commit('cancelDeleteTodo');
      } catch (error) {

      }
    }
  },
  getters: {
    todos: state => state.todos
  }
})
