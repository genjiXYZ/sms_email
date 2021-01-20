<template>
  <div class="Home">
    <div class="title">
      <h1>Say something here</h1>
      <h5>Say something here</h5>
      <el-button @click="hastoken" class="enter" type="primary" round :style="{width:'30%',height:'5vh',minWidth:'100px'}">Let's go! </el-button>
    </div>
  </div>
</template>


<script>
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const router = useRouter();

    const hastoken = () => {

  
      window.localStorage.token
        ? router.push("/completeProfile")
        : router.push("./create");
    };
    return { hastoken };
  },
};
</script>


<style lang="scss" scoped>
.Home {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  height: 100vh;
  padding-top: 70vh;

  .title {
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    // background-color: blanchedalmond;
    padding: 5vh;
    color: white;
    text-align: start;
  }
  .enter {
    align-self: flex-end;
  }
}
</style>