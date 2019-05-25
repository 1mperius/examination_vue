<template>
  <div>
    <div class="address-box" v-for="(item, index) in addressList" :key="index">
      <div class="address-header">
        <span>{{item.name}}</span>
        <div class="address-action">
          <span @click="edit(index)"><Icon type="edit"></Icon> 修改</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除</span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title"> 收 货 人 :</span> {{item.name}}</p>
        <p><span class="address-content-title">收货地址:</span> {{item.address}}</p>
        <p><span class="address-content-title">邮政编码:</span> {{item.postalCode}}</p>
      </div>
    </div>
    <Modal v-model="modal" width="530">
      <p slot="header">
        <Icon type="edit"></Icon>
        <span>修改地址</span>
      </p>
      <div>
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="收件人" prop="name">
            <i-input v-model="formData.name" size="large"></i-input>
          </FormItem>
          <FormItem label="收件地址" prop="address">
            <i-input v-model="formData.address" size="large"></i-input>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>
          <FormItem label="邮政编码" prop="postalCode">
            <i-input v-model="formData.postalCode" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="editAction">修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getAddress,updateAddress,deleteAddress} from "../../request/api";

  export default {
    name: 'MyAddress',
    data () {
      return {
        modal: false,
        formData: {
          id:'',
          name: '',
          address: '',
          phone: '',
          postalCode: '',
        },
        addressList:[]
        ,
        ruleInline: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          postalCode: [
            { required: true, message: '请输入邮政编码', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
          ]
        }
      };
    },
    created () {
      getAddress().then(res=>{
        this.addressList = res.data
      })
    },
    computed: {
    },
    methods: {
      edit (index) {
        this.modal = true;
        this.formData.id = this.addressList[index].id;
        this.formData.address = this.addressList[index].address;
        this.formData.name = this.addressList[index].name;
        this.formData.phone = this.addressList[index].phone;
        this.formData.postalCode = this.addressList[index].postalCode;
      },
      editAction () {
        updateAddress(this.formData).then(res=>{
          this.$Message.success('修改成功');
          getAddress().then(res=>{
            this.addressList = res.data
          });
          this.modal = false
        })
      },
      del (index) {
        this.$Modal.confirm({
          title: '信息提醒',
          content: '你确定删除这个收货地址',
          onOk: () => {
            let data = {};
            data.id=this.addressList[index].id,
            deleteAddress(data).then(res=>{
              if(res.code==100){
                this.$Message.success('删除成功');
                this.addressList.splice(index,1)
              }
            })
          },
          onCancel: () => {
            this.$Message.info('取消删除');
          }
        });
      }
    },
  };
</script>

<style scoped>
  .address-box {
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #ccc;
  }
  .address-header {
    height: 35px;
    display: flex;
    justify-content: space-between;
    color: #232323;
    font-size: 18px;
  }
  .address-content {
    font-size: 14px;
  }
  .address-content-title {
    color: #999;
  }
  .address-action span{
    margin-left: 15px;
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
  }
</style>
