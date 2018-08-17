<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app>

      <v-list>
        <v-list-tile value="true" v-for="(page, i) in pages" :key="i" @click="redirect(page.title)">
          <v-list-tile-action>
            <v-icon v-html="page.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="page.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark color="primary" app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { auth } from '@/api/firebase';

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      pages: [
        {
          icon: 'view_list',
          title: 'List',
          pathName: '/'
        },
        {
          icon: 'lock',
          title: 'Logout',
          pathName: '/login'
        }
        ],
      miniVariant: false,
      title: 'Todo List',
      testing: '',
    }
  },
  methods: {
    ...mapActions(['logout']),
    redirect(pageTitle) {
      switch (pageTitle) {
        case 'List':
          // console.log(this.userAuth());
          if (this.authenticated) {
            this.$router.push('/');
          }
          break;
        case 'Logout':
          this.logout();
          break;
      }
    },
    userAuthNavHandler() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.pages[1].title = 'Logout';
        } else {
          this.pages[1].title = 'Login';
        }
      });
    }
  },
  computed: {
    ...mapGetters(['userId']),
  },
  mounted() {
    this.userAuthNavHandler();
  }
}
</script>
