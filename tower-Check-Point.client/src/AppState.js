import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Event').Event[]} */
  events: [],

   /** @type {import('./models/Event').Event | null} */
  event: null,

  /** @type {import('./models/Comment').Comment[]} */
  comments: [],


})
