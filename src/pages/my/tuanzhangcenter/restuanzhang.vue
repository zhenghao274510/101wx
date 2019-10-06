<template>
  <div class="rescenter">
    <div class="res-container">
      <h4 class="title">你不是团长,请填写以下信息进行申请</h4>
      <ul class="star">
        <li>
          <span>小区名称：</span>
          <input type="text" placeholder="请输入小区名称" />
        </li>
         <li>
          <span>小区地址：</span>
          <input type="text" placeholder="请输入小区地址"  />
        </li>
         <li>
          <span>详细地址：</span>
          <input type="text" placeholder="请输入详细地址"  />
        </li>
         <li>
          <span>团长昵称：</span>
          <input type="text" placeholder="请输入团长昵称"  />
        </li> <li>
          <span>真实姓名：</span>
          <input type="text" placeholder="请输入您的真实姓名"  />
        </li> <li>
          <span>联系方式：</span>
          <input type="text" placeholder="请输入您的联系方式"  />
        </li> <li>
          <span>身份证号：</span>
          <input type="text" placeholder="请输入您的身份证号"  />
        </li>
       
      </ul>
      <div class="persion">
        <h4>身份证照片</h4>
        <ul class="upimg">
          <li>
            <img src="" alt="">
            <input type="file">
            <span>+</span>
            <p>身份证正面</p>
          </li>
           <li>
            <img src="" alt="">
            <input type="file">
            <span>+</span>
            <p>身份证反面</p>
          </li>
           <li>
            <img src="" alt="">
            <input type="file">
            <span>+</span>
            <p>手持身份证照</p>
          </li>
        </ul>
      </div>
      <div class="green">
        <div class="choose">
          <van-icon name="circle" size="15px" v-if="check" />
          <van-icon name="certificate" size="15px" color="#72D241" v-else />
        </div>
        <p>我已同意 </p>
        <i class="greenxieyi">《用户协议》</i>
      </div>
      <btn :content="sub"></btn>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import btn from '@/components/btn'
export default {
  data() {
    return {
      text: "团长招募",
      check:false,
      sub:'提交'
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    btn
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    back() {}
  },
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  befopxount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang="stylus">
.res-container{
  padding 15px;
  .title{
    font-size 16px;
    line-height 35px;
  }
  .star{
    li{
      display flex;
      align-items center;
      line-height 45px;
      border-bottom:1px solid #F0F0F0;
      span{
        display block;
        font-size 14px;
        color #333333;
        font-weight bold;
      }
      input{
        flex 1;
        font-size 13px;
        padding-left 15px;
        color #999999;
      }
    }
  }
  .upimg{
    font-size:0;
    background:#fff;
    display:flex;
    padding:15px 0;
    li{
      width 100px;
      height 100px;
      border 1px solid  #CCCCCC;
      position relative;
      margin-left:10px;
      input{
        width 100px;
        height 100px;
        position absolute;
        top 0;
        opacity 0;
        z-index 999;

      }
      img{
        width 100px;
        height 100px;
        position absolute;
        top 0;
      }
      span{
        width 20px;
        height 20px;
        position absolute;
        top 50%;
        left 50%;
        transform translate(-50%,-50%);
        font-size 20px;
      }
      p{
        position absolute;
        bottom -30px;
        left 50%;
        transform translateX(-50%);
        font-size 13px;
        color #333;
        width 65px;
      }
    }
  }
  .green{
    display: flex;
    height:25px;
    line-height:25px;
    align-items:center;
    margin-top 15px;
     
     font-size:0;
    .choose{
      width 15px;
      height 15px;
      position relative;
      margin-right:10px;
       i{
         position:absolute;
         top:0;
         left:0;
        
       }
    }
    p{
      font-size 12px;
     
    }
    .greenxieyi{
        color #72D241;
        font-size 12px;
        margin-left 10px;
      }
  }

}
.persion{
  margin-top 10px;
  h4{
    font-size 14px;

  }
}
</style>