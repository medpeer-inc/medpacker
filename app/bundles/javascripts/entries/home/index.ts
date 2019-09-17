import '@style/entries/home/home.scss';
import Vue from 'vue';
import HelloMedbear from '@js/components/HelloMedbear.vue';
import '@js/modules/home/title_writer';

Vue.component('hello-medbear', HelloMedbear);

new Vue({
  el: '#vue-app'
});
