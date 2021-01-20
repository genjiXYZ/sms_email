<template>
  <div class="complete">

    <div class="complete__container">

      <div class="profile" v-for="(value,key) in user " :key="key">
        <span class="title">{{`${key} :`}}</span>
       

        <span class="message" v-if="key!= 'email'">{{`${value}`}}</span>
        <el-input style="width:50%;" v-if="key === 'email'" :placeholder="value" v-model="email"  @keyup.enter="sendEmail"></el-input>
        <el-button v-if="key === 'email'" @click="sendEmail">发送</el-button>
      </div>
      <el-button class="update " type="primary" @click="clear">log out</el-button>
    </div>

  </div>
</template>


<script>
import { readonly, ref, computed } from "vue";
import { useStore } from "vuex";
import { IOStoBeijing } from "../utils/day";
import { useRouter } from "vue-router";
import { postEmail } from "../api/index";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let email = ref("");

    //filter readonly
    console.log(window.localStorage.email || "发送邮箱验证码");

     const user =  computed(() => {
      let { token, createAt, ...orther } = { ...store.state.user };
      console.log('token: ', token);
      let user = readonly({ ...orther, createAt: IOStoBeijing(createAt) });
      return user
    });

    //sendEmail

    async function sendEmail() {
      let res = await postEmail(email.value);
      console.log("res: ", res);
    }

    const clear = () => {
      router.push("/");
      store.commit("clearUser");
      window.localStorage.clear();
    };

    return { user, email, sendEmail, clear };
  },
};
</script>


<style lang="scss" scoped>
.complete {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  height: 100vh;
  padding-top: 10vh;
  &__container {
    width: 100%;
    height: 80vh;
    border-radius: 44px;
    background-color: #fff;
    padding: 5vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .profile {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      margin-bottom: 2vh;

      .title {
        font-size: 20px;
        font-weight: 700;
      }
      .message {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
</style>
