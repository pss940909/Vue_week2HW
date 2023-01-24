import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

// 產品資料格式

// 登入頁面完成之後 要先驗證是否登入

// 登入 產品後台 （產品列表 用戶訂單）

const base_url = "https://vue3-course-api.hexschool.io";
const api_path = "pss940909";

const app = {
  data() {
    return {
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    // 檢查是否登入
    checkLogin() {
      console.log(`${base_url}/v2/api/user/check`);
      axios
        .post(`${base_url}/v2/api/user/check`)
        .then((res) => {
          console.log(res);
          // 驗證登入過後就可以取得產品列表
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
          window.location = ".././sign_in.html";
          alert("驗證失敗,請重新登入");
        });
    },
    // 取得產品列表
    getProducts() {
      axios
        .get(`${base_url}/v2/api/${api_path}/admin/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 先把cookie取出
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // axios headers 之後要在每一次印到管理頁面時 headers都會自動帶入cookie驗證身份
    axios.defaults.headers.common["Authorization"] = myCookie;
    this.checkLogin();
  },
};
createApp(app).mount("#app");
