<template>
  <div>
   <label>年份：</label>
   <Input v-model="param.years" placeholder="请输入年份" clearable style="width: 200px" />
   <label>学校：</label>
   <Input v-model="param.colId" placeholder="请输入生源地" clearable style="width: 200px" />
   <Button type="primary" @click="search" icon="md-search">搜索</Button>
    <Button type="primary" @click="addcollegerecruitmen" icon="md-add">增加</Button>
    <Table border :columns="columns" :data="collegerecruitmenList"></Table>

    <Modal v-model="modal" width="530">
      <div>
        <Tabs value="name1">
          <TabPane :label="modalInfo" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="年份" prop="years">
                  <i-input v-model="formData.years" size="large"></i-input>
                </FormItem>
                <FormItem label="学校" prop="colId">
                  <i-input v-model="formData.colId" size="large"></i-input>
                </FormItem>
                <FormItem label="标题" prop="tittle">
                  <i-input v-model="formData.tittle" size="large"></i-input>
                </FormItem>
                <FormItem label="内容" prop="contents">
                  <i-input v-model="formData.contents" size="large"></i-input>
                </FormItem>
                <FormItem label="创建人" prop="creater">
                  <i-input v-model="formData.creater" size="large"></i-input>
                </FormItem>
                <FormItem label="日期" prop="date">
                  <i-input v-model="formData.date" size="large"></i-input>
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
  listCollegeRecruitmen,
  addCollegeRecruitmen,
  deleteCollegeRecruitmen,
  updateCollegeRecruitmen
} from "../../request/api";

export default {
  data() {
    return {
      modal: false,
      columns: [
        {
          title: "学校",
          key: "colId",
          align: "center",
          width:100
        },
        {
          title: "年份",
          key: "years",
          align: "center",
          width:100
        },
        {
          title: "标题",
          key: "tittle",
          align: "center"
        },
        {
          title: "内容",
          key: "contents",
          align: "center"
        },
        {
          title: "创建人",
          key: "creater",
          align: "center",
          width:100
        },
        {
          title: "日期",
          key: "date",
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
                      this.formData.id = this.collegerecruitmenList[params.index].id,
                        this.formData.years = this.collegerecruitmenList[
                          params.index
                        ].years,
                        this.formData.colId = this.collegerecruitmenList[
                          params.index
                        ].colId,
                        this.formData.tittle = this.collegerecruitmenList[
                          params.index
                        ].tittle,
                        this.formData.contents = this.collegerecruitmenList[
                          params.index
                        ].contents,
                        this.formData.creater = this.collegerecruitmenList[
                          params.index
                        ].creater,
                        this.formData.date = this.collegerecruitmenList[
                          params.index
                        ].date,
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
                      let id = this.collegerecruitmenList[params.index].id;
                      this.$Modal.confirm({
                        title: "信息提醒",
                        content: "你确定删除吗",
                        onOk: () => {
                          this.collegerecruitmenList[params.index].id;
                          deleteCollegeRecruitmen({ id: id }).then(res => {
                            if (res.status == 200) {
                              this.$Message.success("删除成功");
                              listCollegeRecruitmen(this.param).then(res => {
                                this.collegerecruitmenList = res.data.records;
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
      collegerecruitmenList: [],
      total: 20,
      param: {
        currPage: 1,
        rows: 10
      },
      imgUrl: "",
      phone: "",
      formData: {
        colId: "",
        years: "",
        tittle: "",
        contents: "",
        creater: "",
        date: ""
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
    listCollegeRecruitmen(this.param).then(res => {
      self.collegerecruitmenList = res.data.records;
    });
  },
  methods: {
    search(){
          let collegerecruitmen = this.param;
          debugger
            listCollegeRecruitmen(this.param).then(res => {
            this.collegerecruitmenList = res.data.records;
            this.total = res.data.total
          });
    },
    //点击增加按钮
    addcollegerecruitmen() {
      (this.formData = {
        years: "",
        colId: "",
        tittle: "",
        contents: "",
        creater: "",
        date:""
      }),
        (this.modal = true),
        (this.modalInfo = "信息增加"),
        (this.flag = true);
    },
    //确定修改
    editAction() {  
      updateCollegeRecruitmen(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("修改成功"), (this.modal = false);
          listCollegeRecruitmen(this.param).then(res => {
            this.collegerecruitmenList = res.data.records;
          });
        }
      });
    },
    //确定增加
    addAction() {
      addCollegeRecruitmen(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("添加成功"), (this.modal = false);
          listCollegeRecruitmen(this.param).then(res => {
            this.collegerecruitmenList = res.data.records;
          });
        }
      });
    },

    pageChange(page) {
      this.param.currPage = page,
        listCollegeRecruitmen(this.param).then(res => {
          this.collegerecruitmenList = res.data.records;
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