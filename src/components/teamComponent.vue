<template>
  <section class="team">
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
      v-if="users.length && nav.page != nav.total_pages"
      @click="get_users(nav)"
      class="btn btn_yellow"
    >
      Show more
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      nav: {
        next_url: null,
        page: 1,
        count: 6,
        total_pages: "",
      },
    };
  },
  methods: {
    async get_users(nav) {
      if (!nav) {
        this.users = [];
        this.nav.page = 1;
        this.nav.total_pages = "";
      }
      let link;
      if (nav) {
        link = nav.next_url;
      }

      link = link
        ? link
        : `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${this.nav.page}&count=${this.nav.count}`;

      try {
        let req = await this.$http.get(link);
        this.users = this.users.concat(req.data.users);
        this.nav.next_url = req.data.links.next_url;
        this.nav.page = req.data.page;
        this.nav.total_pages = req.data.total_pages;
        return Promise.resolve();
      } catch (error) {
        alert(error);
      }
    },
  },
  mounted() {
    this.get_users();
  },
};
</script>

<style>
</style>