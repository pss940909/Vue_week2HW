import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const base_url = `https://vue3-course-api.hexschool.io`;
const api_path = "pss940909";

const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      event.preventDefault();
      axios
        .post(`${base_url}/v2/admin/signin`, this.user)
        .then((res) => {
          console.log(res);
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
          window.location = ".././week2.html";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
};

createApp(app).mount("#app");
