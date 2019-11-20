<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell title="头像" is-link size="large">
          <van-uploader
            :after-read="uploadAvatar"
            :accept="'image/*'"
            class="ownHeadImg"
            :max-count="1"
          >
            <img :src="data.avatar||user_img" class="avatar" />
          </van-uploader>
        </van-cell>
        <van-cell title="手机号码" :value="data.mobile" is-link size="large" />
        <van-cell
          title="实名认证"
          :value="data.verified==1?'已认证':'未认证'"
          is-link
          size="large"
          :to="data.verified!=1?'/accountappeal':''"
        />
        <van-cell title="提现银行卡" :value="data.bark_status==1?'已认证':'未认证'" is-link size="large" to="bankCardList" />
        <van-cell title="登录密码" value="修改" is-link size="large" value-class="value" to="/registerPassword"/>
        <van-cell title="支付密码" value="修改" is-link size="large" value-class="value" to="/setPayPassword" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import user_img from "@/assets/images/default.png";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "setting",
  components: {
    navBar
  },
  data() {
    return {
      user_img: user_img,
      data: {}
    };
  },
  created() {
    this.$SERVER.account().then(res => {
      this.data = res.data;
    });
  },
  mounted() {},
  methods: {
    uploadAvatar(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("token", this.$store.state.token);
      console.log(file);
      this.$SERVER
        .uploadfile(formData)
        .then(res => {
          this.$SERVER
            .setAvatar({
              avatar: res.data
            })
            .then(res2 => {
              this.$toast.success(res2.message);
              this.data.avatar = res.data;
            });
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.cell-group {
  margin-top: 15px;
}
.avatar {
  float: right;
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
}
.value {
  color: #79acfe;
}
</style>

