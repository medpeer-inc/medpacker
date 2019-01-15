import '@style/entries/home/home.scss';
import Vue from 'vue';
import HelloVue from '@js/components/HelloVue';
import '@js/modules/home/title_writer'

Vue.component('hello-vue', HelloVue);

new Vue({
	el: '#vue-app'
});
