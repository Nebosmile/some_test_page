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
          <button class="btn btn_yellow">Sign up</button>
        </div>
      </section>
      <section class="team" ref="team">
        <h1>Working with GET request</h1>

        <div class="team_list" v-if="users">
          <div v-for="user in users" :key="user.id" class="team_member_wrap">
            <div class="team_member_info">
              <img :src="user.photo" alt="" />

              <span class="short name" v-tooltip>{{ user.name }}</span>
              <span class="short" v-tooltip>{{ user.position }}</span>
              <span>
                <a class="short" v-tooltip :href="`mailto:${user.email}`">{{
                  user.email
                }}</a>
              </span>
              <span class="short" v-tooltip>{{ user.phone }}</span>
            </div>
          </div>
        </div>
        <button
          v-if="users.length && nav.next_url"
          @click="get_users(nav)"
          class="btn btn_yellow"
        >
          Show more
        </button>
      </section>
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
// import * as easings from "vuetify/lib/services/goto/easing-patterns";
import postForm from "@/components/postForm";

export default {
  name: "Home",

  components: {
    postForm,
  },
  data() {
    return {
      login: false,
      nav: {
        next_url: null,
        page: 1,
        count: 6,
      },

      users: [],
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
    open_uploader() {
      let uploader = document.getElementById("uploader");
      uploader.click();
    },
    isEllipsisActive(e) {
      return e.offsetWidth < e.scrollWidth;
    },

    async get_users(nav) {
      console.log(nav);
      let link;
      if (nav) {
        console.log(nav);
        link = nav.next_url;
      }

      link = link
        ? link
        : `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${this.nav.page}&count=${this.nav.count}`;

      try {
        let req = await this.$http.get(link);
        this.users = this.users.concat(req.data.users);
        this.nav.next_url = req.data.links.next_url;
        return Promise.resolve();
      } catch (error) {
        alert(error);
      }
    },
    async submit() {
      this.users = [];
      await this.get_users();
      this.login = true;
      setTimeout(() => {
        this.$vuetify.goTo(this.$refs.team, this.scroll_options);
      }, 2000);
    },
  },
  mounted() {
    this.get_users();
  },
};
</script>

<style lang='scss'>
@import "@/scss/main.scss";
@font-face {
  font-family: "Nunito";
  src: url("@/assets/fonts/Nunito-VariableFont_wght.ttf");
}

#app {
  background-color: #e5e5e5;
  padding-bottom: 100px;
}
h1,
p {
  font-family: Nunito;
}
h1 {
  font-size: 40px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: center;
}
p {
  font-size: 16px;
  line-height: 26px;
  text-align: left;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
// .container {
//   display: flex;
//   margin: 0 auto;
//   max-width: 1170px;
//   padding: 0;
//   justify-content: center;
//   flex-direction: column;
// }
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 140px auto 0;
  max-width: 1170px;

  h1 {
    margin-bottom: 50px;
  }

  .btn {
    margin-top: 50px;
  }
  &:last-child {
    .btn {
      margin-top: 0;
    }
  }
}

.header_wrap {
  background-color: #fff;

  #header {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 0 auto;

    p {
      margin: 0 !important;
    }

    & > div {
      display: flex;
      align-items: center;
    }
    .button_block {
      .btn {
        margin-left: 10px;
      }
    }
  }
}

.team .btn {
  width: 120px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-radius: 80px;
  height: 34px;
}
.btn_yellow {
  background-color: #f4e041;
  &:hover {
    background-color: #ffe302;
  }
  &:disabled {
    background-color: rgba(180, 180, 180, 1);
    color: rgba(255, 255, 255, 0.87);
  }
}

.intro {
  background-image: url("@/assets/intro_back.jpg");
  background-position-x: center;
  width: 100%;
  margin: 0 auto;
  height: 650px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .intro_info {
    width: 380px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,
    p {
      color: #fff;
      margin-bottom: 21px;
      font-weight: 400;
      text-align: center;
    }
    p {
      margin-bottom: 32px;
    }
  }
}
.team_list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .team_member_wrap {
    width: 31.62%; // calc(370 / 1170 * 100%); 370px is 31.62%  from 1170px
    margin-right: 2.568%; // calc((100% - 370 / 1170 * 3 * 100%) / 2);find the margin between the blocks
    padding: 20px;
    background-color: #fff;
    margin-bottom: 2.568%;
    border-radius: 10px;

    &:nth-child(3n) {
      margin-right: 0;
    }

    .team_member_info {
      text-align: center;

      img {
        display: block;
        margin: 0 auto;
        border-radius: 50%;
      }

      .name {
        margin: 20px 0;
        text-align: center;
      }
      .short {
        display: block;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        color: #000;
        text-decoration: none;
      }
    }
  }
}
form {
  width: 380px;
}
.file_input_wrap {
  display: flex;
}
.slide-fade-enter-active {
  transition: all 1s ease 0.8s;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@media (max-width: 1170px) {
  section {
    padding: 0 60px;
    max-width: 1170px;
  }
}
@media (max-width: 768px) {
  section {
    padding: 0 32px;
    max-width: 768px;
  }
  .team_list {
    justify-content: space-between;
    .team_member_wrap {
      width: 48.86%;
      margin: 0 0 2.27% 0;
    }
  }
}
@media (max-width: 380px) {
  section {
    padding: 0 16px;
    max-width: 380px;
  }
  .team_list {
    justify-content: space-between;
    .team_member_wrap {
      width: 100%;
      margin: 0 0 20px 0;
    }
  }
}
</style>
