<template>
  <div class="contain">
    <div class="feixiang">
      <van-popup v-model="donghua" :close-on-click-overlay="false">
        <div class="lunhui">
          <van-loading type="spinner" color="#fff" />
          <p style="color:#fff">数据加载中...</p>
        </div>
      </van-popup>
    </div>
    <van-goods-action>
      <div class="woshi" @click="shopdian">
        <img src="/static/img/dianpu.png" alt />
        <span>店铺</span>
      </div>
      <div class="woshi" @click="kefu(sphone)">
        <img src="/static/img/kefu.png" alt />
        <span>客服</span>
      </div>
      <div class="woshi woshia" @click="collection(type)" v-if="type==false">
        <img src="/static/img/shoucang.png" alt />
        <span>收藏</span>
      </div>
      <div class="woshi woshia" @click="collection(type)" v-else>
        <img src="/static/img/shoucang2.png" alt />
        <span>取消收藏</span>
      </div>
      <van-goods-action-big-btn text="加入购物车" style="background:#FB9C1C;border-color:#FB9C1C;" @click.stop="showSku" />
      <van-goods-action-big-btn
        text="立即下单"
        style="background:#72D241;border-color:#72D241;"
        @click.stop="showSkus"
      />
    </van-goods-action>
    <van-image-preview
      v-model="show"
      :images="images"
      :show-index="false"
      :start-position="0"
      @close="guan"
    ></van-image-preview>
    <div class="middle" v-for="(v,k) in detailList" :key="k">
      <div class="g_swipe">
        <swiper @change="onChange" :autoplay="3000" circular='true' style="width:100%;">
          <swiper-item v-for="(img,inx) in v.images" :key="inx" style="width:100%;">
            <img :src="img" alt @click="clickImg($event)" class="imgs" />
          </swiper-item>
          <div class="custom-indicator" slot="indicator">{{current+1}}/{{v.images.length}}</div>
        </swiper>
        <div class="g_top">
          <img src="/static/img/xiangq_fanhui.png" alt @click="back" />
          <img src="/static/img/xiangq_gouwu.png" alt @click="order" />
        </div>
      </div>
      <div class="g_product">
        <div class="g_left">
          <div class="g_title">
            <h3>{{v.name}}</h3>
            <span>销量 {{parseFloat(v.soldNumber)}}</span>
          </div>
          <div class="g_money" v-if="v.freight!=='-1'&&v.freight!==undefined">满￥{{v.freight}}包邮</div>
          <div class="g_money">
            <span class="g_new">￥{{v.price}}</span>&nbsp;&nbsp;
            <span class="g_old" v-if="v.originalPrice!=undefined">￥{{v.originalPrice}}</span>
          </div>
        </div>
        <div class="g_right">
          <img src="/static/img/xiangq_fenxiang.png" alt @click="openShare" />
        </div>
      </div>
      <div class="copin">
        <div @click="tiaozhuan(detailList[0].sid,detailList[0].sname)" v-if="hasCouponyin==true">
          <img src="/static/img/hongbao.png" alt class="hongbao" />
          <span>领取优惠券</span>
          <img src="/static/img/jinru02.png" alt class="quyou" />
        </div>
      </div>
      <div class="goods_img">
        <h2>商品详情：</h2>
        <p>{{v.describe}}</p>
        <img :src="img" v-for="(img,inx) in v.describeImages" :key="inx" @click="clickImg($event)" />
      </div>
      <!-- 商品的规格选择开始 -->
      <van-sku
        stepper-title="数量"
        v-model="showBase"
        :sku="sku"
        :goods="goods"
        :goods-id="5"
        :sku-header-price="1"
        :quota="0"
        :hide-stock="false"
        :initial-sku="initialSku"
        :reset-stepper-on-hide="true"
        :reset-selected-sku-on-hide="true"
        :close-on-click-overlay="true"
        :disable-stepper-input="false"
        :show-soldout-sku="true"
        @sku-selected="selected"
        @buy-clicked="onAdd"
        @stepper-change="stepperchange"
        style="color:#333;z-index: 1000000"
      >
        <template slot="sku-actions" slot-scope="props">
          <div class="van-sku-actions">
            <van-button
              square
              size="large"
              type="warning"
              @click="props.skuEventBus.$emit('sku:buy')"
            >确定</van-button>
          </div>
        </template>
      </van-sku>
      <van-sku
        stepper-title="数量"
        v-model="showBases"
        :sku="sku"
        :goods="goods"
        :goods-id="5"
        :sku-header-price="1"
        :quota="0"
        :hide-stock="false"
        :initial-sku="initialSku"
        :reset-stepper-on-hide="true"
        :reset-selected-sku-on-hide="true"
        :close-on-click-overlay="true"
        :disable-stepper-input="false"
        :show-soldout-sku="true"
        @sku-selected="selected"
        @buy-clicked="onBuyClicked"
        @stepper-change="stepperchange"
        style="color:#333;z-index: 1000000"
      >
        <template slot="sku-actions" slot-scope="props">
          <div class="van-sku-actions">
            <van-button
              square
              size="large"
              type="primary"
              @click="props.skuEventBus.$emit('sku:buy')"
            >确定</van-button>
          </div>
        </template>
      </van-sku>
      <!-- 商品的规格选择结束 -->
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="beginLoading">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div ref="comment" class="comment">
          <div class="c_dis">
            <div class="c_item" v-for="(v,k) in list" :key="k">
              <img :src="v.icon" alt />
              <div class="item_right">
                <div class="right_top">
                  <div class="r_tit">
                    <span>{{v.title}}</span>
                    <span>{{v.time}}</span>
                  </div>
                  <div class="user_star">
                    <van-rate
                      v-model="v.star"
                      disabled
                      disabled-color="rgb(255,210,30)"
                      :size="14"
                    />
                    <span style="margin-left:0.2rem">{{v.star}}.0</span>
                  </div>
                </div>
                <p>{{v.content}}</p>
                <div class="c_img">
                  <!-- <template v-for="(i,index) in v.url" :key="index">
                    <img :src="i.imgs" alt>
                  </template>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </van-list>
  </div>
</template>

<script>
import Request from "@/common/js/request";
export default {
  data() {
    return {
      id:'',
      donghua: false,
      shares: {},
      type: false,
      current: 0,
      detailList: [],
      hasCouponyin: false,
      list: [],
      dataList: [],
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      totalPage: 3,
      showBase: false,
      showBases: false,
      dian: "",
      sphone: "",
      sname: "",
      shopID: "",
      SKname: "",
      val: 1,
      initialSku: {
        //默认选中
        s1: "",
        selectedNum: 1
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          // 用多少规格复制几份
          {
            k: "商品规格", // skuKeyName：规格类目名称
            v: [
              // {
              // 	id: '30349', // skuValueId：规格值 id
              // 	name: '红色', // skuValueName：规格值名称
              // 	imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
              // },
              // {
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          //规格数量
          // {
          // 	id: 2259, // skuId，下单时后端需要
          // 	price: 100, // 价格（单位分）
          // 	s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
          // 	s2: '151', // 规格类目 k_s 为 s2 的对应规格值 id
          // 	stock_num: 110,// 当前 sku 组合对应的库存
          // 	selectedNum: 3
          // }
        ],
        price: "",
        stock_num: 0, // 商品总库存
        collection_id: 2259, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false // 是否无规格商品
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "../../../static/img/tilogo.png"
      },
      show: false,
      images: []
    };
  },
  onLoad(options){
     this.id=options.id;
     console.log(options.id)
  },
  mounted() {
        wx.getStorage({
      key: 'user',
      success: function(res){
        // success
        this.cid=JSON.parse(res.data)
      },
    })
    //  this.id = this.$root.$mp.query.id;
    //  console.log(this.id)
    this.init();
    this.uinit();
   
  },
  components: {
  },
  methods: {
    guan() {
      this.images.pop();
    },
    clickImg(e) {
      this.show = true;
      if (this.images.length == 0) {
        this.images.push(e.currentTarget.src);
      }
    },
    
    onChange(index) {
      this.current =parseInt(index) ;
    },
    openShare() {
    
    },
    //分享链接点击事件
    sharelist() {
    
    },

    onRefresh: function() {
      var self = this;
      this.list = [];
      this.page = 1;
      this.totalPage = 3;
      this.beginLoading();
      setTimeout(function() {
        Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    init() {
      let self = this;
      self.detailList=[];
      self.donghua = true;
      let datas = {
        cmd: "goodsDetail",
        id: self.id,
        cid: self.cid
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.result == 0) {
            console.log(res);
            self.sphone = res.sphone;
            self.sname = res.sname;
            self.dain = res.sid;
            self.shopID = res.id;
            if (res.isCollect == true) {
              self.type = true;
            } else {
              self.type = false;
            }
            if (res.hasCoupon == 1) {
              self.hasCouponyin = true;
            } else {
              self.hasCouponyin = false;
            }
            self.detailList.push(res);
            self.goods.title = res.name;
            self.goods.picture = res.images[0];
            for (var i in res.specifyValue) {
              let arr = {};
              let arrt = {};
              arr.name = res.specifyValue[i].val;
              arr.id = res.specifyValue[i].skuId;
              self.sku.tree[0].v.push(arr);
              arrt.id = res.specifyValue[i].skuId;
              self.initialSku.s1 = res.specifyValue[0].skuId;
              self.SKname = res.specifyValue[0].val;
              arrt.stock_num = Number(res.specifyValue[i].stock);
              arrt.s1 = res.specifyValue[i].skuId;
              arrt.price = Number(res.specifyValue[i].price) * 100;
              self.sku.list.push(arrt);
              self.sku.price = Number(res.specifyValue[i].price);
              self.sku.stock_num += Number(arrt.stock_num); //总量
            }
            console.log(self.sku);
            self.donghua = false;
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    stepperchange(e) {
      this.val = e;
    },
    shopdian() {
      console.log(this.dian);
      this.$router.push({
        name: "shop_detail",
        params: {
          id: this.dain
        }
      });
      let ID = {};
      ID.id = this.dain;
      wx.setStorage({
          key: 'dianID',
          data: JSON.stringify(ID),
          success: function(res){
              // success
          },
      })
    },
    uinit() {
      let pin = {
        cmd: "goodsComment",
        id: this.id,
        pageNow: this.page
      };
      Request.postRequest(pin)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            console.log(res.dataList);
            for (var i in res.dataList) {
              self.dataList.push(res.dataList[i]);
              console.log(self.dataList);
            }
          }
        })
        .catch(res => {});
    },
    beginLoading: function() {
      if (this.page <= this.totalPage) {
        for (var i = 0; i < this.dataList.length; i++) {
          console.log("id6+" + this.dataList[i].id);

          this.list.push(this.dataList[i]);
          console.log(this.list);
        }
        this.page++;
        // // 加载状态结束
        this.loading = false;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
    collection(it) {
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        let types = 0;
        if (it == true) {
          types = 1;
        } else {
          types = 0;
        }
        console.log("收藏+" + it + ":" + types);
        let collection = {
          cmd: "collectGoods",
          id: this.id,
          cid: this.cid,
          type: types
        };
        Request.postRequest(collection)
          .then(res => {
            console.log(res);
            if (res.result == 0) {
              this.type = !this.type;
              if (this.type == true) {
                Toast("收藏成功");
              } else {
                Toast("已取消收藏");
              }
            } else if (res.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    },
    showSku() {
      this.showBase = true;
    },
    showSkus() {
      this.showBases = true;
    },
    selected(item) {
      console.log(item);
      this.initialSku.s1 = item.selectedSkuComb.s1;
      this.SKname = item.skuValue.name;
    },
    back() {
      this.$router.push("/search_product");
    },
    order() {
      this.$router.push("/carts");
      localStorage.setItem("tocar", JSON.stringify("goods_detail"));
    },
    onAdd(data) {
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        if (data.selectedSkuComb.stock_num <= 0) {
          Toast("该规格商品已售空");
        } else {
          let shoplist = {
            cmd: "addToCar",
            gid: this.id,
            cid: this.cid,
            specifications: data.selectedSkuComb.s1,
            number: this.val
          };
          console.log(shoplist);
          Request.postRequest(shoplist)
            .then(res => {
              console.log(res);
              if (res.result == 0) {
                Toast("已加入购物车");
                this.showBase = false;
                // for (let i in this.sku.list) {
                //   if (this.sku.list[i].s1 == data.selectedSkuComb.s1) {
                //     this.sku.list[i].stock_num =
                //       this.sku.list[i].stock_num - this.val;
                //     this.sku.stock_num += this.sku.list[i].stock_num;
                //   }
                // }
              } else if (res.result == "2") {
                this.$router.push("/fenghao");
              }
            })
            .catch(res => {});
        }
      }
    },
    onBuyClicked(data) {
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        if (data.selectedSkuComb.stock_num <= 0) {
          Toast("该规格商品已售空");
        } else {
          let car = [];
          let shop = {};
          let goodlist = {};
          shop.sid = this.dain;
          shop.sname = this.sname;
          goodlist.id = this.shopID;
          goodlist.name = this.goods.title;
          goodlist.images = this.goods.picture;
          goodlist.number = this.val;
          goodlist.price = data.selectedSkuComb.price / 100;
          goodlist.skuname = this.SKname;
          goodlist.skuID = data.selectedSkuComb.id;
          car[0] = shop;
          car[1] = goodlist;
          console.log(car);
          this.$router.push("/orders");
          localStorage.setItem("gocart", JSON.stringify(car));
          localStorage.setItem("Torders", JSON.stringify("goods_detail"));
        }
      }
    },
    tiaozhuan(id, name) {
      console.log(id, name);
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        //优惠券我来了
        this.$router.push({
          name: "coupon",
          params: {
            id: id,
            name: name
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
._swiper {
height:100%;
}
.feixiang .van-popup {
  background: none !important;
  overflow-y: unset !important;
}

.van-popup {
  background: #fff !important;
}

.contain {
  width: 100%;
  height: auto;
  margin-bottom: 60px;
}

.van-button--warning {
    border-color: #fb9c1c  ;
    background-color: #fb9c1c;
}

.van-swipe-item img {
  width: 100%;
  height: 100%;
}

.van-goods-action {
  z-index: 2000;
}

.van-popup {
  z-index: 100000;
}

.van-sku-row__title {
  display: none !important;
}

.middle {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.g_top {
  width: 100%;
  height: 72px;
  padding: 0 0.4rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  img {
    width: 0.8rem;
    height: 0.8rem;
  }
}

.g_swipe {
  width: 100%;
  height: 300px;
  color: #333;
  position: relative;
   .imgs{
       height 100%;
       width:100%;
   }
  .custom-indicator {
    position:absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    padding: 0.1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    font-size: 14px;
    color: #fff;
  }
}

.g_product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding:.2rem;
  box-sizing: border-box;

  .g_left {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.4rem;
    box-sizing: border-box;

    .g_title {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #333;

      h3 {
        width: 100%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 2;
      }

      span {
        color: #999;
        font-size: 12px;
        margin-top: 0.2rem;
      }
    }

    .g_money {
      font-size: 14px;
      padding-top: 0.4rem;

      .g_new {
        color: red;
      }

      .g_old {
        color: #999;
        text-decoration: line-through;
      }
    }
  }

  .g_right {
    width: 1.6rem;
    display: flex;
    border-radius: 30px;
    margin-right: 5px;

    img {
      width: 100%;
      height: 0.7rem;
    }
  }
}

.woshi {
  width: 30px;
  height: 34px;
  background: #fff;
  border-right: 1px solid #dedede;
  color: #7d7e80;
  padding: 8px 10px;
  text-align: center;

  span {
    font-size: 12px;
  }

  img {
    width: 20px;
    height: 20px;
    display: block;
    margin-left: 5px;
    opacity: 0.5;
  }
}

.woshia {
  width: 50px;
  border-right: none;

  img {
    margin-left: 15px;
  }
}

.goods_img {
  width: 100%;
  padding: 0.4rem 0;
  background: rgb(244, 244, 244);

  h2 {
    padding: 0 0.4rem;
  }

  p {
    width: 100%;
    padding: 0.5rem 0.4rem;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
  }

  img {
    width: 100%;
    display: block;
  }
}

.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .c_dis {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
    box-sizing: border-box;

    .c_item {
      width: 100%;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;

      img {
        width: 1.2rem;
        height: 1.2rem;
      }

      .item_right {
        width: 80%;
        padding-left: 0.3rem;
        display: flex;
        flex-direction: column;

        .right_top {
          width: 100%;
          height: 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 14px;
          color: #333;

          .r_tit {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .user_star {
            width: 100%;
            display: flex;
            align-items: center;
          }
        }

        p {
          font-size: 12px;
          color: #333;
          padding-top: 0.6rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .c_img {
          width: 100%;
          margin-top: 0.3rem;
          display: flex;

          img {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.3rem;
          }
        }
      }
    }
  }
}

.copin {
  background: #f4f4f4;
  padding-top: 5px;

  div {
    background: #fff;
    position: relative;
    height: 46px;

    img {
      height: 20px;
      width: 15px;
    }

    .hongbao {
      position: absolute;
      top: 12px;
      left: 20px;
    }

    span {
      position: absolute;
      top: 15px;
      left: 50px;
      font-size: 14px;
      color: #F7725C;
    }

    .quyou {
      position: absolute;
      top: 15px;
      right: 20px;
    }
  }
}
</style>
