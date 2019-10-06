<template>
  <div class="contain" ref="list">
    <!-- <div class="head">分类</div> -->
    <div class="cascad-menu" ref="cascadMenu">
      <scroll-view  class="left-menu" scroll-y>
          <div class="left-menu-container">
            <ul>
              <li
                class="left-item"
                ref="leftItem"
                @click="selectLeft(index, $event)"
                v-for="(menu, index) in dataList"
                :class="{'current': actindex === index}"
                :key="index"
              >{{menu.name}}</li>
            </ul>
          </div>
      </scroll-view>
      <scroll-view
      class="right-menu"
        @scroll="scrollHeight"
      :scroll-into-view="contentId"
        scroll-y
      >
          <div class="right-menu-container">
            <ul>
              <li class="right-item" v-for="(menu, i) in dataList" :key="i" :id="'con_'+i">
                <div class="title">{{menu.name}}</div>
                <ul>
                  <li v-for="(item, j) in menu.child" :key="j" @click="goGoods(item.id)">
                    <img :src="item.icon" alt style="width:50px;height:50px;" />
                    <span>{{item.name}}</span>
                  </li>
                </ul>
                <div style="height:20px"></div>
              </li>
            </ul>
          </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import Request from "@/common/js/request";
export default {
  data() {
    return {
      num: 1,
      dataList: [],
      contentId:"",
     actindex: 0,
     navulHeight: 0, // 导航里ul高度
      navItemHeight: 0, // 每个导航高度
      listHeight: [], // foods内部块的高度
      contentHeight: [], // 内容区域scroll-view高度
    };
  },
  components: {
  },
  mounted() {
    this.classify();
  },
  methods: {
    goGoods(id) {
      let url='/pages/class/class_search?id='+id;
      wx.navigateTo({
        url: url,
      })
    },
    classify() {
      let classdata = {
        cmd: "goodsCategory"
      };
      Request.postRequest(classdata)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.dataList = res.dataList;

            // localStorage.setItem("classify", JSON.stringify(this.dataList));
            this.actindex = 0;
            setTimeout(()=>{

              this.calculateHeight();
            },1000)
          }
        })
        .catch(res => {});
    },
    selectLeft(index, event) {
      this.actindex =index;
      this.contentId=`con_${index}`;
    },
    scrollHeight(e) {
          // this.contentId = ''
      let scrollTop = e.target.scrollTop;
      // console.log(scrollTop)
      let length = this.listHeight.length
      if (scrollTop >= this.listHeight[length - 1] - this.contentHeight) {
        return
      } else if (scrollTop > 0 && scrollTop < this.listHeight[0]) {
        this.actindex = 0;
      }
      for (let i = 0; i < length; i++) {
        if (scrollTop >= this.listHeight[i - 1] && scrollTop < this.listHeight[i]) {
          this.actindex = i;
        }
      }

    },
    calculateHeight() {
      //  创建查询对象
     var query = wx.createSelectorQuery();
      let h = 0;
      query.selectAll('.right-item').boundingClientRect((rects) => {
        console.log(rects)
        rects.forEach(rect => {
          h += rect.height;
          this.listHeight.push(h);
        })
        console.log(this.listHeight)
      })
      query.select('.right-menu').boundingClientRect((rect) => {
        console.log(rect)
        this.contentHeight = rect.height;
      })
      query.select('.left-menu').boundingClientRect((rect) => {
        this.navulHeight = rect.height;
      })
      query.select('.left-item').boundingClientRect((rect) => {
        this.navItemHeight = rect.height;
      }).exec()
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.contain {
  width: 100%;
  height:1100rpx;
  overflow hidden;
  padding: 60px 0 0 0;
  box-sizing: border-box;

  .head {
    width: 100%;
    height: 60px;
    background: #72d141;
    line-height: 60px;
    padding: 10px 0.4rem 0;
    box-sizing: border-box;
    font-size: 15px;
    color: #333;
    font-weight: 700;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
  }

  .category {
    width: 100%;
    border-top: 1px solid #eee;
    box-sizing: border-box;

    .s_product {
      width: 100%;

      .s_nav {
        width: 25%;
        min-height: 800px;
        position: fixed;
        top: 60px;
        left: 0;
        bottom: 40px;
        overflow: hidden;

        ul {
          width: 100%;
          height: 100% !important;
          background: #f5f5f5;

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
        min-height: 500px;
        position: fixed;
        top: 60px;
        left: 25%;
        bottom: 50px;
        overflow: hidden;

        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding: 0.4rem;
          box-sizing: border-box;

          li {
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 2.5%;
            margin-bottom: 0.4rem;
            font-size: 14px;
            color: #333;

            ._img {
              width: 50px !important ;
              height: 50px !important ;
              margin-bottom: 0.3rem;
            }
          }
        }
      }
    }
  }
}

.cascad-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .left-menu {
    width: 150px;
    height: 100%;
    background: #f5f5f5;
    z-index: 999;

    .left-item {
      height: 54px;
      width: 100%;
      text-align: center;
      line-height: 54px;
      color: #333;
      font-size: 14px;

      &.current {
        background: #fff;
        color: rgb(114, 209, 65);
        width: 100%;
        border-left: 4px solid rgb(114, 209, 65);
      }
    }
  }

  .right-menu {
    width: 100%;

    .right-item {
      height: 100%;
      // margin-left: -50px;
      padding-left:.15rem;

      .title {
        border-left: 4px solid rgb(114, 209, 65);
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        padding-left: 10px;
        margin: 5px 0;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        padding:0 .2rem;
        li {
          width: 30%;
          display: flex;
          flex-direction: column;
          margin-left: 2.5%;
          align-items: center;
          margin-bottom: 0.4rem;
          font-size: 14px;
          color: #333;

          img {
            width: 1rem;
            height: 1rem;
            margin-bottom: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
