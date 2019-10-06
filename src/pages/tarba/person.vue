<template>
  <div class="contain">
    <div class="box">
      <div class="wrapper">
        <div class="xiaoxi">
          <img src="/static/img/personmsg.png" alt @click="message" class="xiaoxi" />
          <b class="xiaob"></b>
        </div>
        <div class="person" @click="goMsg">
          <div class="user">
            <span style="font-weight: 600;margin-bottom: 0.3rem;font-size:14px;">等会撒</span>
            <span>1342566666</span>
          </div>
          <div class="person_img">
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="/static/img/jinru02.png"
              alt
            />
            <div class="imgs">
              <img :src="headImage" alt v-if="headImage!=''" />
              <img src="/static/img/touxiang.png" alt v-else />
            </div>
          </div>
        </div>
        <div class="top-nav">
          <div class="top-head">
            <span>我的订单</span>
            <div class="top-right">
              <span>
                <router-link :to="'/order_center/'+0" @click="gotoall">全部订单</router-link>
              </span>
              <img
                style="width:0.2rem;height:0.3rem;margin-left:0.3rem;"
                src="/static/img/jinru02.png"
                alt
              />
            </div>
          </div>
          <div class="top-bar">
            <van-tabbar :fixed="false" active-color="#666">
              <van-tabbar-item to :info="this.pendPayNumber" v-if="this.pendPayNumber>0">
                <span>
                  <router-link :to="'/order_center/'+1">待付款</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daifukuan.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+1">待付款</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daifukuan.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.pendSendNumber" v-if="this.pendSendNumber>0">
                <span>
                  <router-link :to="'/order_center/'+2">待发货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daifahuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+2">待发货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daifahuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.pendReceiveNumber" v-if="this.pendReceiveNumber>0">
                <span>
                  <router-link :to="'/order_center/'+3">待收货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daishouhuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+3">待收货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daishouhuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.pendEvaluateNumber" v-if="this.pendEvaluateNumber>0">
                <span>
                  <router-link :to="'/order_center/'+4">待评价</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daipingjia.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+4">待评价</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/daipingjia.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.afterSaleNumber" v-if="this.afterSaleNumber>0">
                <span>
                  <router-link :to="'/TuiShop/'+5">退款/售后</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/tuikuanshouhou.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/TuiShop/'+5">退款/售后</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="/static/img/tuikuanshouhou.png" />
              </van-tabbar-item>
            </van-tabbar>
          </div>
        </div>
        <div class="bottom-nav">
          <div class="bottom-head">
            <span style="font-size:14px;">山城乡鲜服务</span>
          </div>
          <ul>
            <li class="one">
              <a href="/pages/my/shoucang">
                <img src="/static/img/my_shoucang.png" alt />
              </a>
              <span>我的收藏</span>
            </li>
            <li class="one">
              <a href="/pages/my/mypingjia">
                <img src="/static/img/my_pingjia.png" alt />
              </a>
              <span>我的评价</span>
            </li>
            <li class="one">
              <a href="/pages/address/index">
                <img src="/static/img/my_dizhi.png" alt />
              </a>
              <span>地址管理</span>
            </li>
          </ul>
          <ul>
            <li class="two">
              <a href="/pages/my/shangjia/shangjiaruzhu">
                <img src="/static/img/my_ruzhu.png" alt />
              </a>
              <span>商家入驻</span>
            </li>
            <li class="two">
              <a href="/pages/my/tuanzhangcenter/tuanzhangcenter">
                <img src="/static/img/my_tuanzhang@2x.png" alt />
              </a>
              <span>团长入住</span>
            </li>
            <li class="two">
              <a href="/pages/my/kefucenter">
                <img src="/static/img/my_kefu.png" alt />
              </a>
              <span>客服中心</span>
            </li>
            <li class="two">
              <a href="/pages/my/shezhicenter">
                <img src="/static/img/my_shezhi.png" alt />
              </a>
              <span>设置</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Request from "@/common/js/request";
export default {
  data() {
    return {
      num: 4,
      active: 2,
      xiaoshow: false,
      username: "", //昵称
      mobile: "", //手机号
      headImage: "", //头像
      afterSaleNumber: "", //待退款
      pendEvaluateNumber: "", //待评价
      pendPayNumber: "", //待付款
      pendReceiveNumber: "", //待收货
      pendSendNumber: "", //待发货
      useryin: false,
      gou: 0,
      cid:''
    };
  },
  created() {},
  mounted() {
    this.cid="b94cb0c7d5544b268727b6e3a2ac9a06"
  },
  components: {},
  methods: {
     infoList() {
      let datas = {
        cmd: "infoList",
        cid: this.cid,
        pageNow: 1
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.data.result == 0) {
            for (var i in res.data.dataList) {
              if (res.data.dataList[i].read == 0) {
                this.xiaoshow = true;
              } else {
                this.xiaoshow = false;
              }
            }
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    gouserInfo() {},
    goMsg() {},
    message() {},
    gotobill() {
      // this.$router.push('/pages/fapiao/main');
    },
    gotoall() {
      this.$router.push("/pages/order/order");
    }
  }
};
</script>

<style scoped lang="stylus">
._van-tabbar {
  width: 100% !important;
}

.van-tabbar-item {
  font-size: 16px;
}

._van-tabbar-item__icon img {
  width: 18px !important;
  height: 18px !important;
}

.van-hairline--top-bottom::after {
  border: none !important;
}

.top-bar {
  width: 100%;
  display: flex;
  padding: 0.3rem 0 0.2rem;
}

.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #60c42e;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    height: 450rpx;

    .wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      padding-top: 30rpx;


      .xiaoxi {
        position: relative;
        width: 0.5rem;
        height: 0.5rem;

        img {
          width: 0.5rem;
          height: 0.5rem;
        }

        .xiaob {
          position: absolute;
          right: 0;
          top: 5px;
          background: red;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }

      .person {
        width: 100%;
        // height: 144px;
        // padding: 0.2rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          color: #fff;
          padding-left: 0.1rem;
        }

        .person_img {
          flex: 1;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;

          .imgs {
            width: 1.6rem;
            height: 1.6rem;
            font-size: 0;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .top-nav {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 3rem;
      left: 0;
      border-radius: 8px;
      // padding: 0.2rem 0;
      box-sizing: border-box;

      .top-head {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
        padding: 0 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .top-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    .bottom-nav {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 5.6rem;
      left: 0;
      border-radius: 8px;
      // padding: 0.2rem 0;
      box-sizing: border-box;

      .bottom-head {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
        padding: 0 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
      }

      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0.15rem 0 0 0;

        li {
          margin-bottom: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #333;

          img {
            width: 38px;
            height: 38px;
            margin-bottom: 0.3rem;
          }
        }

        .one {
          width: 30%;
          margin-right: 3%;
        }
      }

      .two {
        width: 22%;
        margin-right: 3%;
      }
    }
  }
}
</style>
