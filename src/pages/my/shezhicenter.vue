<template>
  <div class="problem-box">
    <ul class="problem-zi">
      <li>
        <a href="/xiulogin">
          <span>修改登录密码</span>
          <span>
            <img src="/static/img/right.png" alt />
          </span>
        </a>
      </li>
      <li>
        <a href="/provisions">
          <span>服务条文</span>
          <span>
            <img src="/static/img/right.png" alt />
          </span>
        </a>
      </li>
      <li>
        <a href="/problem">
          <span>常见问题</span>
          <span>
            <img src="/static/img/right.png" alt />
          </span>
        </a>
      </li>
      <li>
        <a href="/feedback">
          <span>意见反馈</span>
          <span>
            <img src="/static/img/right.png" alt />
          </span>
        </a>
      </li>
      <li>
        <a >
          <span>系统更新</span>
          <div>
            <span style="font-size:12px;color:green" @click="xia" v-if="geng==true">最新版本:{{list}}</span>
            <span style="font-size:12px" v-else>暂无更新</span>
            <img src="/static/img/right.png" alt />
          </div>
        </a>
      </li>
      <li @click="clear">
        <a >
          <span>清除缓存</span>
          <div>
            <span v-if="zime>0">{{zime}}M</span>
            <img src="/static/img/right.png" alt />
          </div>
        </a>
      </li>
    </ul>
    <btn :content="btntext" @click="btn"></btn>

  </div>
</template>

<script>
import btn from '@/components/btn'
// import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "我的设置",
      btntext:"安全退出",
      list: "",
      url: "",
      zime: "",
      geng: false
    };
  },
  components: {
    btn
  },
  created() {
   
    this.Update();
    this.zimes();
  },
  mounted() {
   
  },
  methods: {
    Update() {
      let goCarlist = {
        cmd: "versionUpdate"
      };
      // Request.postRequest(goCarlist)
      //   .then(res => {
      //     console.log(res.data);
      //     if (res.data.result == 0) {
      //       this.geng = true;
      //       this.list = res.data.version;
      //       this.url = res.data.url;
      //     } else {
      //       this.geng = false;
      //     }
      //   })
      //   .catch(res => {});
    },
    back() {
      this.$router.push("/person");
    },
    xia() {
      
    
    },

    btn() {
      let logout = {
        cmd: "logout",
        id: this.user.cid
      };
      // Request.postRequest(logout)
      //   .then(res => {
      //     console.log(res.data);
      //     if (res.data.result == 0) {
      //       localShrefrage.clear();
      //       this.$router.push("/login");
      //     }
      //   })
      //   .catch(res => {});
    },
    zimes() {
     
    },
    clear() {
     
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.problem-zi {
  padding: 36px 10px 0;

  li {
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;

    a {
      display: flex;
      justify-content: space-between;
      color: #000;
      line-height:40px;

      img {
        width: 10px;
        height:10px;
        vertical-align: middle;
      }
    }
  }
}

.btn {
  padding: 10px 30px;
  width: 150px;
  background: green;
  border: none;
  color: #fff;
  margin: 50px 30%;
  border-radius: 10px;
}
</style>
