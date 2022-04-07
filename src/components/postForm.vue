<template>
  <section class="form_wrap">
    <h1>Working with POST request</h1>
    <v-form ref="form" v-model="isFormValid">
      <v-text-field
        label="Your name"
        v-model="name"
        :rules="[rules.required]"
        single-line
        outlined
      >
      </v-text-field>
      <v-text-field
        label="Email"
        v-model="email"
        :rules="[rules.required, rules.email]"
        single-line
        outlined
      >
      </v-text-field>
      <v-text-field
        label="Phone"
        v-model="phone"
        type="number"
        :rules="[rules.required, rules.number]"
        single-line
        hint="+38 (XXX) XXX - XX - XX"
        persistent-hint
        outlined
      >
      </v-text-field>
      <v-radio-group v-model="radios" :rules="[rules.required]">
        <p>Select your position</p>
        <v-radio
          v-for="elem in position_list"
          :key="elem.id"
          :label="elem.name"
          :value="elem.id"
        ></v-radio>
      </v-radio-group>

      <div class="file_input_wrap">
        <v-file-input
          class="custom_uploader"
          placeholder="Upload your photo"
          prepend-icon=""
          height="54px"
          background-color="#c5bcbc"
          outlined
          accept=".jpg, .jpeg"
          v-model="chosenFile"
          dense
          :rules="[rules.required, rules.size]"
        ></v-file-input>
      </div>
    </v-form>
    <button class="btn btn_yellow" :disabled="!isFormValid" @click="save">
      Sign up
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      file: "",
      email: "",
      name: "",
      position_list: [],
      phone: "",
      radios: "",
      chosenFile: null,
      rules: {
        size: (value) => {
          if (value) {
            return (
              value.size <= 5 * 1024 * 1024 ||
              "The photo may not be greater than 5 Mbytes"
            );
          }
          return "Required";
        },
        number: (value) => {
          const pattern = /^[\+]{0,1}380([0-9]{9})$/; // eslint-disable-line
          return pattern.test(value) || "Invalid  phone number";
        },
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/; // eslint-disable-line
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    async get_token() {
      try {
        let req = await this.$http.get(
          "https://frontend-test-assignment-api.abz.agency/api/v1/token"
        );
        this.token = req.data.token;
      } catch (error) {
        alert(error);
      }
    },
    async save() {
      let form = {
        phone: this.phone.length == 13 ? this.phone : `+${this.phone}`,
        email: this.email,
        name: this.name,
        position_id: this.radios,
        photo: this.chosenFile,
      };
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }
      console.log(form);
      if (this.$refs.form.validate()) {
        try {
          let req = await this.$http.post(
            "https://frontend-test-assignment-api.abz.agency/api/v1/users",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Token: this.token,
              },
            }
          );
          if (req.data.success) {
            this.$emit("submit");
            this.$refs.form.reset();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async get_position_list() {
      // /https://frontend-test-assignment-api.abz.agency/api/v1/positions
      try {
        let req = await this.$http.get(
          "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
        );
        if (req.data.success) this.position_list = req.data.positions;
        else alert(req.data.message);
      } catch (error) {
        alert(error);
      }
    },
  },
  mounted() {
    this.get_token();
    this.get_position_list();
  },
};
</script>

<style>
</style>