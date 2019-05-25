<template>
  <div>
   <label>大学名：</label>
   <Input v-model="param.colName" placeholder="请输入大学名" clearable style="width: 200px" />
   <Button type="primary" @click="search" icon="md-search">搜索</Button>
    <Button type="primary" @click="addcollegeinfo" icon="md-add">增加</Button>
    <Table border :columns="columns" :data="collegeinfoList"></Table>

    <Modal v-model="modal" width="530">
      <div>
        <Tabs value="name1">
          <TabPane :label="modalInfo" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="大学名" prop="colName">
                  <i-input v-model="formData.colName" size="large"></i-input>
                </FormItem>
                <FormItem label="类型" prop="colType">
                  <i-input v-model="formData.colType" size="large"></i-input>
                </FormItem>
                <FormItem label="招生电话" prop="colTel">
                 <i-input v-model="formData.colTel" size="large"></i-input>
                </FormItem>
                <FormItem label="官网" prop="colUrl">
                  <i-input v-model="formData.colUrl" size="large"></i-input>
                </FormItem>
                <FormItem label="地址" prop="colAddress">
                  <i-input v-model="formData.colAddress" size="large"></i-input>
                </FormItem>
              </Form>
            </div>
            <Button v-if="!flag" type="primary" size="large" long @click="editAction">修改</Button>
            <Button v-if="flag" type="primary" size="large" long @click="addAction">增加</Button>
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer"></div>
    </Modal>
    <Page
      :total="total"
      :current="param.currPage"
      :page-size="param.rows"
      class="page"
      show-elevator
      @on-change="pageChange"
    />
  </div>
</template>

<script>
import {
  listCollegeInfo,
  addCollegeInfo,
  deleteCollegeInfo,
  updateCollegeInfo
} from "../../request/api";

export default {
  data() {
    return {
      modal: false,
      columns: [
        {
          title: "大学名",
          key: "colName",
          align: "center",
          width:120
        },
        {
          title: "类型",
          key: "colType",
          align: "center",
          width:70
          
        },
        {
          title: "招生电话",
          key: "colTel",
          align: "center",
          width:130
          
        },
        {
          title: "官网",
          key: "colUrl",
          align: "center",
          render: (h, params) => {
            return h("a", 
             {attrs: {
                      href: this.collegeinfoList[params.index].colUrl
                    }
            } ,
              this.collegeinfoList[params.index].colUrl
            )
            ;
          }
        },
        {
          title: "地址",
          key: "colAddress",
          align: "center"
        },

        {
          title: "操作",
          key: "operate",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  style: {
                    type: "info",
                    marginLeft: "15px"
                  },
                  on: {
                    click: () => {
                      //table行数据转换到修改框上
                      this.formData.id = this.collegeinfoList[params.index].id,
                        this.formData.colName = this.collegeinfoList[
                          params.index
                        ].colName,
                        this.formData.colType = this.collegeinfoList[
                          params.index
                        ].colType,
                        this.formData.colTel = this.collegeinfoList[
                          params.index
                        ].colTel,
                        this.formData.colUrl = this.collegeinfoList[
                          params.index
                        ].colUrl,
                        this.formData.colAddress = this.collegeinfoList[
                          params.index
                        ].colAddress,
                        this.modal = true,
                        this.modalInfo = "信息修改",
                        this.flag = false;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  style: {
                    marginLeft: "15px",
                    fontSize: "14px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      let id = this.collegeinfoList[params.index].id;
                      this.$Modal.confirm({
                        title: "信息提醒",
                        content: "你确定删除吗",
                        onOk: () => {
                          this.collegeinfoList[params.index].id;
                          deleteCollegeInfo({ id: id }).then(res => {
                            if (res.status == 200) {
                              this.$Message.success("删除成功");
                              listCollegeInfo(this.param).then(res => {
                                this.collegeinfoList = res.data.records;
                                
                              });
                            }
                          });
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      flag: false,
      modalInfo: "",
      collegeinfoList: [],
      total: 20,
      param: {
        currPage: 1,
        rows: 10
      },
      imgUrl: "",
      phone: "",
      formData: {
        colName: "",
        colType: "",
        colTel: "",
        colUrl: "",
        colAdress: ""
      },
      ruleInline: {
        nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const self = this;
    listCollegeInfo(this.param).then(res => {
      self.collegeinfoList = res.data.records;
      self.total=res.data.total;
    });
  },
  methods: {
    search(){
          let collegeinfo = this.param;
            listCollegeInfo(this.param).then(res => {
            this.collegeinfoList = res.data.records;
            this.total = res.data.total
          });
    },
    //点击增加按钮
    addcollegeinfo() {
      (this.formData = {
        colName: "",
        colType: "",
        colTel: "",
        colUrl: "",
        colAdress: ""
      }),
        (this.modal = true),
        (this.modalInfo = "信息增加"),
        (this.flag = true);
    },
    //确定修改
    editAction() {  
      updateCollegeInfo(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("修改成功"), (this.modal = false);
          listCollegeInfo(this.param).then(res => {
            this.collegeinfoList = res.data.records;
             this.total=res.data.total;
          });
        }
      });
    },
    //确定增加
    addAction() {
      addCollegeInfo(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("添加成功"), (this.modal = false);
          listCollegeInfo(this.param).then(res => {
            this.collegeinfoList = res.data.records;
          });
        }
      });
    },

    pageChange(page) {
      this.param.currPage = page;
     console.log(page)
      listCollegeInfo(this.param).then(res => {
      this.collegeinfoList = res.data.records;
      this.total=res.data.total;
    });
    }
  }
};
</script>

<style scoped>
.myHead-text {
  margin-left: 12%;
  font-size: 20px;
  color: #91d5ff;
}
.user-img img {
  margin-top: 10%;
  margin-left: 40%;
  border-radius: 50%;
  width: 130px;
  height: 130px;
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
  *zoom: 1;
}

.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}

.a-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
</style>
