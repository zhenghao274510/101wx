<template>
  <div class="list">
    <ul>
      <li v-for="(v,k) in dataList" :key="k" @click="goShopx(v.sid)">
        <img :src="v.image" alt lazy-load />
        <div class="list-shop">
          <div class="shop-top">
            <h3>{{v.name}}</h3>
            <span>{{v.city}}</span>
          </div>
          <div class="shop-star">
            <van-rate v-model="v.star" disabled disabled-color="rgb(255,164,20)" :size="18"/>
            <span>{{v.stars}}</span>
          </div>
          <span>月销{{v.mothlySaleNumber}}</span>
        </div>
        <div class="quxiao" @click="goShop(v.sid)">取消收藏</div>
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
  components:{
   vanRate
  },
  methods: {
    goShop(id) {
      this.$emit("goShop", id);
    },
    goShopx(id) {
      this.$emit("goShopx", id);
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

      .quxiao {
        margin-top: 40px;
        height: 35px;
        line-height: 35px;
        padding: 0 0.2rem;
        color: #808181;
        border: 1px solid #dedede;
      }

      img {
        width: 2.3rem;
        height: 2.3rem;
      }

      .list-shop {
        flex: 1;
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
        }
      }
    }
  }
}
</style>
