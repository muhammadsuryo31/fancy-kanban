import Vue from 'vue';
import App from './App.vue';
import axios from 'axios'
import GSignInButton from 'vue-google-signin-button'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(GSignInButton)
Vue.use(axios)


new Vue({
  render: h => h(App),
}).$mount('#app');