<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>添加商品</h1>
      </div>
      <div class="add-box">
        <Form ref="formData" :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="商品名" prop="name">
            <i-input v-model="formData.name" size="large" ></i-input>
          </FormItem>
          <FormItem label="商品描述" prop="descript">
            <i-input v-model="formData.descript" size="large"></i-input>
          </FormItem>
          <FormItem label="价格" prop="price">
            <i-input v-model="formData.price" size="large"></i-input>
          </FormItem>
          <FormItem label="上架状态" prop="state">
            <RadioGroup v-model="formData.state">
              <Radio label="0">
                <Icon type=""></Icon>
                <span>下架</span>
              </Radio>
              <Radio label="1">
                <Icon type=""></Icon>
                <span>上架</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="类别" prop="type">
            <i-input v-model="formData.type" size="large"></i-input>
          </FormItem>
          <FormItem label="库存" prop="inventory">
            <i-input v-model="formData.inventory" size="large"></i-input>
          </FormItem>
          <a href="javascript:;" class="a-upload">
            点击商品图像
            <input type="file" name="userImgUrl" accept="image/gif,image/jpeg,image/jpg,image/png" ref="img" @change="changeImage($event)">
          </a>
          <div class="product-img">
            <img :src="productImgUrl"  >
          </div>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" @click="addProduct('formData')">添加商品</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {adminAddProduct,adminSetProductImg} from "../../request/api";

  export default {
        name: "AddProduct",
      data(){
          return{
            imgShow:false,
            formData:{
              name: '',
              descript: '',
              price: '',
              inventory: '',
              state: '',
              type:'',
            },
            productImgUrl:'',
            productImg:'',
            ruleInline: {
              name: [
                {required: true, message: '请输入商品名', trigger: 'blur'}
              ],
              descript: [
                {required: true, message: '请输入商品描述', trigger: 'blur'}
              ],
              price: [
                {required: true, message: '请输入价格', trigger: 'blur'}
              ],
              state: [
                {required: true, message: '请输入价格', trigger: 'blur'}
              ],
              inventory: [
                {required: true, message: '请输入库存', trigger: 'blur'}
              ],
              type: [
                {required: true, message: '请输入类别', trigger: 'blur'}
              ]


            }
          }
      },
      methods:{
        addProduct(name){
          const self = this;
          this.$refs[name].validate((valid)=>{
            if(valid){
              adminAddProduct(self.formData).then(res=>{
                if(res.code == 100){
                  if(self.productImg != ''){
                    let productImg = new FormData();
                    productImg.append("productImg",self.productImg),
                      productImg.append("productName",self.formData.name),
                      adminSetProductImg(productImg).then(res=>{
                        console.log(res)
                        if(res.code ==100){
                          self.$Message.success("添加成功"),
                            self.$router.push({ path: '/admin/adminProductInfo' });
                        }
                      })
                  }else {
                    this.$Message.success("添加成功,但是为添加图片"),
                      this.$router.push({ path: '/admin/adminProductInfo' });
                  }
                }
              })
            }
          })

        },
        changeImage(e) {
          var file = e.target.files[0]
          var reader = new FileReader()
          var that = this
          reader.readAsDataURL(file),
          that.productImg = e.target.files[0]
          reader.onload = function(e) {
            that.productImgUrl = this.result
          }
        },
      }
    }
</script>

<style scoped>
  .add-container {
    margin: 15px auto;
    margin-top: 0px;
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
  .a-upload {
    padding: 4px 10px;
    height: 30px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  .a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
  }
  .product-img {
    margin-left: 20%;
    width: 180px;
    height:180px;
    display: flex;
    justify-content: center;
    border: 1px solid #2c3e50;
    overflow: hidden;
  }
</style>
