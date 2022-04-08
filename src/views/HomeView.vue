<template >
  <div class="main_wrap">
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
      rel="stylesheet"
    />
    <div class="header_wrap">
      <section id="header">
        <div class="logo_wrap">
          <a href="/"><img src="@/assets/logo.png" alt="" /></a>
        </div>
        <div class="button_block">
          <button
            class="btn btn_yellow"
            @click="$vuetify.goTo($refs.team, scroll_options)"
          >
            Users
          </button>
          <button
            class="btn btn_yellow"
            v-if="!login"
            @click="$vuetify.goTo($refs.login, scroll_options)"
          >
            Sign up
          </button>
        </div>
      </section>
    </div>
    <div class="container">
      <!-- <section> -->

      <!-- </section> -->
      <section class="intro">
        <div class="intro_info">
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <button
            class="btn btn_yellow"
            @click="$vuetify.goTo($refs.login, scroll_options)"
          >
            Sign up
          </button>
        </div>
      </section>

      <teamComponent ref="team"></teamComponent>

      <transition name="slide-fade">
        <postForm v-show="!login" ref="login" @submit="submit"></postForm>
      </transition>

      <transition name="slide-fade">
        <section v-show="login">
          <h1>User successfully registered</h1>
          <img :src="require('@/assets/img/success.png')" />
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
import postForm from "@/components/postForm";
import teamComponent from "@/components/teamComponent";

export default {
  name: "Home",

  components: {
    postForm,
    teamComponent,
  },
  data() {
    return {
      login: false,

      token: "",
      scroll_options: {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic",
      },
    };
  },
  methods: {
    up_login() {
      this.login = this.login ? false : true;
    },

    isEllipsisActive(e) {
      return e.offsetWidth < e.scrollWidth;
    },

    async submit() {
      await this.$refs.team.get_users();
      this.login = true;
      setTimeout(() => {
        this.$vuetify.goTo(this.$refs.team, this.scroll_options);
      }, 2000);
    },
  },
};
</script>

<style lang='scss'>
@import "@/scss/main.scss";
</style>
