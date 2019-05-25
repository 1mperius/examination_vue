<template>
  <div>
   <label>年份：</label>
   <Input v-model="param.year" placeholder="请输入年份" clearable style="width: 200px" />
   <label>生源地：</label>
   <Input v-model="param.province" placeholder="请输入生源地" clearable style="width: 200px" />
   <Button type="primary" @click="search" icon="md-search">搜索</Button>
    <Button type="primary" @click="addmajorscore" icon="md-add">增加</Button>
    <Table border :columns="columns" :data="majorscoreList"></Table>

    <Modal v-model="modal" width="530">
      <div>
        <Tabs value="name1">
          <TabPane :label="modalInfo" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="大学" prop="colName">
                  <i-input v-model="formData.colName" size="large"></i-input>
                </FormItem>
                <FormItem label="专业" prop="majName">
                  <i-input v-model="formData.majName" size="large"></i-input>
                </FormItem>
                
                <FormItem label="年份" prop="year">
                  <i-input v-model="formData.year" size="large"></i-input>
                </FormItem>
                <FormItem label="最高分" prop="majMaxScore">
                  <i-input v-model="formData.majMaxScore" size="large"></i-input>
                </FormItem>
                <FormItem label="最低分" prop="majMinScore">
                  <i-input v-model="formData.majMinScore" size="large"></i-input>
                </FormItem>
                <FormItem label="平均分" prop="majAveScore">
                  <i-input v-model="formData.majAveScore" size="large"></i-input>
                </FormItem>
                <FormItem label="生源地" prop="province">
                  <i-input v-model="formData.province" size="large"></i-input>
                </FormItem>
                <FormItem label="招生人数" prop="majNumber">
                  <i-input v-model="formData.majNumber" size="large"></i-input>
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
  listMajorScore,
  addMajorScore,
  deleteMajorScore,
  updateMajorScore
} from "../../request/api";

export default {
  data() {
    return {
      modal: false,
      columns: [
        {
          title: "大学",
          key: "colName",
          align: "center",
          width:150
        },
        {
          title: "专业",
          key: "majName",
          align: "center",
          width:200
        },
        {
          title: "年份 ",
          key: "year",
          align: "center",
          width:70
          
        },
        {
          title: "生源地",
          key: "province",
          align: "center",
          width:80
        },
        {
          title: "最高分",
          key: "majMaxScore",
          align: "center",
          width:80
        },
        {
          title: "最低分",
          key: "majMinScore",
          align: "center",
          width:80
        },
        {
          title: "平均分",
          key: "majAveScore",
          align: "center",
          width:80
        },

        {
          title: "招生人数",
          key: "majNumber",
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
                      this.formData.id = this.majorscoreList[params.index].id,
                        this.formData.colName = this.majorscoreList[
                          params.index
                        ].colName,
                        this.formData.majName = this.majorscoreList[
                          params.index
                        ].majName,
                        this.formData.year = this.majorscoreList[
                          params.index
                        ].year,
                        this.formData.province = this.majorscoreList[
                          params.index
                        ].province,
                        this.formData.majMaxScore = this.majorscoreList[
                          params.index
                        ].majMaxScore,
                        this.formData.majMinScore = this.majorscoreList[
                          params.index
                        ].majMinScore,
                        this.formData.majAveScore = this.majorscoreList[
                          params.index
                        ].majAveScore,

                        this.formData.majNumber = this.majorscoreList[
                          params.index
                        ].majNumber,

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
                      let id = this.majorscoreList[params.index].id;
                      this.$Modal.confirm({
                        title: "信息提醒",
                        content: "你确定删除吗",
                        onOk: () => {
                          this.majorscoreList[params.index].id;
                          deleteMajorScore({ id: id }).then(res => {
                            if (res.status == 200) {
                              this.$Message.success("删除成功");
                              listMajorScore(this.param).then(res => {
                                this.majorscoreList = res.data.records;
                                
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
      majorscoreList: [],
      total: 20,
      param: {
        currPage: 1,
        rows: 10
      },
      imgUrl: "",
      phone: "",
      formData: {
        colName: "",
        majName: "",
        year: "",
        province: "",
        majMaxScore: "",
        majMinScore: "",
        majAveScore: "",
        majNumber: "",
        
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
    listMajorScore(this.param).then(res => {
      self.majorscoreList = res.data.records;
      self.total=res.data.total;
    });
  },
  methods: {
    search(){

          let majorscore = this.param;
            listMajorScore(this.param).then(res => {
            this.majorscoreList = res.data.records;
            this.total = res.data.total
          });
    },
    //点击增加按钮
    addmajorscore() {
      (this.formData = {
        colName: "",
        majName: "",
        year: "",
        province: "",
        majMaxScore: "",
        majMinScore: "",
        majAveScore: "",
        majNumber: ""
      }),
        (this.modal = true),
        (this.modalInfo = "信息增加"),
        (this.flag = true);
    },
    //确定修改
    editAction() {  
      updateMajorScore(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("修改成功"), (this.modal = false);
          listMajorScore(this.param).then(res => {
            this.majorscoreList = res.data.records;
             this.total=res.data.total;
          });
        }
      });
    },
    //确定增加
    addAction() {
      addMajorScore(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("添加成功"), (this.modal = false);
          listMajorScore(this.param).then(res => {
            this.majorscoreList = res.data.records;
          });
        }
      });
    },

    pageChange(page) {
      this.param.currPage = page;
     console.log(page)
      listMajorScore(this.param).then(res => {
      this.majorscoreList = res.data.records;
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