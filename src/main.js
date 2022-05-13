import Vue from 'vue';
import App from './App.vue';
import firstMessage, { secondMessage } from './data/messages';
import showMessage from './showMessage';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

showMessage(firstMessage);
showMessage(secondMessage);
