import Axios from "./axios";

class Api extends Axios {
  /**
   * 获取商品数据
   * @param {Object} params typeid
   */
  async uploadfile(params = {}) {
    return await this.axios("POST", "stockwap/upload.php", params);
  }
  async appeal(params = {}) {
    return await this.axios("POST", "stockwap/appeal.php", params);
  }
  async about(params = {}) {
    return await this.axios("get", "stockwap/about.php", params);
  }
  async account(params = {}) {
    return await this.axios("get", "stockwap/account.php", params);
  }
  async setAvatar(params = {}) {
    return await this.axios("POST", "stockwap/account.php", params);
  }
  async stocklist(params = {}) {
    return await this.axios("GET", "stockwap/stocklist.php", params);
  }
  async stocktype(params = {}) {
    return await this.axios("GET", "stockwap/stocktype.php", params);
  }
  async stocktypedetal(params = {}) {
    return await this.axios("GET", "stockwap/stocktypedetal.php", params);
  }
  async stockdetails(params = {}) {
    return await this.axios("GET", "stockwap/stockdetails.php", params);
  }
  async minute(params = {}) {
    return await this.axios("GET", "stockwap/minute.php", params);
  }
  async dayk(params = {}) {
    return await this.axios("GET", "stockwap/dayk.php", params);
  }
  async weekk(params = {}) {
    return await this.axios("GET", "stockwap/weekk.php", params);
  }

  async monthk(params = {}) {
    return await this.axios("GET", "stockwap/monthk.php", params);
  }
  async usermoney(params = {}) {
    return await this.axios("GET", "stockwap/usermoney.php", params);
  }
  async stocktrade(params = {}) {
    return await this.axios("GET", "stockwap/stocktrade.php", params);
  }
  async deal_detail(params = {}) {
    return await this.axios("POST", "stockwap/deal_detail.php", params);
  }
  async fund_detail(params = {}) {
    return await this.axios("POST", "stockwap/fund_detail.php", params);
  }
  async getWidthow(params = {}) {
    return await this.axios("GET", "stockwap/widthow.php", params);
  }
  async widthow(params = {}) {
    return await this.axios("POST", "stockwap/widthow.php", params);
  }
  async getBankCardList(params = {}) {
    return await this.axios("GET", "stockwap/bank.php", params);
  }
  async addCardBank(params = {}) {
    return await this.axios("POST", "stockwap/bank.php", params);
  }
  async delCardBank(params = {}) {
    return await this.axios("POST", "stockwap/bank.php", params);
  }
  async buy(params = {}) {
    return await this.axios("POST", "stockwap/buy.php", params);
  }
  async sell(params = {}) {
    return await this.axios("POST", "stockwap/sell.php", params);
  }

  async withdrawal(params = {}) {
    return await this.axios("POST", "stockwap/withdrawal.php", params);
  }
  async attention(params = {}) {
    return await this.axios("POST", "stockwap/attention.php", params);
  }

  async search(params = {}) {
    return await this.axios("GET", "http://suggest3.sinajs.cn/suggest/", params);
  }
  async logout(params = {}) {
    return await this.axios("GET", "stockwap/logout.php?login=logout", params);
  }
  


}

export default new Api();