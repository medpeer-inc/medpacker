import '@style/entries/home/home.scss';
import '@image/webpack-logo.svg';
import Vue from 'vue';
import HelloMedbear from '@js/components/HelloMedbear';
import '@js/modules/home/title_writer';

Vue.component('hello-medbear', HelloMedbear);

new Vue({
	el: '#vue-app'
});
