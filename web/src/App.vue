<template>
  <div class="container">
    <Video />
  </div>
  <div class="overlay" @click.self="router.push('/')">
    <router-view v-slot="{ Component }">
      <transition name="Bottom" mode="out-in" appear>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script>
import Video from "./components/Video";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
// import { watchEffect ,ref} from "vue";

export default {
  name: "App",
  components: {
    Video,
  },
  setup() {
    console.log(
      "这个vue提示,我真是吐了,找了好久文档vue3 config.productionTip api也被移除了 ,mode 明明是 production 后来看了vue3官方例子也有,我就放弃fix它了"
    );
    const router = useRouter();
    router.beforeEach((to) => {
      if (to.name === "completeProfile" && !window.localStorage.token) {
        ElNotification.error("没有登录");
        router.push("/");
        return false;
      }
    });

    return { router };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
.container {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
}

.Bottom-enter-active {
  animation: Bottom-in 0.6s ease-in-out;
}
.Bottom-leave-active {
  animation: Bottom-in 0.6s ease-in-out reverse;
}
@keyframes Bottom-in {
  0% {
    transform: translateY(100vh);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
