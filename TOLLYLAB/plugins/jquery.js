// plugins/jquery.ts
import { defineNuxtPlugin } from '#app'
import jQuery from 'jquery'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('jquery', jQuery)
  nuxtApp.provide('$', jQuery) // Also provide $ for shorthand
})
