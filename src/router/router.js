import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";
import {getCookie} from "@/common/js/mixin.js"; // 引入全局方法

// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [{
          path: "/",
          name: "home",
          component: () => import("@/views/index/subviews/home.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title: "首页",
            isMember: false,
            isLogin: false,
            icon: "1-1",
            icon_press: "1-2",
            index: 0
          }
        },
        {
          path: "/order",
          name: "order",
          component: () => import("@/views/index/subviews/order.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "交易",
            isMember: false,
            isLogin: false,
            icon: "2-1",
            icon_press: "2-2",
            index: 1
          }
        },
        {
          path: "/optional",
          name: "optional",
          component: () => import("@/views/index/subviews/optional.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "自选",
            isMember: false,
            isLogin: false,
            icon: "3-1",
            icon_press: "3-2",
            index: 2
          }
        },
        {
          path: "/quotation",
          name: "quotation",
          component: () => import("@/views/index/subviews/quotation.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "行情",
            isMember: false,
            isLogin: true,
            icon: "4-1",
            icon_press: "4-2",
            index: 3
          }
        },
        {
          path: "/mine",
          name: "mine",
          component: () => import("@/views/index/subviews/mine.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "我的",
            isMember: false,
            isLogin: true,
            icon: "5-1",
            icon_press: "5-2",
            index: 4
          }
        }
      ]
    },
    // 注册登录
    {
      path: "/login/:name?",
      name: "login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "登录",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/register/:val?",
      name: "register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "注册",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/registerPassword",
      name: "registerPassword",
      component: () => import("@/views/login/registerPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "设置密码",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: () => import("@/views/login/resetPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "修改密码",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: () => import("@/views/mine/withdraw.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "出金",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/accountappeal",
      name: "accountappeal",
      component: () => import("@/views/mine/accountappeal.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "身份认证",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/aboutList",
      name: "aboutList",
      component: () => import("@/views/mine/aboutList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "关于我们",
        isMember: false,
        isLogin: false
      }
    }, 
    {
      path: "/aboutDetails/:id",
      name: "aboutDetails",
      component: () => import("@/views/mine/aboutDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "关于我们",
        isMember: false,
        isLogin: false
      }
    },   
    {
      path: "/setting",
      name: "setting",
      component: () => import("@/views/mine/setting.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "账户资料",
        isMember: false,
        isLogin: true
      }
    },  
    {
      path: "/quotationDetails/:code",
      name: "quotationDetails",
      component: () => import("@/views/quotation/quotationDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "行情详情",
        isMember: false,
        isLogin: false
      }
    },  
    {
      path: "/business/:type/:code",
      name: "business",
      component: () => import("@/views/quotation/business.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "买入卖出",
        isMember: false,
        isLogin: true
      }
    },  
    {
      path: "/sinahyList",
      name: "sinahyList",
      component: () => import("@/views/quotation/sinahyList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "热门行业",
        isMember: false,
        isLogin: false
      }
    },  
    {
      path: "/stockList/:type/:code?",
      name: "stockList",
      component: () => import("@/views/quotation/stockList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "",
        isMember: false,
        isLogin: false
      }
    },  
    {
      path: "/transaction",
      name: "transaction",
      component: () => import("@/views/mine/transaction.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "交易明细",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/bankCardList",
      name: "bankCardList",
      component: () => import("@/views/mine/bankCardList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "银行卡列表",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/addBankCard",
      name: "addBankCard",
      component: () => import("@/views/mine/addBankCard.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "添加银行卡",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/capitalDetails",
      name: "capitalDetails",
      component: () => import("@/views/mine/capitalDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "资金明细",
        isMember: false,
        isLogin: true
      }
    },
    
    {
      path: "/cancelOrder/:type?",
      name: "cancelOrder",
      component: () => import("@/views/mine/cancelOrder.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "撤单",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/setPayPassword",
      name: "setPayPassword",
      component: () => import("@/views/mine/setPayPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "修改支付密码",
        isMember: false,
        isLogin: true
      }
    },
    
    {
      path: "/setPayPassword2",
      name: "setPayPassword2",
      component: () => import("@/views/mine/setPayPassword2.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "修改支付密码",
        isMember: false,
        isLogin: true
      }
    },
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.index != undefined) {
    store.state.tabActiveIndex = to.meta.index
  }
  if (to.meta.isLogin) {
    if (!getCookie('PHPSESSID')) {
      if (from.name == "login") {
        router.push('/')
      } else {
        window.location.href = "/waplogin.php"
        // router.push('/login/' + from.name)
      }
    } else {
      next()
    }
    if (to.meta.isMember) {
      if (!getCookie('PHPSESSID')) {
        router.push('/login/' + from.name)
      } else {
        if (store.state.isMember) {
          next()
        } else {
          router.push('/buymember')
        }
      }
    }
  } else {
    next()
  }
})

router.afterEach(route => {

  // console.log(route)
  // console.log("跳转")
})

export default router;