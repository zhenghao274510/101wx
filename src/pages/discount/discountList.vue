<template>
  <div class="list">
    <main-header :text="text" @back="back"></main-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="beginLoading"
      :offset="2"
      :immediate-check="false"
    >
      <ul class="list-box">
        <li v-for="(v,k) in recommendList" :key="k" @click="detail(v.id)">
          <img :src="v.image" alt lazy-load />
          <div class="list-content">
            <div class="list-top">
              <div class="list-title">{{v.name}}</div>
              <div class="list-produce">{{v.text}}</div>
            </div>
            <div class="list-price">
              <div class="list-left">
                <span
                  style="color: red;font-size: 16px;"
                  v-if="v.price!==undefined"
                >￥{{v.price}}{{v.unit}}</span>
                <span
                  style="color: red;font-size: 16px;"
                  v-if="v.price==undefined"
                >￥{{v.originalPrice}}{{v.unit}}</span>
              </div>
              <img src="/static/img/gouwuche2.png" alt @click="shopcart(v)" />
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import MainHeader from "@/components/mainHeader";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      donghua: false,
      text: "",
      recommendList: [],
      page: 1,
      loading: false,
      finished: false
    };
  },
  created() {},
  components: {
    MainHeader
  },
  mounted() {
    let res = JSON.parse(wx.getStorageSync("params"));
    console.log(res.v);

    if (res.v == "推荐") {
      this.text = "折扣专区";
      this.discountGoods(this.page);
    } else {
      this.text = "更多优质商品";
      this.recommend(this.page, res.id);
    }
    this.cid= JSON.parse(wx.getStorageSync("user"))
  },
  methods: {
    back() {
      this.$router.push("/first");
    },
    detail(id) {
      console.log(id);
      this.$router.push({
        name: "goods_detailzhe",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;
      //   localStorage.setItem("zhe-shopID", JSON.stringify(ID));
    },
    shopcart(v) {
      if (this.cid == null) {
        this.$router.replace("/login");
      } else {
        this.donghua = true;
        let datas = {
          cmd: "addToCar",
          gid: v.id,
          cid: this.cid,
          specifications: v.skuId,
          number: 1
        };
        Request.postRequest(datas)
          .then(res => {
            console.log(res);
            if (res.result == 0) {
              Toast("添加购物车成功");
              this.donghua = false;
            } else if (res.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    },
    discountGoods(page) {
      let discountGoods = {
        cmd: "discountGoods",
        pageNow: page
      };
      Request.postRequest(discountGoods)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.totalPage = res.totalPage;
            this.recommendList = res.discount;
          }
        })
        .catch(res => {});
    },
    recommend(page, id) {
      let discountGoods = {
        cmd: "getHotProductList",
        id: id,
        pageNow: page
      };
      Request.postRequest(discountGoods)
        .then(res => {
          console.log(res.data);
          if (res.result == 0) {
            this.totalPage = res.totalPage;
            this.recommendList = res.dataList;
          }
        })
        .catch(res => {});
    },
    beginLoading() {
      if (this.page >= this.totalPage) {
        this.finished = true;
        this.loading = false;
      } else {
        this.page++;
        let discountGoods = {
          cmd: "discountGoods",
          pageNow: this.page
        };
        Request.postRequest(discountGoods)
          .then(res => {
            if (res.data.result == 0) {
              for (var i in res.discount) {
                this.recommendList.push(res.discount[i]);
              }
            }
            console.log(this.recommendList);
          })
          .catch(res => {});
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-top: 1.5rem;

  .list-box {
    width: 100%;

    li {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      border-bottom: 1px solid #eee;

      img {
        width: 2.5rem;
        height: 2.5rem;
      }

      .list-content {
        width: 70%;
        height: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.4rem 0.3rem;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;

        .list-top {
          width: 100%;

          .list-title {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .list-produce {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 0.2rem;
          }
        }

        .list-price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
  }

  .list-more {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
