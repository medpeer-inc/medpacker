import '@style/entries/home/home.scss';
import Vue from 'vue';
import HelloVue from '@js/components/HelloVue.vue';

Vue.component('hello-vue', HelloVue);

document.querySelector('#title').innerHTML = 'Rails and webpack template!'

new Vue({
	el: '#vue-app'
});
