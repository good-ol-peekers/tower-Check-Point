<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 ">
        <div class="navbar-nav d-flex flex-row me-auto">
          <!-- <div>
            <router-link :to="{ name: 'Event' }" class="btn text-success lighten-30 selectable text-uppercase">
              <button> Event Details Page</button>
            </router-link>
          </div> -->
          <div>
            <router-link :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable text-uppercase">
              <button>Account Page </button>
            </router-link>
          </div>
          <div>
            <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable text-uppercase">
              <button> Home Page </button>
            </router-link>
          </div>
          <Login />
        </div>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
