<template>
  <div class="createAccess" @click.self="router.push('/')">

    <div class="createAccess__container">

      <h2 class="title"> Create an account</h2>

      <SignUpForm />

    </div>

  </div>
</template>


<script>
import SignUpForm from "../components/SignUpForm";
import  {useRouter} from 'vue-router'
export default {
  name: "create",
  components: {
    SignUpForm,
  },
  setup(){
    const router = useRouter()

    return { router  }
  }
};
</script>


<style lang="scss" scoped>
.createAccess {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  height: 100vh;
  padding-top: 40vh;
  //  opacity: 0.5;
  // transform: translateY(100vh);

  &__container {
    width: 100%;
    height: 60vh;
    border-radius: 44px 44px 0 0;
    background-color: #fff;
    padding: 5vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
}

.title {
  font-weight: 700;

  text-align: start;
  margin-bottom: 5vh;
}
</style>