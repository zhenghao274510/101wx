<template>
  <div class="list">
    <ul>
      <li v-for="(v,k) in dataList" :key="k" @click="goDetail(v.id)">
        <img :src="v.image" alt lazy-load />
        <div class="list-shop">
          <div class="shop-top">
            <h3>{{v.name}}</h3>
            <!--  -->
            <span v-if="v.spacing<1">{{v.spacing*1000}}m</span>
            <span v-else>{{v.spacing}}km</span>
          </div>
          <div class="shop-star">
            <van-rate
              v-model="v.star"
              disabled
              disabled-color="rgb(255,164,20)"
              allow-half
              :size="18"
            />
            <span>{{v.stars}}</span>
            <span style="margin-left: 0.3rem">月销:{{v.monthlySale}}</span>
          </div>
          <p>{{v.describe}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    dataList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  methods: {
    goDetail(id) {
      console.log(id)
      this.$emit("goDetail", id);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.list {
  width: 100%;

  ul {
    width: 100%;

    li {
      width: 100%;
      padding: 0.4rem;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      display: flex;
      alijn-items: center;
      justify-between: space-between;

      img {
        width: 1.6rem;
        height:1.6rem;
      }

      .list-shop {
        width: 70%;
        padding: 0.2rem 0 0.2rem 0.3rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .shop-top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          color: #333;

          h3 {
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 40%;
          }
        }

        .shop-star {
          width: 100%;
          display: flex;
          alijn-items: center;
          color: #333;

          span {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
          }
        }

        p {
          color: #333;
          font-size: 12px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 70%;
        }
      }
    }
  }
}
</style>
