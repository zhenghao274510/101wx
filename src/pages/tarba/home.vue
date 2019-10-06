<template>
  <div class="contain">
    <van-popup v-model="donghua" :close-on-click-overlay="false">
      <div class="lunhui">
        <van-loading type="spinner" color="#808080" />
        <p style="color:#808080">数据加载中...</p>
      </div>
    </van-popup>
    <div class="head">
      <div class="city" @click="inits">
        <img src="/static/img/shouye-dingwei.png" alt />
        <span>{{city}}</span>
      </div>
      <div class="search">
        <img src="/static/img/shouye-sousuo.png" alt />
        <input type="text" placeholder="输入店铺或商品名称" @focus="goSearch" />
      </div>
      <img src="/static/img/shouye-xiaoxi.png" @click="goMessage" alt />
      <div class="dian" v-if="xiaoxi==true"></div>
    </div>
    <div ref="all" class="wrapper">
      <van-tabs
        :active="active"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        sticky
        :offset-top="10"
        @click="changeTab"
        swipeable
        animated
        :duration="0.5"
        @change="changeIng"
      >
        <van-tab :title="v.name" v-for="(v,k) in cate1" :key="k">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="addloading"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <div class="swipe">
                <swipe :images="images"></swipe>
              </div>
              <div class="navs">
                <navs :datas="datas"></navs>
              </div>
              <div class="slide-box">
                <discount
                  :recommendList="list"
                  :title="title"
                  v-if="cate1[active].name=='推荐'"
                  @shopcart="shopcart"
                ></discount>
                <discount
                  :recommendList="dataList"
                  :title="title1"
                  v-if="cate1[active].name!=='推荐'"
                  @shopcart="shopcart"
                ></discount>
                <p class="zhe_p" @click.stop="chakan(cate1[active].name)">查看更多》</p>
              </div>
              <recommendx :recommend="recommendList" :tits="tits" @shopcart="shopcart"></recommendx>
              <div class="loading" v-if="more">
                <span>没有更多了</span>
              </div>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Swipe from "@/components/swipe";
import Navs from "@/components/navs";
import Discount from "@/components/discount";
import Recommendx from "@/components/recommendx";
import BScroll from "better-scroll";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      donghua: false,
      active: 0,
      num: 0,
      title: "折扣专区",
      title1: "优质商品推荐",
      tits: "销量推荐",
      isLoading: false,
      city: "",
      images: [],
      datas: [],
      cate1: [],
      dataList: [],
      page: 1,
      totalPage: 1,
      loading: false,
      recommendList: [],
      list: [],
      id: "",
      more: false,
      xiaoxi: false,
      gou: 0,
      loading: false,
      finished: false,
    };
  },
  created() {},
  components: {
    Swipe,
    Navs,
    Discount,
    Recommendx
  },
  mounted() {
    wx.getStorage({
      key: "user",
      success: function(res) {
        // success
        this.cid = JSON.parse(res.data).cid;
        // this.infoList(this.cid);
      }
    });
    this.diao();
   
        // success
        this.id = "";
        this.active = 0;
        let obj = {};
        obj.num = this.active;
        obj.id = this.id;
        wx.setStorage({
          key: "first",
          data: JSON.stringify(obj)
        });
      
  
    this.gounum();
  },
  methods: {
    firstTO() {
      this.id = "";
      this.active = 0;
      this.initLoad(this.id);
    },
    gounum() {
      wx.getStorage({
        key: "gouserInfo",
        success: function(res) {
          // success
          this.gou = JSON.parse(res.data);
        }
      });

      let datas = {
        cmd: "cartCount",
        cid: this.cid
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.gou = res.totalCount;
            wx.setStorage({
              key: "gouNUm",
              data: JSON.stringify(this.gou)
            });
          }
        })
        .catch(res => {});
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.addRecommend();
        Toast("刷新完成");
        this.initLoad(this.id);
      }, 500);
    },
    addloading() {
      // 异步更新数据
      setTimeout(() => {
        if (this.page < this.totalPage) {
          this.page++;
          this.addRecommend();
          this.loading = false;
        } else {
          this.loading = false;
        }
      }, 2000);
    },
    diao() {
      let self = this;
      self.donghua = true;
      //调用一级分类导航
      wx.getStorage({
        key: "cateTAB",
        success: function(res) {
          // success
          self.cate1 = JSON.parse(res.data);
        }
      });
      let datas = {
        cmd: "goodsCategoryInit",
        uid: self.cid
      };
      Request.postRequest(datas)
        .then(res => {
          // console.log(res);
          if (res.result == 0) {
            self.cate1 = [{ id: "", name: "推荐" }];
            for (let i = 0; i < res.dataList.length; i++) {
              self.cate1.push(res.dataList[i]);
              // console.log(self.cate1);
            }

            console.log(self.cate1);

            wx.setStorage({
              key: "cateTAB",
              data: JSON.stringify(this.cate1)
            });
            wx.getStorage({
              key: "first",
              success: function(res) {
                self.id = JSON.parse(res.data).id;
                self.active = JSON.parse(res.data).num;

                // success
              },
              fail: function() {
                self.id = self.cate1[0].id;
              }
            });

            self.initLoad(self.id);
          }
        })
        .catch(res => {});
    },
    inits() {},
    init() {},
    initLoad(id) {
      //我是来调取首页内容的
      if (id == "") {
        wx.getStorage({
          key: "rotationCharts",
          success: function(res) {
            // success
            self.images = JSON.parse(res.data);
          }
        });
        wx.getStorage({
          key: "childs",
          success: function(res) {
            // success
            self.datas = JSON.parse(res.data);
          }
        });
        wx.getStorage({
          key: "discount",
          success: function(res) {
            // success
            self.list = JSON.parse(res.data);
          }
        });
        wx.getStorage({
          key: "orders",
          success: function(res) {
            // success
            self.recommendList = JSON.parse(res.data);
          },
        });
      }
        //初始化默认显示第一个一级分类
        if (id == undefined) {
          id = "";
        }
        let self = this;
        let datas = {
          cmd: "recommendGoods",
          id: id,
          pageNow: this.page
        };
        console.log(datas);
        Request.postRequest(datas)
          .then(res => {
            console.log(res, "切换数据");
            if (res.result == 0) {
              if (id == "") {
                self.datas = res.child;
                wx.setStorageSync('childs', JSON.stringify(self.datas))
                self.images = res.rotationChart;
                wx.setStorageSync('rotationCharts', JSON.stringify(self.images))
                self.totalPage = res.totalPage;
                self.recommendList = res.order;
                wx.setStorageSync('orders', JSON.stringify(self.recommendList))
              } else {
                self.datas = res.child;
                wx.setStorageSync('child', JSON.stringify(self.datas))
                self.images = res.rotationChart;
                wx.setStorageSync('rotationChart', JSON.stringify(self.images))
                self.dataList = res.discount;
                if (self.dataList !== undefined) {
                  wx.setStorageSync('discount', JSON.stringify(self.dataList))
                }
                self.totalPage = res.totalPage;
                self.recommendList = res.order;
                wx.setStorageSync('order', JSON.stringify(self.recommendList))
              }
              self.donghua = false;
            }
          })
          .catch(res => {});
        //打折商品调用
        let discount = {
          cmd: "discountGoods",
          pageNow: 1
        };
        Request.postRequest(discount)
          .then(res => {
            console.log(res);
            if (res.result == 0) {
              self.list = res.discount;
              wx.setStorageSync('discount', JSON.stringify(self.list))
              this.loading = false;
              this.more = true;
            }
          })
          .catch(res => {});
      },
    
    addRecommend() {
      let self = this;
      if (self.id == undefined) {
        self.id = "";
      }
      let datas = {
        cmd: "recommendGoods",
        id: self.id,
        pageNow: self.page
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log("加油" + res);
          if (res.result == 0) {
            if (self.page <= res.totalPage) {
              self.loading = true;
              for (let i = 0; i < res.order.length; i++) {
                self.recommendList.push(res.order[i]);
              }
              self.page++;
              // 加载状态结束
              self.loading = false;
            } else {
              self.loading = false;
              self.more = true;
            }
          }
        })
        .catch(res => {});
    },
    clear() {
      this.page = 1;
      this.loading = false;
      this.more = false;
      this.list = [];
      this.datas = [];
      this.images = [];
      this.dataList = [];
      this.recommendList = [];
    },
    changeTab(k) {
      this.clear();
      this.id = this.cate1[this.active].id;
      console.log(this.id)
      this.initLoad(this.id);
      let obj = {};
      obj.num = this.active;
      obj.id = this.id;
      wx.setStorageSync('first', JSON.stringify(obj))
    },
    changeIng(k) {
      let ind = k.target.index;
      this.clear();
      this.id = this.cate1[ind].id;

      this.initLoad(this.id);
      this.active = ind;
      let obj = {};
      obj.num = this.active;
      obj.id = this.id;
      wx.setStorageSync('first', JSON.stringify(obj))
    },
    goSearch() {
      this.$router.push("/pages/search/index");
    },
    goMessage() {
      wx.setStorageSync('Messageurl', JSON.stringify("first"))
      this.$router.push("/pages/my/message");
    },
    infoList(id) {
      let datas = {
        cmd: "infoList",
        cid: id,
        pageNow: 1
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.result == 0) {
            console.log(res.dataList);
            for (var i in res.dataList) {
              if (res.dataList[i].read == 0) {
                this.xiaoxi = true;
              } else {
                this.xiaoxi = false;
              }
            }
          }
        })
        .catch(res => {});
    },
    chakan(v) {
      console.log(v);

        let params = {};
      params.v = v;
      params.id = this.id;
       wx.setStorageSync('params',  JSON.stringify(params));
      this.$router.push('/pages/discount/discountList');
    },
    //购物车图标
    shopcart(v) {
      console.log(v)
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
             wx.showToast({
                title: '添加购物车成功'
              })
              this.gounum();
              this.donghua = false;
            } else if (res.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    }
  
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// @import '../common/stylus/variable';
input:-webkit-input-placeholder {
  color: #fff;
}

input:-moz-placeholder {
  color: #fff;
}

input::-moz-placeholder {
  color: #fff;
}

input::-ms-input-placeholder {
  color: #fff;
}

.zhe_p {
  width: 100%;
  line-height: 1rem;
  font-size:12px;
  color:#999999
  text-align: center;
}

.loading {
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0.4rem 0.1rem;
  box-sizing: border-box;
  background: rgb(114, 209, 65);
  z-index: 9999;

  .dian {
    position: fixed;
    top: 24px;
    right: 17px;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background: red;
  }

  .city {
    width: auto;
    height: 50px;
    display: flex;
    align-items: center;

    img {
      width: 0.4rem;
      height: 0.5rem;
    }

    span {
      font-size: 14px;
      color: #fff;
      margin-left: 0.3rem;
    }
  }

  .search {
    width: 65%;
    height: 36px;
    border-radius: 50px;
    background: rgb(169, 228, 138);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 0.5rem;
      height: 0.5rem;
    }

    input {
      width: 60%;
      font-size: 14px;
      color: #fff;
      background: none;
      border: none;
      margin-left: 0.3rem;
    }
  }

  img {
    width: 0.4rem;
    height: 0.5rem;
  }
}

.contain {
  width: 100%;
  height: 100%;
  padding-top: 60px;
}

.wrapper {
  width: 100%;
  height: auto;

  .swipe {
    width: 100%;
    height: 180px;
  }

  .navs {
    width: 100%;
    display: flex;
  }

  .slide-box {
    width: 100%;
    background: rgb(250, 250, 250);

    h3 {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #333;
    }

    .slide-list {
      width: 100%;
      display: flex;
      min-height: 5.5rem;
    }
  }
}
</style>
