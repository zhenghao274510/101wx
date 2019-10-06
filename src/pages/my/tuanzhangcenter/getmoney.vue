<template>
  <div class='get-money'>
     <ul>
       <li>
         <h4>发行卡:</h4> <input type="text" placeholder="列如:中国银行">
       </li>
        <li>
         <h4>持卡人:</h4> <input type="text" placeholder="请输入持卡人姓名">
       </li>
        <li>
         <h4>提现账户：</h4> <input type="text" placeholder="请输入提现账户">
       </li>
     </ul>
     <div class="money-info">
          <h4>提现金额：</h4>
          <div><span>￥</span> <input type="text" placeholder="输入提现金额"></div>
          <p>本次提现扣除手续费:  <span>￥10元</span>  </p>
           <h4>备注：</h4>
          <div><input type="text" placeholder="请输入备注信息"></div>
     </div>
     <div class="end">

     </div>
        <btn :content="sub" ></btn>

        

  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import btn from '@/components/btn'

export default {
  data() {
    return {
      sub:'申请提现'
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
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  //方法集合
  methods: {
     back(){}
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
  activated() {},
}
</script>
<style scoped lang="stylus">
h4{
  font-size:14px;
  color: #333;
  font-weight bold;
}
.get-money{
  padding 0 15px ;
  ul{
    li{
      display: flex;
      align-items: center;
      height: 45px;
      box-sizing: border-box;
      input{
        flex 1;
        height: 45px;
        border-bottom: 1px solid #F0F0F0;
        font-size: 13px;
        color: #999;
        padding-left:20px;
      }
      h4{
        width: 90px;
      }
    }
  }
  .money-info{
     div{
       border-bottom: 1px solid #E7E7E7;
       position relative;
        span{
          font-size: 18px;
          font-weight: bolder;
          position absolute;
          top:50%;
          left 0;
          transform translateY(-50%);
        }
        input{
          height: 45px;
          font-size: 14px;
          color: #999999;
          padding-left:30px;
        }
     }
     p{
       color #999999;
       font-size 14px;
       line-height 25px;
     }
     h4{
       margin 20px 0;
     }
  }
}
.end{
  height 50px;
}

</style>