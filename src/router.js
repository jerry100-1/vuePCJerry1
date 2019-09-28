import Vue from 'vue'
import Router from 'vue-router'

import home from './views/home'
import user from './views/children/user/user.vue' //用户
import userInfo from './views/children/user/children/userInfo.vue' //用户管理
import userBannerList from './views/children/user/children/userBannerList.vue' //用户轮播图列表
import userBannerDetail from './views/children/user/children/userBannerDetail.vue' //用户轮播图详情
import userBannerEdit from './views/children/user/children/userBannerEdit.vue' //用户轮播图编辑
import userBannerAdd from './views/children/user/children/userBannerAdd.vue' //用户轮播图新增


import userdetailPage from './views/children/user/children/userdetailPage.vue' //用户详情

import boutiqueClass from './views/children/boutiqueClass/boutiqueClass.vue' //精品课堂

import articleList from './views/children/boutiqueClass/children/articleList.vue' //精品课堂文章列表
import articleEntry from './views/children/boutiqueClass/children/articleEntry.vue' //精品课堂文章列表文章录入
import articleDetails from './views/children/boutiqueClass/children/articleDetails.vue' //精品课堂文章详情
import minClass from './views/children/boutiqueClass/children/minClass.vue' //精品课堂微课堂
import minClassAdd from './views/children/boutiqueClass/children/minClassAdd.vue' //精品课堂微课堂新增


// import videoUpload from './views/children/boutiqueClass/children/videoUpload.vue' //精品课堂微课堂新增

import management from './views/children/management/management.vue' //项目管理
import physical from './views/children/management/children/physical.vue' //项目管理体检
import physicalIncreased from './views/children/management/children/physicalIncreased.vue' //项目管理体检新增
import health from './views/children/management/children/health.vue' //项目管理保健
import healthIncreased from './views/children/management/children/healthIncreased.vue' //项目管理保健新增
import vaccine from './views/children/management/children/vaccine.vue' //项目管理疫苗
import vaccineInventory from './views/children/management/children/vaccineInventory.vue' //项目管理疫苗库存
import vaccineCorrelation from './views/children/management/children/vaccineCorrelation.vue' //项目管理疫苗编辑新增相关疫苗
import vaccineSpecification from './views/children/management/children/vaccineSpecification.vue' //项目管理疫苗编辑新增疫苗规格
import vaccineExplain from './views/children/management/children/vaccineExplain.vue' //项目管理疫苗编辑新增疫苗说明


import leaveword from './views/children/leaveword/leaveword.vue' //留言
import leavewordList from './views/children/leaveword/children/leavewordList.vue' //留言列表
import notification from './views/children/notification/notification.vue' //通知
import notificationList from './views/children/notification/children/notificationList.vue' //
import notificationEdit from './views/children/notification/children/notificationEdit.vue' //
import notificationDetail from './views/children/notification/children/notificationDetail.vue' //
import notificationAdd from './views/children/notification/children/notificationAdd.vue' //
// import notificationEdit from './views/children/notification/children/notificationEdit.vue'
// import notificationList from './views/children/notification/children/notificationList.vue'
import healthcenter from './views/children/healthcenter/healthcenter.vue'
import healthcenterEdit from './views/children/healthcenter/children/healthcenterEdit.vue'
import healthcenterList from './views/children/healthcenter/children/healthcenterList.vue'
import healthcenterAdd from './views/children/healthcenter/children/healthcenterAdd.vue'

import healthcenterMapEdit from './views/children/healthcenter/children/healthcenterMapEdit.vue'

import healthcenterMapAdd from './views/children/healthcenter/children/healthcenterMapAdd.vue'
import orderManager from './views/children/orderManager/orderManager.vue' //订单管理
import orderList from './views/children/orderManager/children/orderList.vue' //订单取消
import orderCancel from './views/children/orderManager/children/orderCancel.vue' //订单取消
import orderPayment from './views/children/orderManager/children/orderPayment.vue' //订单已支付
import orderRefund from './views/children/orderManager/children/orderRefund.vue' //订单退款


import appointmanager from './views/children/appointmanager/appointmanager.vue' //预约管理
import appointmanagerList from './views/children/appointmanager/children/appointmanagerList.vue' //
import appointmanagerWait from './views/children/appointmanager/children/appointmanagerWait.vue' //
import appointmanagerNumber from './views/children/appointmanager/children/appointmanagerNumber.vue' //
import appointmanagerCancel from './views/children/appointmanager/children/appointmanagerCancel.vue' //
import appointmanagerFinish from './views/children/appointmanager/children/appointmanagerFinish.vue' //
import appointmanagerDetail from './views/children/appointmanager/children/appointmanagerDetail.vue' //


// 专家管理
import expertManager from './views/children/expertManager/expertManager.vue' //专家管理
import expertList from './views/children/expertManager/children/expertList.vue' //
import diseaseAnswer from './views/children/expertManager/children/diseaseAnswer.vue' //
import diseaseSeries from './views/children/expertManager/children/diseaseSeries.vue' //
import diseaseAnswerEdit from './views/children/expertManager/children/diseaseAnswerEdit.vue' //
import diseaseAnswerAdd from './views/children/expertManager/children/diseaseAnswerAdd.vue' //
import diseaseAnswerDetail from './views/children/expertManager/children/diseaseAnswerDetail.vue' //

import expertListEdit from './views/children/expertManager/children/expertListEdit.vue' //

import expertListAdd from './views/children/expertManager/children/expertListAdd.vue' //
import expertListAdd2 from './views/children/expertManager/children/expertListAdd2.vue' //
import expertListAdd3 from './views/children/expertManager/children/expertListAdd3.vue' //
import expertListEditAccount from './views/children/expertManager/children/expertListEditAccount.vue' //



import messageFeedback from './views/children/set/children/messageFeedback.vue' //
import messageFeedbackDetail from './views/children/set/children/messageFeedbackDetail.vue' //
import projectSetList from './views/children/set/children/projectSetList.vue' //
import userAgreement from './views/children/set/children/userAgreement.vue' //


import addpayset from './views/children/set/children/addpayset.vue' //

import paymentSet from './views/children/set/children/paymentSet.vue' //
import projectSet from './views/children/set/projectSet.vue' //
import eluploadbutton from './views/children/set/children/eluploadbutton.vue'


import login from './views/children/set/children/login.vue'

import authorityManager from './views/children/authority/authorityManager.vue' //
import authorityConfiguration from './views/children/authority/children/authorityConfiguration.vue' //权限配置
import roleConfiguration from './views/children/authority/children/roleConfiguration.vue' //角色配置
import accountConfiguration from './views/children/authority/children/accountConfiguration.vue' //帐号配置
import roleConfigurationEdit from './views/children/authority/children/roleConfigurationEdit.vue' //角色编辑
// authorityManager/authorityConfiguration
import roleConfigurationAdd from './views/children/authority/children/roleConfigurationAdd' //角色新增

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/register'
  },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        //用户
        {
          path: 'user',
          component: user,
          redirect: 'user/userInfo',
          children: [{
            path: 'userInfo',
            component: userInfo,
          },
            {
              path: 'userdetailPage/:id',
              name: 'userdetailPage',
              component: userdetailPage,
            },
           {
              path: 'userBannerList',
              name: 'userBannerList',
              component: userBannerList,
            },
            {
              path: 'userBannerEdit',
              name: 'userBannerEdit',
              component: userBannerEdit,
            },
            {
              path: 'userBannerAdd',
              name: 'userBannerAdd',
              component: userBannerAdd,
            },
            {
              path: 'userBannerDetail',
              name: 'userBannerDetail',
              component: userBannerDetail,
            }
            // {
            //   path: 'userBannerList',
            //   name: 'userBannerList',
            //   component: userBannerList,
            // },
            // {
            //   path: 'userBannerEdit',
            //   name: 'userBannerEdit',
            //   component: userBannerEdit,
            // },
            // {
            //   path: 'userBannerAdd',
            //   name: 'userBannerAdd',
            //   component: userBannerAdd,
            // },
            // {
            //   path: 'userBannerDetail',
            //   name: 'userBannerDetail',
            //   component: userBannerDetail,
            // }
          ]
        },
        //精品课堂
        {
          path: 'boutiqueClass',
          component: boutiqueClass,
          redirect: 'boutiqueClass/articleList',
          children: [
            //课堂列表
            {
              path: 'articleList',
              component: articleList
            },
            // {
            //     path: 'videoUpload',
            //     name: "videoUpload",
            //     component: videoUpload
            // },
            // 列表详情
            {
              path: 'articleDetails',
              name: 'articleDetails',
              component: articleDetails
            },
            //微课堂
            {
              path: 'minClass',
              component: minClass
            },
            //文章录入和编辑
            {
              path: 'articleEntry',
              name: 'articleEntry',
              component: articleEntry
            },
            //微课堂新增
            {
              path: 'minClassAdd',
              name:"minClassAdd",
              component: minClassAdd
            }
          ]
        },

        // 卫生所服务
        {
          path: 'healthcenter',
          component: healthcenter,
          redirect: 'healthcenter/healthcenterList',
          children: [
            //卫生所列表
            {
              path: 'healthcenterList',
              name: "healthcenterList",
              component: healthcenterList
            },
            // 卫生所编辑
            {
              path: 'healthcenterEdit',
              name: "healthcenterEdit",
              component: healthcenterEdit
            },
            //卫生所新增
            {
              path: 'healthcenterAdd',
              name: "healthcenterAdd",
              component: healthcenterAdd
            },
            //卫生所地图
            {
              path: 'healthcenterMapEdit',
              name: "healthcenterMapEdit",
              component: healthcenterMapEdit
            },
            //卫生所地图
            {
              path: 'healthcenterMapAdd',
              name: "healthcenterMapAdd",
              component: healthcenterMapAdd
            }
          ]
        },
        // 项目管理
        {
          path: 'management',
          component: management,
          redirect: 'management/vaccine',
          children: [
            //体检
            {
              path: 'physical',
              component: physical
            },
            //体检新增
            {
              path: 'physicalIncreased',
              name: 'physicalIncreased',
              component: physicalIncreased
            },
            //保健
            {
              path: 'health',
              component: health
            },
            //保健新增编辑
            {
              path: 'healthIncreased',
              name: 'healthIncreased',
              component: healthIncreased
            },
            //疫苗
            {
              path: 'vaccine',
              component: vaccine
            },
            //疫苗库存
            {
              path: 'vaccineInventory',
              component: vaccineInventory
            },
            //疫苗编辑和新增相关疫苗
            {
              path: 'vaccineCorrelation',
              name: 'vaccineCorrelation',
              component: vaccineCorrelation
            },
            //疫苗编辑和新增疫苗规格
            {
              path: 'vaccineSpecification',
              name: 'vaccineSpecification',
              component: vaccineSpecification
            },
            //疫苗编辑和新增疫苗说明
            {
              path: 'vaccineExplain',
              name: 'vaccineExplain',
              component: vaccineExplain
            }
          ]
        },
        // 预约管理
        {
          path: 'appointmanager',
          component: appointmanager,
          redirect: 'appointmanager/appointmanagerList',
          children: [
            //已作废
            {
              path: 'appointmanagerList',
              name:"appointmanagerList",
              component: appointmanagerList
            },
            //排队中
            {
              path: 'appointmanagerWait',
              name:"appointmanagerWait",
              component: appointmanagerWait
            },
            //已叫号
            {
              path: 'appointmanagerNumber',
              name:"appointmanagerNumber",
              component: appointmanagerNumber
            },
            //已取消
            {
              path: 'appointmanagerCancel',
              name:"appointmanagerCancel",
              component: appointmanagerCancel
            },
            //已完成
            {
              path: 'appointmanagerFinish',
              name:"appointmanagerFinish",
              component: appointmanagerFinish
            },
            {
              path: '/appointmanagerDetail/:id',
              name: 'appointmanagerDetail',
              component: resolve => require(['@/views/children/appointmanager/children/appointmanagerDetail.vue'], resolve),
              meta: {
                title: '通知详情'
              }
            },
            // //预约列表详情
            // {
            //   path:'appointmanagerDetail',
            //   component:appointmanagerDetail
            // }
          ]
        },

        // 订单管理
        {
          path: 'orderManager',
          component: orderManager,
          redirect: 'orderManager/orderList',
          children: [
            //待付款
            {
              path: 'orderList',
              component: orderList
            },
            //已取消
            {
              path: 'orderCancel',
              component: orderCancel
            },
            //已取消
            {
              path: 'orderPayment',
              component: orderPayment
            },
            //退款
            {
              path: 'orderRefund',
              component: orderRefund
            }
          ]
        },

        // 专家管理
        {
          path: 'expertManager',
          component: expertManager,
          redirect: 'expertManager/expertList',
          children: [
            //专家列表
            {
              path: 'expertList',
              component: expertList
            },
            //病症解答
            {
              path: 'diseaseAnswer',
              name:"diseaseAnswer",
              component: diseaseAnswer
            },
            //病症列表
            {
              path: 'diseaseSeries',
              name: "diseaseSeries",
              component: diseaseSeries
            },
            {
              path: 'diseaseAnswerEdit',
              name: "diseaseAnswerEdit",
              component: diseaseAnswerEdit
            },
            {
              path: 'diseaseAnswerAdd',
              name: "diseaseAnswerAdd",
              component: diseaseAnswerAdd
            },

            // {
            //   path:'diseaseAnswerDetail',
            //   name:"diseaseAnswerDetail",
            //   component:diseaseAnswerDetail
            // },
            {
              path: '/diseaseAnswerDetail/:id',
              name: 'diseaseAnswerDetail',
              component: resolve => require(['@/views/children/expertManager/children/diseaseAnswerDetail.vue'], resolve),
              meta: {
                title: '通知详情'
              }
            },
            {
              path: 'expertListEdit',
              name: "expertListEdit",
              component: expertListEdit
            },
            {
              path: 'expertListAdd',
              component: expertListAdd
            },
            {
              path: 'expertListAdd3',
              component: expertListAdd3
            },
            {
              path: 'expertListAdd2',
              name: "expertListAdd2",
              component: expertListAdd2
            },
            {
              path: 'expertListEditAccount',
              component: expertListEditAccount
            }

          ]
        },

        // 设置
        {
          path: 'projectSet',
          component: projectSet,
          redirect: 'projectSet/projectSetList',
          children: [
            //信息反馈
            {
              path: 'messageFeedback',
              name: "messageFeedback",
              component: messageFeedback
            },

            //添加支付设置
            {
              path: 'addpayset',
              name: "addpayset",
              component: addpayset
            },
            //信息反馈详情
            {
              path: 'messageFeedbackDetail、：',
              name: "messageFeedbackDetail",
              component: messageFeedbackDetail
            },
            {
              path: 'projectSetList',
              name: 'projectSetList',
              component: projectSetList
            },
            //用户协议
            {
              path: 'userAgreement',
              name: "userAgreement",
              component: userAgreement
            },
            //支付设置
            {
              path: 'paymentSet',
              name: "paymentSet",
              component: paymentSet
            },
            //上传
            {
              path: 'eluploadbutton',
              component: eluploadbutton
            },
            //
            {
              path: 'login',
              component: login
            }

          ]
        },



        // 权限
        {
          path: 'authorityManager',
          component: authorityManager,
          redirect: 'authorityManager/authorityConfiguration',
          children: [
            //权限配置
            {
              path: 'authorityConfiguration',
              component: authorityConfiguration
            },
            //角色配置
            {
              path: 'roleConfiguration',
              component: roleConfiguration
            },
            //帐号配置
            {
              path: 'accountConfiguration',
              component: accountConfiguration
            },
            //角色编辑
            {
              path: 'roleConfigurationEdit',
              name: 'roleConfigurationEdit',
              component: roleConfigurationEdit
            },
            //角色新增
            {
              path: 'roleConfigurationAdd',
              name: 'roleConfigurationAdd',
              component: roleConfigurationAdd
            }
          ]
        },


        //留言
        {
          path: 'leaveword',
          component: leaveword,
          redirect: 'leaveword/leavewordList',
          children: [{
            path: 'leavewordList',
            component: leavewordList
          }]
        },


        //通知
        {
          path: 'notification',
          component: notification,
          redirect: 'notification/notificationList',
          children: [{
            path: 'notificationList',
            component: notificationList
          },
            // {
            //   path:'notificationEdit/:id',
            //   component:notificationEdit
            // },
            {
              path: '/notificationEdit/:id/:title/:detail',
              name: 'notificationEdit',
              component: resolve => require(['@/views/children/notification/children/notificationEdit.vue'], resolve),
              meta: {
                title: '通知详情'
              }
            },
            {
              path: 'notificationAdd',
              name: "notificationAdd",
              component: notificationAdd
            },
            {
              path: '/notificationDetail/:id',
              name: 'notificationDetail',
              component: resolve => require(['@/views/children/notification/children/notificationDetail.vue'], resolve),
              meta: {
                title: '通知详情'
              }
            },
            {
              path: '/notificationEdit/:id',
              name: 'notificationEdit',
              component: resolve => require(['@/views/children/notification/children/notificationEdit.vue'], resolve),
              meta: {
                title: '通知编辑'
              }
            }
          ]
        }
      ]
    },

    //登录
    {
      path: '/register',
      name: 'register',
      component: () =>
          import ('./views/register.vue')
    }
  ]
})
