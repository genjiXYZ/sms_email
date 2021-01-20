<template>
  <div class="phone">
    <div class="input-container">
      <h4>Phone Number</h4>
      <el-input placeholder="请输入手机号" oninput="this.value = this.value.replace(/[^\d.]/g,'');" :disabled="isdisabled" v-model="phoneNumber" class="input-with-select">
        <template #prepend>
          <el-select v-model="option" placeholder="请选择">
            <el-option label="(+86)中国大陆" value="(+86)"></el-option>
          </el-select>
        </template>
        <template #suffix>
          <i class="el-icon-circle-close el-input__icon" @click="isdisabled || (phoneNumber = '')">
          </i>
        </template>
      </el-input>

    </div>

    <div class="input-container">
      <h4>SMS Code</h4>
      <el-input placeholder="请输入验证码" @keyup.enter="clickVerify" oninput="this.value = this.value.replace(/[^\d.]/g,'');" v-model="code" class="input-with-select">
        <template #append>
          <el-button class="send" :class="{ isSendSuccess }" :style="{ color: isSendSuccess ? 'rgb(144, 147, 153)' : '#409EFF' }" @click="clickSend" icon="el-icon-message">
            {{ isSendSuccess ? `${count}s` : "" }}
          </el-button>
        </template>
        <template #suffix>
          <i class="el-icon-circle-close el-input__icon" @click="code = ''">
          </i>
        </template>
      </el-input>
    </div>

    <div class="input-container">
      <el-checkbox class="isAgree" v-model="isAgree" @keyup.enter="clickVerify">给我同意!</el-checkbox>
    </div>

    <div class="input-container">
      <el-button :loading="isloading" round class="login" @click="clickVerify" type="primary">verify Code</el-button>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { postPhoneNumber, postVerifyCode } from "../api/index";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    let phoneNumber = ref("");
    let code = ref("");
    let count = ref(60);
    let isSendSuccess = ref(false);
    let isloading = ref(false);
    let isdisabled = ref(false);
    let isAgree = ref(false);

    async function clickSend(e) {
      e.preventDefault();

      if (!isSendSuccess.value) {
        let res = await postPhoneNumber(phoneNumber.value);
        isSendSuccess.value = res.data.flag;
        isSendSuccess.value && countDown();
      } else {
        ElNotification.info(
          "你要是填错了就刷新下. 5分钟内 发送3次以上  小黑屋!"
        );
        return;
      }
    }

    let sign;
    function countDown() {
      isdisabled.value = true;

      let s = 60;
      sign = setInterval(() => {
        count.value = s -= 1;
        if ((count.value -= 1) < 0) {
          clearTimeout(sign);
          isSendSuccess.value = false;
          count.value = 60;
          isdisabled.value = false;
        }
      }, 1000);
    }
    async function clickVerify() {
      if (
        isSendSuccess &&
        phoneNumber.value.length === 11 &&
        code.value.length === 6 &&
        isAgree.value == true
      ) {
        let res = await postVerifyCode(phoneNumber.value, code.value);
        res.data.flag && router.push("/completeProfile") && clearTimeout(sign);
        for (const key in res.data.user) {
          if (Object.hasOwnProperty.call(res.data.user, key)) {
            const element = res.data.user[key];
            window.localStorage[key] = element;
            store.state.user[key] = element;
          }
        }
      } else {
        ElNotification.info("是不是有什么事没干?");
      }
    }

    return {
      isAgree,
      isdisabled,
      isSendSuccess,
      isloading,
      count,

      phoneNumber,
      code,
      option: ref("(+86)"),
      clickSend,
      clickVerify,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.phone {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}
.input-container {
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  flex-direction: column;
  flex-wrap: nowrap;

  margin-bottom: 3vh;
}
.el-select .el-input {
  width: 150px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

h4 {
  text-align: start;
  color: #ccc;
  margin-bottom: 2vh;
}

.isSendSuccess.el-button--primary {
  background-color: #dcdfe6 !important;
  border-color: #dcdfe6 !important;
}

.login {
  align-self: flex-end;
}
.isAgree {
  align-self: center;
}

.el-input__icon:hover {
  color: #66b1ff;
  cursor: pointer;
}

/* .el-input-group__append {
  background-color: #409EFF !important;
} */
</style>
