<template>
  <v-container fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center>
        <v-flex align-center justify-center xs6 offset-xs3>
          <v-card class="elevation-12">
            <!-- <v-toolbar dark color="primary">
              <v-toolbar-title>Sign In</v-toolbar-title>
            </v-toolbar> -->
            <v-card-text>
              <v-container>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Email" v-model="credentials.email"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field type="password" label="Password" v-model="credentials.password"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row xs12>
                    <v-flex>
                      <v-btn flat block @click.prevent="clearFields">
                        Clear
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn flat block color="primary" @click.prevent="login(credentials)">
                        Sign In
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    clearFields() {
      this.credentials.email = '';
      this.credentials.password = '';
    }
  }
}
</script>

<style scoped>
#login {
  max-width: 50%;
}
</style>