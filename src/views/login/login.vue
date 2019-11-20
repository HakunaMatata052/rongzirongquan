<template>
  <div id="login">
    <div class="main">
      <div class="close">
        <van-icon name="cross" color="rgba(204,204,204,1)" @click="$router.go(-1)" />
      </div>
      <h1>
        登录
        <small @click="$router.push('/register')">用户注册</small>
      </h1>
      <van-cell-group class="cell-group" :border="false">
        <van-field
          v-model="form.user_account"
          clearable
          placeholder="请输入手机号"
          class="field"
          type="number"
          pattern="[0-9]*"
          :border="false"
          autofocus="autofocus"
        ></van-field>
        <van-field
          v-model="form.user_pwd"
          type="password"
          placeholder="请输入密码"
          class="field"
          :border="false"
        ></van-field>
      </van-cell-group>
      <span class="forget" @click="$router.push('/resetPassword')">忘记密码？</span>
      <van-button
        type="primary"
        size="large"
        :loading="loginLoading"
        loading-type="spinner"
        @click="loginFn"
        class="loginbtn"
        :hairline="false"
      >立即登录</van-button>
    </div>
  </div>
</template>
<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "login",
  components: {
    navBar
  },
  data() {
    return {
      form: {
        user_account: "",
        user_pwd: ""
      },
      loginLoading: false
    };
  },
  created() {
    if (this.$METHOD.getCookie("token")) {
      this.$router.push("/");
    }
  },
  methods: {
    loginFn() {
      var that = this;
      if (!regexUtil.isPhone(that.form.user_account)) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (that.form.user_pwd.length == 0) {
        this.$toast.fail("请填写密码");
        return;
      }
      that.loginLoading = true;
      that.$SERVER
        .login(that.form)
        .then(res => {
          that.$toast.success("登录成功");
          that.$METHOD.setStore("token", res.data.userinfo.token);
          that.$store.state.token = res.data.userinfo.token;
          that.$store.state.userInfo = res.data.userinfo_first;
          that.$store.state.isActive = res.data.userinfo_first.setting;
          that.loginLoading = false;
          var push = api.require("push");
          push.bind(
            {
              userName: res.data.userinfo_first.user_nickname,
              userId: res.data.userinfo_first.use_rid
            },
            function(ret, err) {}
          );
          that.$router.go(-1);
        })
        .catch(res => {
          that.loginLoading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
#login .van-field__control {
  color: rgba(153, 153, 153, 1);
}
.top {
  background: rgba(255, 255, 255, 0);
}
#login {
  width: 100%;
  height: 100%;
  .close {
    margin-bottom: 75px;
    margin-left: -30px;
  }
  .logoImg {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    margin-top: 65px;
  }
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .main {
    background: #fff;
    border-radius: 20px;
    margin: 45px 20px 0 20px;
    width: 73%;
    padding: 0 32px;
  }
  h1 {
    font-size: 31px;
    font-weight: 800;
    color: rgba(51, 51, 51, 1);
    margin: 24px 0 20px 0;
    text-align: left;
    small {
      font-size: 17px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
  }
  .van-cell {
    padding: 0.4rem 0;
  }
  .cell-group,
  .field {
    background: none;
    border: 0;
  }
  .cell-group {
    margin-bottom: 25px;
  }
  .field {
    height: 60px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .forget {
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .loginbtn {
    width: 270px;
    height: 44px;
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 22px;
    margin-top: 30px;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    color: rgba(255, 255, 255, 1);
    border: 0;
  }
  .loginbtn span {
    font-weight: bold;
  }
  p {
    display: flex;
    margin-top: 30px;
    color: #fff;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    color: rgba(232, 232, 232, 1);
  }
}
</style>
