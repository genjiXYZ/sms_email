<template>
  <div class="video">
    <video class="intro-loop" ref="introLoop" @canplay="isAllLoaded" muted playsinline loop>
      <source src="https://picgo.genji.xyz/sms/loop.webm" type="video/webm" />
      <source src="https://picgo.genji.xyz/sms/loop.mp4" type="video/mp4" />
    </video>
    <video class="intro" ref="intro" @canplay="isAllLoaded" @ended="OpacityAndPlayNext" muted playsinline>
      <source src="https://picgo.genji.xyz/sms/intro.webm" type="video/webm" />
      <source src="https://picgo.genji.xyz/sms/intro.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Video",
  props: {
    msg: String,
  },

  setup() {
    let intro = ref(null);
    let introLoop = ref(null);
    let loadedSign = [];

    const isAllLoaded = () => {
      if (loadedSign.push(1) === 1) {
        let play = intro.value.play();
        if (play) {
          play
            .then(() => {})
            .catch((e) => {
              console.log("e: ", e);
            });
        }
      }
    };

    const OpacityAndPlayNext = () => {
      introLoop.value.play();
      setTimeout(() => {
        introLoop.value.style.opacity = 1;
        intro.value.style.opacity = 0;
      }, 200);
    };

    return { intro, introLoop, isAllLoaded, OpacityAndPlayNext };
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}
</style>
