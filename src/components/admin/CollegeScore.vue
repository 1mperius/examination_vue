<template>
  <div>
   <label>大学名：</label>
   <Input v-model="param.colId" placeholder="请输入年份" clearable style="width: 200px" />
   <label>生源地：</label>
   <Input v-model="param.province" placeholder="请输入生源地" clearable style="width: 200px" />
   <Button type="primary" @click="search" icon="md-search">搜索</Button>
    <Button type="primary" @click="addcollegescore" icon="md-add">增加</Button>
    <Table border :columns="columns" :data="collegescoreList"></Table>

    <Modal v-model="modal" width="530">
      <div>
        <Tabs value="name1">
          <TabPane :label="modalInfo" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="大学名" prop="colId">
                  <i-input v-model="formData.colId" size="large"></i-input>
                </FormItem>
                <FormItem label="类型" prop="colGenera">
                  <i-input v-model="formData.colGenera" size="large"></i-input>
                </FormItem>
                <FormItem label="批次" prop="colBatch">
                 <i-input v-model="formData.colBatch" size="large"></i-input>
                </FormItem>
                <FormItem label="年份" prop="year">
                  <i-input v-model="formData.year" size="large"></i-input>
                </FormItem>
                <FormItem label="最高分" prop="colMaxScore">
                  <i-input v-model="formData.colMaxScore" size="large"></i-input>
                </FormItem>
                <FormItem label="最低分" prop="colMinScore">
                  <i-input v-model="formData.colMinScore" size="large"></i-input>
                </FormItem>
                <FormItem label="平均分" prop="colAveScore">
                  <i-input v-model="formData.colAveScore" size="large"></i-input>
                </FormItem>
                <FormItem label="生源地" prop="province">
                  <i-input v-model="formData.province" size="large"></i-input>
                </FormItem>
                <FormItem label="招生人数" prop="colNumber">
                  <i-input v-model="formData.colNumber" size="large"></i-input>
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
  listCollegeScore,
  addCollegeScore,
  deleteCollegeScore,
  updateCollegeScore
} from "../../request/api";

export default {
  data() {
    return {
      modal: false,
      columns: [
        {
          title: "大学名",
          key: "colId",
          align: "center",
          width:150
        },
        {
          title: "类型",
          key: "colGenera",
          align: "center",
          width:70
          
        },
        {
          title: "批次",
          key: "colBatch",
          align: "center",
          width:120
          
        },
        {
          title: "年份",
          key: "year",
          align: "center",
          width:80
        },
        {
          title: "最高分",
          key: "colMaxScore",
          align: "center",
          width:80
        },
        {
          title: "最低分",
          key: "colMinScore",
          align: "center",
          width:80
        },
        {
          title: "平均分",
          key: "colAveScore",
          align: "center",
          width:80
        },
        {
          title: "生源地",
          key: "province",
          align: "center",
          width:80
        },
        {
          title: "招生人数",
          key: "colNumber",
          align: "center",
          width:100
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
                      this.formData.id = this.collegescoreList[params.index].id,
                        this.formData.colId = this.collegescoreList[
                          params.index
                        ].colId,
                        this.formData.colGenera = this.collegescoreList[
                          params.index
                        ].colGenera,
                        this.formData.colBatch = this.collegescoreList[
                          params.index
                        ].colBatch,
                        this.formData.year = this.collegescoreList[
                          params.index
                        ].year,
                        this.formData.colMaxScore = this.collegescoreList[
                          params.index
                        ].colMaxScore,
                        this.formData.colMinScore = this.collegescoreList[
                          params.index
                        ].colMinScore,
                        this.formData.colAveScore = this.collegescoreList[
                          params.index
                        ].colAveScore,
                        this.formData.province = this.collegescoreList[
                          params.index
                        ].province,
                        this.formData.colNumber = this.collegescoreList[
                          params.index
                        ].colNumber,

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
                      let id = this.collegescoreList[params.index].id;
                      this.$Modal.confirm({
                        title: "信息提醒",
                        content: "你确定删除吗",
                        onOk: () => {
                          this.collegescoreList[params.index].id;
                          deleteCollegeScore({ id: id }).then(res => {
                            if (res.status == 200) {
                              this.$Message.success("删除成功");
                              listCollegeScore(this.param).then(res => {
                                this.collegescoreList = res.data.records;
                                
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
      collegescoreList: [],
      total: 20,
      param: {
        currPage: 1,
        rows: 10
      },
      imgUrl: "",
      phone: "",
      formData: {
        colId: "",
        colGenera: "",
        colBatch: "",
        year: "",
        colMaxScore: "",
        colMinScore: "",
        colAveScore: "",
        province: "",
        colNumber: "",
        
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
    listCollegeScore(this.param).then(res => {
      self.collegescoreList = res.data.records;
      self.total=res.data.total;
    });
  },
  methods: {
    search(){
          let collegescore = this.param;
            listCollegeScore(this.param).then(res => {
            this.collegescoreList = res.data.records;
            this.total = res.data.total
          });
    },
    //点击增加按钮
    addcollegescore() {
      (this.formData = {
        colId: "",
        colGenera: "",
        colBatch: "",
        year: "",
        colMaxScore: "",
        colMinScore: "",
        colAveScore: "",
        province: "",
        colNumber: ""
      }),
        (this.modal = true),
        (this.modalInfo = "信息增加"),
        (this.flag = true);
    },
    //确定修改
    editAction() {  
      updateCollegeScore(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("修改成功"), (this.modal = false);
          listCollegeScore(this.param).then(res => {
            this.collegescoreList = res.data.records;
             this.total=res.data.total;
          });
        }
      });
    },
    //确定增加
    addAction() {
      addCollegeScore(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("添加成功"), (this.modal = false);
          listCollegeScore(this.param).then(res => {
            this.collegescoreList = res.data.records;
          });
        }
      });
    },

    pageChange(page) {
      this.param.currPage = page;
     console.log(page)
      listCollegeScore(this.param).then(res => {
      this.collegescoreList = res.data.records;
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