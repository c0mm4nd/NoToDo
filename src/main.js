'use strict'

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import utils from "./utils"

Vue.use(ElementUI)

var vm = new Vue({
  el: '#app',
  render: h => h(App),

  // mounted: function () {

  //   this.inputValue = "123456"
  //   console.log(this)
  //   chrome.storage.sync.get(['todo'], function (result) {
  //     vm.inputValue = result.todo;
  //     console.log(vm)
  //   });
  // }
})

