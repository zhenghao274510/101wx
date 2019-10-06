<template>
  <div class="list" >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="showMsg"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="msg-box">
          <ul class="msg">
            <li v-for="(v,k) in msg" :key="k" @click="goDetail(v,v.id)">
              <div class="xiaoxian">
                <img src="/static/img/xiaoxi01.png" alt />
                <b class="xiaob" v-if="v.read==0"></b>
              </div>
              <div class="msg-right">
                <div class="msg-top">
                  <h3>{{v.title}}</h3>
                  <span>{{v.adtime}}</span>
                </div>
                <div class="msg-bottom">
                  <p>{{v.content}}</p>
                  <img src="/static/img/delete.png" alt @click.stop="del(k,v.id)" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-pull-refresh>
    </van-list>
    <div class="systom" v-if="show">暂没有系统消息</div>
  </div>
</template>

<script>

// import { Toast, Dialog } from "vant";
// import Request from "@/common/js/request";

export default {
  data() {
    return {
      text: "消息",
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 2,
      page: 1,
      list: [],
      msg: [],
      show: false
    };
  },
  components: {
  },
  mounted() {
    wx.getStorage({
      key: 'Messageurl',
      success: function(res){
        // success
        this.Message=JSON.parse(res.data);
      }
    })
    // this.Message = JSON.parse(localStorage.getItem("Messageurl"));
  },
  computed: {
    showMsg() {
      return this.msg.length;
    }
  },
  mounted() {
    this.onLoad();
    var first = null;
    let self = this;
 
  },
  methods: {
    onRefresh: function() {
     
    },
    onLoad: function() {
    
   
    },
    back() {
      // this.$router.push("/");
      // localStorage.removeItem("Messageurl");
      // this.$router.push("/" + this.Message);
    },
    del(index, id) {
     
     
    },
    goDetail(v, id) {
    
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.systom {
  width: 100%;
  height: 100%;
  position: fixed;
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

  .msg-box {
    width: 100%;

    .msg {
      width: 100%;
      padding: 0 0.4rem;
      box-sizing: border-box;
      border-top: 1px solid #eee;
      margin-top: 72px;

      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .xiaoxian {
          position: relative;
          width: 15%;
          height: 15%;

          img {
            width: 100%;
            height: 100%;
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

        .msg-right {
          width: 85%;
          height: 1.3rem;
          padding: 0 0 0 0.3rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .msg-top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;

            h3 {
              font-size: 15px;
            }
          }

          .msg-bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;

            p {
              width: 80%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            img {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
