<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="transaction">
        <h1>请输入原交易密码</h1>
        <van-password-input :value="value" :length="4" @focus="showKeyboard = true" />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "setPayPassword",
  components: {
    navBar
  },
  watch: {
    value(val) {
      if (val.length == 4) {
        this.$store.state.atmpwd = val
        this.$router.push('/setPayPassword2')
      }
    }
  },
  data() {
    return {
      pwd: "",
      value: "",
      showKeyboard: true
    };
  },
  created() {},
  methods: {
    
    onInput(key) {
      this.value = (this.value + key).slice(0, 4);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
  }
};
</script>

<style lang="less" scoped>
.transaction {
  h1 {
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin: 111px 0 43px 0;
    text-align: center;
  }
}
</style>

