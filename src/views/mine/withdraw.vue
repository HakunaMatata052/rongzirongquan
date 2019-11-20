<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="box">
        <h3>请选择出金银行卡</h3>
        <p @click="show = true">{{bankInfo}}</p>
        <h3>请输入出金金额</h3>
        <p>
          <input type="text" v-model="form.money" />
        </p>
        <div class="tips">
          <div class="text">
            账户余额：
            <span>{{cash}}</span>
          </div>
          <div class="text">
            冻结资金：
            <span>{{frozencash}}</span>
          </div>
        </div>
      </div>
      <van-button type="warning" class="btn" block @click="submit">确认出金</van-button>

      <password-box ref="passwordBox" @onSuccess="ajaxBuyState" />
      <van-popup v-model="show" position="bottom">
        <van-picker :columns="list" @confirm="onConfirm" @cancel="show=false" show-toolbar />
      </van-popup>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import passwordBox from "@/components/operation/passwordBox.vue";
export default {
  name: "withdraw",
  components: {
    navBar,
    passwordBox
  },
  data() {
    return {
      list: [],
      cash: "",
      frozencash: "",
      form: {
        bankid:null,
        money:"",
        atmpwd:""
      },
      bankInfo: "请选择",
      show: false
    };
  },
  created() {
    this.$SERVER.getWidthow().then(res => {
      this.cash = res.data.cash;
      this.frozencash = res.data.frozencash;
      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].text =
          res.data.list[i].bank + "|" + res.data.list[i].card_number;
      }
      this.list = res.data.list;
      if(res.data.list.length==0){
        this.$router.push('/bankCardList')
        this.$toast.fail('请先绑定银行卡！')
      }
    });
  },
  mounted() {},
  methods: {
    onConfirm(val) {
      this.bankInfo = val.text
      this.form.bankid = val.id
      this.show = false;
    },
    submit() {
      if (!this.form.bankid) {
        this.$toast.fail("请选择提现银行卡");
        return;
      }
      if (this.form.money.length == 0) {
        this.$toast.fail("请输入金额");
        return;
      }
      if (this.form.money > this.cash) {
        this.$toast.fail("余额不足！");
        return;
      }
      this.$refs.passwordBox.showFn();
    },
    ajaxBuyState(pwd) {
      this.form.atmpwd = pwd
      this.$SERVER
        .widthow(this.form)
        .then(res => {          
          this.$router.go(-1);
          this.$toast.success(res.message)
        })
        .catch(err => {
          this.$refs.passwordBox.clearFn();
        });
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  text-align: center;
  padding: 15px;
  background: #fff;
  margin-top: 15px;
  h3 {
    font-size: 15px;
    color: #999999;
    margin-top: 15px;
  }
  p {
    height: 33px;
    background-color: #ffffff;
    border-radius: 3px;
    border: solid 1px #e0e0e0;
    margin: 5px;
    box-sizing: border-box;
    padding: 5px 10px;
    input {
      height: 100%;
      width: 100%;
      border: 0;
      display: block;
      text-align: center;
      font-size: 14px;
    }
  }
  .tips {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .text {
      width: 50%;
      padding: 5px 0;
      font-size: 13px;
      color: #333;
      span {
        color: #fe6a50;
      }
    }
  }
}
.btn {
  display: block;
  width: 315px;
  margin: 20px auto;
}
</style>

