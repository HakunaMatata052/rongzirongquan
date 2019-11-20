<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="card-list">
        <div v-for="(item,index) in list" :key="index">
          <van-swipe-cell>
            <bankCard :item="item" @callback="getBankCardList()" />
            <template slot="right">
              <van-button type="danger" text="删除" class="del-btn" @click="delBankCard(item.id)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div class="bottom-btn" @click="$router.push('/addBankCard')">添加银行卡</div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import bankCard from "@/components/user/bankCard.vue";
export default {
  name: "bankCardList",
  components: {
    navBar,
    bankCard
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getBankCardList();
  },
  methods: {
    getBankCardList() {
      this.$SERVER.getBankCardList().then(res => {
        this.list = res.data;
      });
    },
    delBankCard(bankCardId) {
      this.$dialog
        .confirm({
          title: "是否确认删除银行卡？"
        })
        .then(() => {
          this.$SERVER
            .delCardBank({
              id: bankCardId,
              type: 2
            })
            .then(res => {
              this.$toast.success("删除成功！");
              this.list = res.data;
            });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.card-list {
  padding: 10px;
  .del-btn {
    height: 100%;
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
