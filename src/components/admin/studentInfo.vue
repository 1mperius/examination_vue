<template>
  <div>
    <label>姓名：</label>
   <Input v-model="param.stuName" placeholder="请输入姓名" clearable style="width: 200px" />
   <label>生源地：</label>
   <Input v-model="param.stuProvince" placeholder="请输入生源地" clearable style="width: 200px" />

    <Button type="primary" @click="search" icon="md-search">搜索</Button>
    <Button type="primary" @click="add" icon="md-add">增加</Button>
    
    <Table border :columns="columns" :data="studentList"></Table>

    <Modal v-model="modal" width="530">
      <div>
        <Tabs value="name1">
          <TabPane :label="modalInfo" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="姓名" prop="stuName">
                  <i-input v-model="formData.stuName" size="large"></i-input>
                </FormItem>
                <FormItem label="生源地" prop="stuProvince">
                  <i-input v-model="formData.stuProvince" size="large"></i-input>
                </FormItem>
                <FormItem label="性别" prop="stuSex">
                  <RadioGroup v-model="formData.stuSex">
                    <Radio label="男">
                      <Icon type="md-male"></Icon>
                      <span>男</span>
                    </Radio>
                    <Radio label="女">
                      <Icon type="md-female"></Icon>
                      <span>女</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="邮箱" prop="stuMail">
                  <i-input v-model="formData.stuMail" size="large"></i-input>
                </FormItem>
                <FormItem label="分数" prop="stuScore">
                  <i-input v-model="formData.stuScore" size="large"></i-input>
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
  listStudentInfo,
  addStudentInfo,
  deleteStudentInfo,
  updateStudentInfo
} from "../../request/api";

export default {
  data() {
    return {
      modal: false,
      columns: [
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width:100
        },
        {
          title: "生源地",
          key: "stuProvince",
          align: "center",
          width:100
        },
        {
          title: "性别",
          key: "stuSex",
          align: "center",
          width:100
        },
        {
          title: "邮箱",
          key: "stuMail",
          align: "center"
        },
        {
          title: "分数",
          key: "stuScore",
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
                      this.formData.id = this.studentList[params.index].id,
                        this.formData.stuName = this.studentList[
                          params.index
                        ].stuName,
                        this.formData.stuProvince = this.studentList[
                          params.index
                        ].stuProvince,
                        this.formData.stuSex = this.studentList[
                          params.index
                        ].stuSex,
                        this.formData.stuMail = this.studentList[
                          params.index
                        ].stuMail,
                        this.formData.stuScore = this.studentList[
                          params.index
                        ].stuScore,
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
                      let id = this.studentList[params.index].id;
                      this.$Modal.confirm({
                        title: "信息提醒",
                        content: "你确定删除吗",
                        onOk: () => {
                          this.studentList[params.index].id;
                          deleteStudentInfo({ id: id }).then(res => {
                            if (res.status == 200) {
                              this.$Message.success("删除成功");
                              listStudentInfo(this.param).then(res => {
                                this.studentList = res.data.records;
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
      studentList: [],
      total: 20,
      param: {
        currPage: 1,
        rows: 10,
        stuName:'',
        stuProvince:''          
      },
      imgUrl: "",
      phone: "",
      formData: {
        stuName: "",
        stuSex: "",
        stuMail: "",
        stuScore: "",
        stuProvince: ""
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
    listStudentInfo(this.param).then(res => {
      self.studentList = res.data.records;
      self.total=res.data.total;
    });
  },
  methods: {
    search(){
          let studentInfo = this.param;
          
            listStudentInfo(this.param).then(res => {
            this.studentList = res.data.records;
            this.total = res.data.total
          });
    },
    //点击增加按钮
    add() {
      (this.formData = {
        stuName: "",
        stuSex: "",
        stuMail: "",
        stuScore: "",
        stuProvince: ""
      }),
        (this.modal = true),
        (this.modalInfo = "信息增加"),
        (this.flag = true);
    },
    //确定修改
    editAction() {  
      updateStudentInfo(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("修改成功"), (this.modal = false);
          listStudentInfo(this.param).then(res => {
            this.studentList = res.data.records;
            this.total = res.data.total
          });
        }
      });
    },
    //确定增加
    addAction() {
      addStudentInfo(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("添加成功"), (this.modal = false);
          listStudentInfo(this.param).then(res => {
            this.studentList = res.data.records;
            this.total = res.data.total
          });
        }
      });
    },

    pageChange(page) {
      this.param.currPage = page;
      listStudentInfo(this.param).then(res => {
      this.studentList = res.data.records;
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
