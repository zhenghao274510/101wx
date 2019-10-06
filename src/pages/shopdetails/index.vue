<template>
  <div class="list" ref="list">
    <div class="search" ref="search">
      <div class="search_input">
        <van-search placeholder="请输入搜索关键词" v-model="value1" />
      </div>
      <span @click="goSearch">搜索</span>
    </div>
    <shop-header
      ref="shop"
      @goCoupon="goCoupon"
      :dataList="shopList"
      :store="store"
      @stores="stores"
    ></shop-header>
    <div class="line" ref="line"></div>
    <ul class="fenlei">
      <li
        :class="{'add':laia==index}"
        v-for="(item,index) in titleList"
        :key="index"
        @click="shopper(index)"
      >{{item}}</li>
    </ul>
    <div
      class="cascad-menu"
      ref="cascadMenu"
      v-if="laia==0"
      :class="ai==true?'cascad-menua':'cascad-menus'"
    >
      <scroll-view ref="leftMenu" scroll-y class="left-menu">
        <div class="left-menu-container">
          <ul>
            <li
              class="left-item"
              ref="leftItem"
              @click="selectLeft(index, $event)"
              v-for="(menu, index) in list"
              :class="{'current': actindex === index}"
              :key="index"
            >
              <p class="text">{{menu.categoryName}}</p>
            </li>
          </ul>
        </div>
      </scroll-view>
      <scroll-view class="right-menu" @scroll="scrollHeight" :scroll-into-view="contentId" scroll-y>
        <div class="right-menu-container">
          <ul>
            <li class="right-item" v-for="(menu, i) in list" :key="i" :id="'con_'+i">
              <div class="title">{{menu.categoryName}}</div>
              <ul>
                <li v-for="(item, j) in menu.productList" :key="j" @click="goGoods(item.id)">
                  <div class="data-wrapper">
                    <img :src="item.image" alt />
                    <div class="s_right">
                      <div class="s_top">
                        <span class="shop_name">{{item.name}}</span>
                        <span style="color:#999" class="shop_num">已售：{{item.soldNumber}}份</span>
                      </div>
                      <p>{{item.describe}}</p>
                      <div class="s_price">
                        <span>￥{{item.price}}</span>
                        <span
                          style="text-decoration: line-through;color: #999;margin-left: 0.2rem;"
                        >￥{{item.originalPrice}}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div style="height:20px"></div>
            </li>
          </ul>
        </div>
      </scroll-view>
    </div>
    <div v-if="laia==1">
      <div class="rate" ref="rates">
        <div class="r_left">
          <span style="font-size: 40px">{{stars}}</span>
          <span>综合评分</span>
        </div>
        <div class="r_right">
          <span>商品评分：</span>
          <van-rate v-model="star" disabled disabled-color="rgb(255,210,30)" />
        </div>
      </div>
      <div ref="comment" class="comment">
        <scroller :on-infinite="infinite" ref="scroller" v-if="!noComments">
          <div class="c_dis">
            <div class="c_item" v-for="(v,k) in userComments" :key="k">
              <img :src="v.headImage" alt />
              <div class="item_right">
                <div class="right_top">
                  <div class="r_tit">
                    <span>{{v.nickName}}</span>
                    <span>{{v.createTime}}</span>
                  </div>
                  <div class="user_star">
                    <van-rate
                      v-model="v.star"
                      disabled
                      disabled-color="rgb(255,210,30)"
                      :size="14"
                    />
                    <span style="margin-left:0.2rem">{{v.stars}}.0</span>
                  </div>
                </div>
                <p>{{v.content}}</p>
                <div class="c_img" v-if="v.images.length > 0">
                  <img :src="imgs" v-for="imgs in v.images" alt :key="imgs" />
                </div>
              </div>
            </div>
          </div>
        </scroller>
        <div class="noComment" v-if="noComments">暂没有该商家的评论</div>
      </div>
    </div>
    <div class="s_shop" v-if="laia==2">
      <div class="shop_box" ref="shopping">
        <div class="self_box" ref="shopper">
          <div v-for="(v,k) in shops" :key="k">
            <div class="self_top">
              <h3 class="shop_zi">商家环境</h3>
              <div class="self_img">
                <img :src="img" v-for="(img,index) in v.imglist" alt :key="index" />
              </div>
              <p>{{v.introduction}}</p>
            </div>
            <ul>
              <li>
                <div class="self_name shop_zi">商家名称</div>
                <div class="self_content">{{v.name}}</div>
              </li>
              <li>
                <div class="self_name shop_zi">商家地址</div>
                <div class="self_content">{{v.address}}</div>
              </li>
              <li>
                <div class="self_name shop_zi">商家电话</div>
                <div class="self_content">{{v.mobile}}</div>
              </li>
            </ul>
            <div class="self_top" style="border-bottom:none">
              <h3 class="shop_zi">营业资质</h3>
              <div class="self_img">
                <img :src="item" v-for="(item,index) in v.businessLicence" alt :key="index" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from "@/components/shopHeader";
import Request from "@/common/js/request";
// import Scroll from "@/components/scroll1";
export default {
  data() {
    return {
      titleList: ["商品", "评价", "商家"],
      ai: false,
      loading: false,
      more: false,
      finished: false,
      laia: 0,
      page: 1,
      totalPage: 5,
      star: 0,
      stars: 0,
      list: [],
      active: 0,
      value1: "",
      shopList: [],
      store: "1",
      dataLists: [],
      noComments: false,
      comments: [],
      userComments: [],
      shops: [],
      cPage: 1,
      cTotalPage: 3,
      cateId: "",
      user: "",
      shopID: "",
      id: "",

      //  两栏联动数据
      contentId: "",
      actindex: 0,
      navulHeight: 0, // 导航里ul高度
      navItemHeight: 0, // 每个导航高度
      listHeight: [], // foods内部块的高度
      contentHeight: [] // 内容区域scroll-view高度
    };
  },
  onLoad(options) {
    this.id = options.id;
    console.log(this.id);
  },
  mounted() {
    wx.getStorage({
      key: "user",
      success: function(res) {
        // success
        this.cid = JSON.parse(res.data);
      }
    });
    this.init();
  },
  components: {
    ShopHeader
  },
  methods: {
    init() {
      this.shopList = [];
      this.actindex = 0;
      (this.contentId = ""),
        (this.navulHeight = 0),
        (this.navItemHeight = 0),
        (this.listHeight = []),
        (this.contentHeight = []);
      let self = this;
      let datas = {
        cmd: "enterShopInfo",
        sid: this.id,
        cid: this.cid
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res, "商家信息");
          if (res.result == 0) {
            this.shopID = res.id;
            res.star = Number(res.stars);
            self.shopList.push(res);
            if (res.coupon.id == undefined) {
              self.ai = true;
            } else {
              self.ai = false;
            }
            console.log(self.ai);
            self.user = res.name;
            if (res.collect) {
              self.store = "0";
            } else {
              self.store = "1";
            }
            self.bgeinLoading();
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    stores() {
      if (this.cid == null) {
        this.$router.replace("/login");
      } else {
        if (this.store == "1") {
          this.store = "0";
        } else if (this.store == "0") {
          this.store = "1";
        }
        let datas = {
          cmd: "collectShop",
          sid: this.id,
          cid: this.cid,
          type: this.store
        };
        Request.postRequest(datas)
          .then(res => {
            if (res.result == 0) {
              if (this.store == 0) {
                Toast("收藏成功");
              } else {
                Toast("取消收藏");
              }
            } else if (res.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    },
    goCoupon(id) {
      this.$router.push({
        name: "coupon",
        params: {
          id: id,
          name: this.user
        }
      });
    },
    goGoods(id) {
      console.log(id);
      this.$router.push({
        name: "goods_detailnear",
        params: {
          id: id,
          name: this.user,
          shopid: this.id
        }
      });
    },
    bgeinLoading: function() {
      let datas = {
        cmd: "selectShopGoods",
        id: this.cateId,
        sid: this.shopID,
        pageNow: this.page
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res.dataList);
          if (res.result == 0) {
            if (res.dataList != undefined) {
              this.list = res.dataList;
              setTimeout(() => {
                this.calculateHeight();
              }, 1000);
            }
          }
        })
        .catch(res => {});
    },
    back() {
      this.$router.push("/near_shop");
    },

    infinite() {
      let self = this;
      let datas = {
        cmd: "evaluateShopGoods",
        id: this.id,
        pageNow: this.cPage
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.data.result == 0) {
            self.star = Number(res.average);
            self.stars = res.average;
            if (res.dataList.length > 0) {
              self.noComments = false;
              if (self.cPage <= res.totalPage) {
                for (let i = 0; i < res.dataList.length; i++) {
                  for (let i in res.dataList) {
                    res.dataList[i].star = Number(res.dataList[i].stars);
                  }
                  self.userComments.push(res.dataList[i]);
                  console.log(self.userComments);
                }
                self.cPage++;
                self.$refs.scroller.finishInfinite(self.cPage <= res.totalPage);
              } else {
                self.$refs.scroller.finishInfinite(true);
              }
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            } else {
              self.noComments = true;
            }
          }
        })
        .catch(res => {});
    },
    shopper(ind) {
      switch (ind) {
        case 0:
          this.laia=0;
          this.bgeinLoading();
          break;
        case 1:
          this.laia=1;
          this.infinite();
          break;
        case 2:
          this.laia=2;
          this.getShopinfo();
          break;
      }
    },
    getShopinfo() {
      let self = this;
      self.shops = [];
      let datas = {
        cmd: "businessInfo",
        id: self.id
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            self.shops.push(res);
            for (var i in self.shops[0].images) {
              var arr = self.shops[0].images[i].split("|");
              let arrlist = {};
              arrlist = arr[0];
              console.log(arrlist);
              var imglist = [];
              imglist.push(arrlist);
              self.shops[0].imglist = imglist;
            }
            console.log(self.shops);
            setTimeout(() => {
              if (!self.shopping) {
                self.shopping = new BScroll(self.$refs.shopping, {
                  startY: 0,
                  click: true,
                  scrollY: true,
                  scrollX: false,
                  eventPassthrough: "horizontal"
                });
              }
            }, 30);
          }
        })
        .catch(res => {});
    },
    changeShop(ind, id) {
      this.itemIndex = ind;
      this.cateId = id;
      this.clear();
      this.bgeinLoading();
    },
    selectLeft(index, event) {
      this.actindex = index;
      this.contentId = `con_${index}`;
    },
    scrollHeight(e) {
      // this.contentId = ''
      let scrollTop = e.target.scrollTop;
      // console.log(scrollTop)
      let length = this.listHeight.length;
      if (scrollTop >= this.listHeight[length - 1] - this.contentHeight) {
        return;
      } else if (scrollTop > 0 && scrollTop < this.listHeight[0]) {
        this.actindex = 0;
      }
      for (let i = 0; i < length; i++) {
        if (
          scrollTop >= this.listHeight[i - 1] &&
          scrollTop < this.listHeight[i]
        ) {
          this.actindex = i;
        }
      }
    },
    calculateHeight() {
      //  创建查询对象
      var query = wx.createSelectorQuery();
      let h = 0;
      query.selectAll(".right-item").boundingClientRect(rects => {
        console.log(rects);
        rects.forEach(rect => {
          h += rect.height;
          this.listHeight.push(h);
        });
        console.log(this.listHeight);
      });
      query.select(".right-menu").boundingClientRect(rect => {
        console.log(rect);
        this.contentHeight = rect.height;
      });
      query.select(".left-menu").boundingClientRect(rect => {
        this.navulHeight = rect.height;
      });
      query
        .select(".left-item")
        .boundingClientRect(rect => {
          this.navItemHeight = rect.height;
        })
        .exec();
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.noComment {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #333;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 25;
}

.list {
  width: 100%;
  height: 100%;

  .search {
    width: 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    img {
      width: 0.3rem;
      height: 0.5rem;
    }

    .search_input {
      width: 80%;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }

  .s_product {
    width: 100%;
    position: relative;

    .s_nav {
      width: 25%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      background: #f5f5f5;

      ul {
        width: 100%;

        li {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          color: #333;
        }
      }
    }

    .s_list {
      width: 75%;
      position: absolute;
      top: 0;
      left: 25%;
      bottom: 0;
      overflow: hidden;
    }
  }

  .fenlei {
    display: flex;
    justify-content: space-around;
    font-size: 18px;

    .add {
      border-bottom: 2px solid green;
      color: green;
    }
  }

  .rate {
    width: 100%;
    height: 90px;
    margin-top: 5px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .r_left {
      width: 30%;
      height: 70%;
      z-index: 99;
      padding: 0.4rem;
      padding-right: 0;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      color: #333;
      border-right: 2px solid #eee;
    }

    .r_right {
      width: 70%;
      height: 70%;
      padding: 0.4rem;
      padding-left: 0;
      background: #f5f5f5;
      z-index: 99;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #333;
    }
  }

  .comment {
    width: 100%;
    position: relative;
    min-height: 320px;

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
          border-radius: 50%;
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

  .s_shop {
    width: 100%;
    min-height: 500px;
    position: relative;

    .shop_box {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;

      .self_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        color: #333;

        .self_top {
          width: 100%;
          padding: 0.3rem 0.4rem;
          box-sizing: border-box;
          border-bottom: 12px solid #eee;

          h3 {
            width: 100%;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #333;
          }

          .self_img {
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            img {
              width: 2.4rem;
              height: 2.4rem;
              margin-right: 0.4rem;
              margin-top: 0.4rem;
            }
          }

          p {
            width: 100%;
            font-size: 12px;
            margin-top: 0.5rem;
            color: #333;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 20px;
          }
        }

        ul {
          width: 100%;
          display: flex;
          flex-direction: column;

          li {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #333;
            border-bottom: 1px solid #eee;
            padding: 0.3rem 0.4rem;
            box-sizing: border-box;

            .self_name {
              width: 40%;
            }

            .self_content {
              width: 60%;
              color: #999;
              text-align: right;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}

.shop_zi {
  font-weight: 700;
}

.cascad-menua {
  top: 255px;
}

.cascad-menus {
  top: 335px;
}

.cascad-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  position: absolute;
  bottom: 0;

  .left-menu {
    flex: 0 0 100px;
    width: 100px;
    background: #f5f5f5;
    z-index: 999;

    .left-item {
      height: 54px;
      width: 100%;
      text-align: center;

      &.current {
        background: #fff;
        border-left: 4px solid rgb(114, 209, 65);
      }

      .text {
        width: 100%;
        line-height: 54px;
      }
    }
  }

  .right-menu {
    width: 100%;

    .right-item {
      height: 100%;

      .title {
        border-bottom: 1px solid #ccc;
        height: 30px;
        line-height: 35px;
        padding-left: 10px;
      }

      .data-wrapper {
        display: flex;
        align-items: center;
        padding: 0.3rem;
        border-bottom: 1px solid #eee;

        img {
          width: 2rem;
          height: 2rem;
        }

        .s_right {
          width: 160px;
          height: 1.8rem;
          padding-left: 0.2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .s_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #333;

            .shop_name {
              width: 50%;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 20px;
              line-height: 20px;
            }
          }

          p {
            width: 100%;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 12px;
            color: #999;
          }

          .s_price {
            width: 100%;
            display: flex;
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>
