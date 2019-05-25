import Vue from 'vue'
import Router from 'vue-router'
import ShopMain from '@/page/ShopMain'
import CheckPhone from '@/components/Register/CheckPhone'
import InputInfo from '@/components/Register/InputInfo'
import RegisterDone from '@/components/Register/RegisterDone'
import OrderInfo from '@/components/user/OrderInfo'
import Product from '@/components/shopMain/Product'
import CreditProduct from '@/components/shopMain/CreditProduct'
import  Login from '@/page/Login'
import  Register from '@/page/Register'
import  User from '@/page/User'
import Cart from   '@/components/Cart'
import Order from  '@/page/Order'
import Address from '@/components/user/Address'
import CreditChange from '@/components/user/CreditChange'
import AddAddress from '@/components/user/AddAddress'
import myInfo from '@/components/user/UserInfo'
import ChangePassword from '@/components/user/ChangePassword'
import Admin from '@/page/Admin'  
import ProductManage from '@/components/admin/ProductManage'
import AddProduct from '@/components/admin/AddProduct'
import OrderManage from '@/components/admin/OrderManage'
import CreditManage from '@/components/admin/CreditManage'
import AdminLogin from '@/page/AdminLogin'

import studentInfo from '../components/admin/studentInfo.vue'
import Rank from '../components/admin/Rank.vue'
import CollegeRecruitmen from '../components/admin/CollegeRecruitmen.vue'
import CollegeInfo from '../components/admin/CollegeInfo.vue'
import CollegeScore from '../components/admin/CollegeScore.vue'
import MajorScore from '../components/admin/MajorScore.vue'





Vue.use(Router)
const  vueRoute = new Router({
  routes: [
    {
      path: '/',
      name: 'ShopMain',
      component: ShopMain,
      children:[
        {
          path: '/',
          name: 'index',
          component: Product
        },
        {
          path: 'product/:type',
          name: 'product',
          component: Product
        },
        {
          path: 'creditProduct',
          name: 'creditProduct',
          component: CreditProduct
        },
        {
          path: 'cart',
          name: 'shopMainCart',
          component: Cart
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      children: [
        {
          path: '/',
          name: 'registerIndex',
          component: CheckPhone
        },
        {
          path: 'checkPhone',
          name: 'CheckPhone',
          component: CheckPhone
        },
        {
          path: 'inputInfo',
          name: 'InputInfo',
          component: InputInfo
        },
        {
          path: 'registerDone',
          name: 'RegisterDone',
          component: RegisterDone
        }
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      children:[
        {
          path: '/',
          name: 'userIndex',
          component: myInfo
        },{
          path: 'myOrder',
          name: 'myOrder',
          component: OrderInfo,
        },
        {
          path: 'address',
          name: 'address',
          component: Address,
        },
        {
          path: 'changePassword',
          name: 'changePassword',
          component: ChangePassword,
        },
        {
          path: 'myInfo',
          name: 'myInfo',
          component: myInfo,
        },
        {
          path: 'addAddress',
          name: 'AddAddress',
          component: AddAddress,
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart,
        },{
          path:'creditChange',
          name:'creditChange',
          component:CreditChange
        }]
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children:[
        {
          path: '/',
          name: 'adminIndex',
          meta:{admin:true},
          component: studentInfo
        },
        {
          path: 'adminUserInfo',
          name: 'adminUserInfo',
          meta:{admin:true},
          component: studentInfo
        },
        {
          path: 'adminProductInfo',
          name: 'adminProductInfo',
          meta:{admin:true},
          component: Rank
        },
        {
          path: 'adminAddProduct',
          name: 'adminAddProduct',
          meta:{admin:true},
          component: AddProduct
        },
        {
          path:'adminOrderInfo',
          name:'adminOrderInfo',
          meta:{admin:true},
          component:OrderManage
        },
        {
          path:'adminCredit',
          name:'adminCredit',
          meta:{admin:true},
          component:CollegeRecruitmen
        },
        {
          path:'adminCollegeInfo',
          name:'adminCollegeInfo',
          meta:{admin:true},
          component:CollegeInfo
        },
        {
          path:'adminCollegeScore',
          name:'adminCollegeScore',
          meta:{admin:true},
          component:CollegeScore
        },
        {
          path:'adminMajorScore',
          name:'adminMajorScore',
          meta:{admin:true},
          component:MajorScore
        }
      ]
    },
    {
      path:'/adminLogin',
      name:'adminLogin',
      component:AdminLogin
    }
  ]
});

export default vueRoute
