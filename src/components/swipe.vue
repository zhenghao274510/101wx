<template>
  <div class="box">
    <swiper :autoplay="3000" indicator-active-color="white" indicator-color  circular="true" :height="180">
      <swiper-item
        v-for="(image, index) in images"
        :key="index"
      >
        <img class="imgs" :src="image.image" @click.stop="imgurl(image.type,image.content)" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: [],
      oneX: "",
      twoX: ""
    }
  },
  data() {
    return {};
  },

  methods: {
    imgurl(type, txt) {
      if (this.oneX == this.twoX) {
        //当滑动距离等于0时触发点击事件
        console.log(type, txt);
        if (type == 0) {
          this.$router.push({
            name: "Fuwen",
            params: {
              id: txt
            }
          });
        } else if (type == 1) {
          this.$router.push({
            name: "shop_detailfirst",
            params: {
              id: txt
            }
          });
        } else {
          this.$router.push({
            name: "goods_detailsx",
            params: {
              id: txt
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.imgs {
  width: 100%;
  touch-action: none;
  height: 100%;
}
</style>
