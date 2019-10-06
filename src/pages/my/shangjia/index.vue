<template>
  <div class="containter">
    <div class="topinfo">
      <div class="useinfo">
        <img src="/static/img/touxiang2.png" alt />
        <div class="usemain">
          <p>团长昵称：12312</p>
          <p class="shequ">绑定社区：</p>
        </div>
        <div class="change">
          <van-icon name="edit" size="14px" color="#fff" />
       <span  @click="change">编辑</span>
        </div>
      </div>
      <div class="usemoney">
        <div>
          <p>余额</p>
          <p class="nummoney">余额</p>
        </div>
       
        <span  @click="getMoney">提现</span>
        <span  @click="lookDetails">明细</span>
      </div>
    </div>

    <div class="useorder">社区订单</div>
    <div class="usemoneydetials">
      <p class="title"></p>
      <ul class="active-order">
        <li>
          <p></p>
          <p>今日</p>
          <p>有效订单(单)</p>
        </li>
        <li>
          <p></p>
          <p>今日</p>
          <p>有效成交额(元)</p>
        </li>
        <li>
          <p></p>
          <p>今日</p>
          <p>待结算佣金(元)</p>
        </li>
      </ul>
      <div class="history">
        <p>本月总收益:</p>
        <p>历史总收益:</p>
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    // 返回
    back() {},
    //  修改
    change() {},
    // 提现
    getMoney() {},
    //   明细
    lookDetails() {}
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
.containter {
}

.topinfo {
  height: 180px;
  background: #72D241;
  padding:15px 0;
  box-sizing:border-box;
}

.useinfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:30px 15px;

  img {
    width: 56px;
    height: 56px;
    margin-right: 15px;
  }

  .usemain {
    flex: 1;
    color:#fff;
    .shequ{
      font-size:13px;
    }
  }

  .change {
    display: flex;
    justify-content: centetr;
    align-items: center;
    font-size: 13px;
    color: #fff;
  }
  span{
    margin-left:5px;
  }
}

.usemoney {
  heigth:93px;
  border-radius: 15px 15px 0 0;
  background: #FDB719;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div{
    p{
      font-size: 13px;
    }
    .nummoney{
      font-size: 16px;
      font-weight: bold;

    }
  }
  span{
    width: 56px;
    height:23px;
    border-radius: 12px;
    font-size: 13px;
    color: #FFD415;
    line-height: 23px;
    text-align: center;

  }
}

.usemoneydetials {
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  ul {
    padding: 20px 0;
    border-bottom: 1px solid #333;

    li {
      width: 33%;

      p {
        line-height: 25px;
        font-size: 14px;
      }
    }
  }
}

.history {
  padding: 20px 10px;

  p {
    font-size: 14px;
    line-height: 50px;
  }
}
</style>