import "@style/entries/home/home.scss";
import Vue from "vue";
import HelloVue from "@js/components/HelloVue.vue";

Vue.component('hello-vue', HelloVue);

new Vue({
  el: "#vue-app"
})
