<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>添加收货地址</h1>
      </div>
      <div class="add-box">
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
          <FormItem label="邮政编码" prop="postalcode">
            <i-input v-model="formData.postalCode" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" @click="addAddress">添加地址</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {addAddress} from "../../request/api";

  export default {
    name: 'AddAddress',
    data () {
      return {
        formData: {
          name: '',
          address: '',
          phone: '',
          postalCode: ''
        },
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
     methods:{
        addAddress:function () {
          addAddress(this.formData).then(res=>{
            if (res.code==100){
              this.$Message.success("添加成功"),
                this.$router.push({ path: '/user/address'})
            }
          })
        }
     }
  };
</script>

<style scoped>
  .add-container {
    margin: 15px auto;
    width: 60%;
    min-width: 600px;
  }
  .add-title {
    margin-bottom: 15px;
    text-align: center;
  }
  .add-submit {
    display: flex;
    justify-content: center;
  }
</style>
