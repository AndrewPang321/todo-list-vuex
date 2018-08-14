<template>
  <v-card id="create">
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout column align-center>
          <h2 v-if="todos.length == 0">You don't have any todo items!</h2>
          <v-list class="todoContainer">
            <v-list-tile v-for="(item, i) in todos" :key="i" @click.stop="checkTodo(item)">
                <v-list-tile-action>
                  <v-checkbox v-model="item.checked" color="primary"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{item.title}}
                </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-layout>
      </v-slide-y-transition>
    </v-container>

    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition">

      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="!fab">toc</v-icon>
        <v-icon v-if="fab">close</v-icon>
      </v-btn>

      <!-- <v-btn fab dark small color="green">
        <v-icon>edit</v-icon>
      </v-btn> -->

      <v-btn fab dark small color="indigo" @click.stop="addDialog = true">
        <v-icon>add</v-icon>
      </v-btn>

      <v-layout row justify-center>
        <v-dialog v-model="addDialog" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">Add Todo Item</v-card-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12><v-text-field v-model="newTodoTitle" label="Title" autofocus></v-text-field></v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click.native="addDialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat @click.native="addDialog = false" @click="addTodo(newTodoTitle); newTodoTitle=''">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-btn fab dark small color="red" @click.stop="deleteDialog = true">
        <v-icon>delete</v-icon>
      </v-btn>

      <v-layout row justify-center>
        <v-dialog v-model="deleteDialog" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">Delete Todo Items</v-card-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-list class="deleteTodoContainer">
                  <v-list-tile v-for="(item, i) in todos" :key="i" @click.stop="checkDeleteTodo(item)">
                      <v-list-tile-action>
                        <v-checkbox v-model="item.deleted" color="primary"></v-checkbox>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        {{item.title}}
                      </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click.native="deleteDialog = false" @click="cancelDeleteTodo">Cancel</v-btn>
              <v-btn color="green darken-1" flat @click.native="deleteDialog = false" @click="deleteTodo">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      
    </v-speed-dial>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      // *** Float Button ***
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      // *** Dialog for Adding New Todo ***
      addDialog: false,
      newTodoTitle: '',
      // *** Dialog for Deleting Todos ***
      deleteDialog: false,
    };
  },
  async created() {
    await this.getTodo();
  },
  methods: {
    ...mapActions([
      'getTodo',
      'checkTodo',
      'addTodo',
      'checkDeleteTodo',
      'deleteTodo',
      'cancelDeleteTodo'
    ])
  },
  computed: {
    ...mapGetters(['todos'])
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.todoContainer {
  min-width: 75%;
}
.deleteTodoContainer {
  min-width: 100%
}
#create {
  min-height: 100%;
}
#create .v-speed-dial {
  position: absolute;
}
</style>
