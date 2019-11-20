<template>
  <div class="container" id="mine">
    <div class="main">
      <div class="top">
        <div class="avatar">
            <img :src="data.avatar || user_img" />
        </div>
        <h3>{{data.username}}</h3>
        <p @click="$router.push('/capitalDetails')">
          可用资金
          <span>{{data.usercancash}}</span>
        </p>
        <div class="btn-group">
          <div class="btn" @click="go('/wapzhifu.php#http')">入金</div>
          <div class="btn" @click="$router.push('/withdraw')">出金</div>
        </div>
      </div>
      <van-cell-group class="cell-group">
        <van-cell
          :title="item.name"
          :icon="item.icon"
          v-for="(item,index) in menu"
          :key="index"
          @click="go(item.path)"
          is-link
          size="large"
        />
      </van-cell-group>
      <van-cell-group class="cell-group">        
        <van-cell title="退出"  size="large" icon="close" is-link @click="logout"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import user_img from "@/assets/images/default.png";
export default {
  name: "mine",
  data() {
    return {
      user_img: user_img,
      menu: [
        { name: "交易明细", path: "/transaction", icon: "balance-list-o" },
        { name: "账户资料", path: "/setting", icon: "description" },
        { name: "推广链接", path: "/", icon: "gift-card-o" },
        { name: "身份认证", path: "/accountappeal", icon: "idcard" },
        { name: "在线客服", path: "/aboutDetails/4", icon: "service-o" },
        // { name: "我的消息", path: "/wapxiaoxi.php#http", icon: "comment-o" },
        { name: "关于我们", path: "/aboutList", icon: "friends-o" }
      ],
      data:{}
    };
  },
  created() {
    this.$SERVER.usermoney().then(res=>{
      this.data = res.data
    })
  },
  mounted() {},
  methods: {
    go(url){
      if(url.indexOf('http')>-1){
        this.$METHOD.jump_url(url)
      }else{
        this.$router.push(url)
      }
    },
    logout(){
      this.$SERVER.logout()
      // this.$METHOD.delCookie('PHPSESSID')
      this.$router.push('/')
      this.$toast.success('退出成功！')
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  padding: 15px 0;
  background-color: #fe6a50;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h3 {
    font-size: 12px;
    line-height: 18px;
    color: #ffffff;
  }
  p {
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    margin: 10px 0;
    span {
      font-family: Bahnschrift;
    }
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 100px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background-color: #f54838;
      box-shadow: 1px 2px 2px 0px rgba(86, 7, 7, 0.27);
      border-radius: 3px;
      margin: 0 20px;
      font-size: 15px;
      color: #ffffff;
      &:last-child {
        background-color: #fbc02d;
        box-shadow: 1px 2px 2px 0px rgba(98, 71, 5, 0.27);
      }
    }
  }
}
.cell-group {
  margin-top: 15px;
}
</style>

