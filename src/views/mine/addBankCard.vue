<template>
  <div class="container">
    <navBar />
    <div class="main">
      <p>
        <span>温馨提示：</span>为了您的账户资金安全，银行卡绑定仅限实名认证本人的银行账号。
      </p>
      <van-cell-group>
        <van-field v-model="form.realname" required clearable label="账户名" placeholder="请输入姓名" />
        <van-field
          v-model="form.bankname"
          required
          label="开户银行"
          placeholder="请输入开户银行"
        />
        <van-field
          v-model="form.cardaddress"
          required
          clearable
          label="银行所在地"
          placeholder="请输入开户银行所在地"
        />
        <van-field
          v-model="form.card_number"
          required
          clearable
          label="银行卡号"
          placeholder="请输入银行卡号"
          type="number"
          pattern="[0-9]*"
        />
      </van-cell-group>
    </div>

    <div class="bottom-btn" @click="submit">添加银行卡</div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "addBankCard",
  components: {
    navBar
  },
  data() {
    return {
      showPopup: false,
      bankList: "",
      loading: true,
      form: {
        realname: "",
        bankname: "",
        cardaddress: "",
        card_number: null,
        type: 1
      }
    };
  },
  created() {},
  methods: {
    getBankList() {
      this.showPopup = true;
    },
    OnConfirm(val) {
      this.form.bankname = val;
      this.showPopup = false;
    },
    submit() {
      if (this.form.realname.length == 0) {
        this.$toast.fail("请填写姓名");
        return;
      }
      if (!this.form.bankname) {
        this.$toast.fail("请选择开户行");
        return;
      }
      if (this.form.cardaddress.length == 0) {
        this.$toast.fail("请填写开户银行所在地");
        return;
      }
      if (!this.form.card_number) {
        this.$toast.fail("银行卡号");
        return;
      }
      if (!/^([1-9]{1})(\d{14,18})$/.test(this.form.card_number)) {
        this.$toast.fail("银行卡号不正确");
        return;
      }
      this.$SERVER.addCardBank(this.form).then(res => {
        this.$router.go(-1);
        this.$toast.success("添加成功！");
      });
    }
  }
};
</script>

<style lang="less" scoped>
p {
  padding: 15px;
  font-size: 12px;
  font-weight: 500;
  color: #999;
  line-height: 19px;
  span {
    color: #fdbf25;
  }
}
.bottom-btn {
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  background: #fe6a50;
}
</style>