<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="inforform">
        <van-field label="您的姓名" v-model="form.real_name" placeholder="请输入您的姓名" />
        <van-field label="身份证号" v-model="form.user_id_card" placeholder="请输入身份证号码" />
      </van-cell-group>
      <div class="up">
        <van-uploader :after-read="uploadAvatar" name="positive" :accept="'image/*'" :max-count="1">
          <img :src="form.positive" class="img" v-if="form.positive" />
          <div class="idCard" v-else>
            <van-icon class-prefix="icon" name="wode" class="wode1Icon" />
            <br />请上传您的身份证正面照
          </div>
        </van-uploader>
      </div>
      <div class="up">
        <van-uploader :after-read="uploadAvatar" name="back" :accept="'image/*'" :max-count="1">
          <img :src="form.back" class="img" v-if="form.back" />
          <div class="idCard" v-else>
            <van-icon class-prefix="icon" name="guohui" class="guohuiIcon" />
            <br />请上传您的身份证正面照
          </div>
        </van-uploader>
      </div>
      <div class="btn" @click="submit">确定</div>
    </div>
  </div>
</template>

<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "accountappeal",
  components: {
    navBar
  },
  data() {
    return {
      form: {
        positive: null,
        back: null,
        real_name: "",
        user_id_card: ""
      },
      checkNumDisabled: false,
      countDown: 60,
      timer: null
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    submit() {
      if (!this.form.positive || !this.form.back) {
        this.$toast.fail("请上传身份证正反面！");
        return;
      }
      if (!regexUtil.isChinese(this.form.real_name)) {
        this.$toast.fail("请输入正确的姓名");
        return;
      }

      if (!regexUtil.isIDCard(this.form.user_id_card)) {
        this.$toast.fail("请输入正确的身份证号");
        return;
      }
      this.$SERVER.appeal(this.form).then(res => {
        this.$toast.success(res.msg);
        this.$router.go(-1);
      });
    },
    uploadAvatar(file, detail) {
      console.log(file)
      console.log(detail)
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("token", this.$store.state.token);
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "上传中..."
      });
      this.$SERVER
        .uploadfile(formData)
        .then(res => {
          this.$toast.clear();
          this.form[detail.name] = res.data;
        })
        .catch(err => {
          this.$toast.clear();
          this.$toast.fail(err.msg);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.up {
  width: 290px;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  margin: 29px auto;
  .idCard {
    width: 290px;
    height: 160px;
    text-align: center;
    font-size: 15px;
    color: rgba(51, 51, 51, 1);
    .wode1Icon {
      font-size: 70px;
      color: rgba(242, 242, 242, 1);
      padding: 30px 0 15px 0;
    }
    .guohuiIcon {
      font-size: 70px;
      color: rgba(242, 242, 242, 1);
      padding: 20px 0;
    }
  }
}
.img {
  width: 290px;
  height: 160px;
}
.inforform {
  margin-top: 15px;
}
.btn {
  width: 270px;
  height: 44px;
  background: fe6a50;
  border-radius: 22px;
  margin: 27px auto;
  font-size: 17px;
  font-family: PingFang;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
  text-align: center;
  background: #fe6a50;
}
</style>

