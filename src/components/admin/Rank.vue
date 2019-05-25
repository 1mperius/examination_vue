<template>
  <div>
    <label>年份：</label>
   <Input v-model="param.years" placeholder="请输入年份" clearable style="width: 200px" />
   <label>生源地：</label>
   <Input v-model="param.province" placeholder="请输入生源地" clearable style="width: 200px" />
   <Button type="primary" @click="search" icon="md-search">搜索</Button>
    <Button type="primary" @click="addrank" icon="md-add">增加</Button>
    <Table border :columns="columns" :data="rankList"></Table>

    <Modal v-model="modal" width="530">
      <div>
        <Tabs value="name1">
          <TabPane :label="modalInfo" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="年份" prop="years">
                  <i-input v-model="formData.years" size="large"></i-input>
                </FormItem>
                <FormItem label="生源地" prop="province">
                  <i-input v-model="formData.province" size="large"></i-input>
                </FormItem>
                <FormItem label="类别" prop="type">
                  <i-input v-model="formData.type" size="large"></i-input>
                </FormItem>
                <FormItem label="排名" prop="rank">
                  <i-input v-model="formData.rank" size="large"></i-input>
                </FormItem>
                <FormItem label="分数" prop="score">
                  <i-input v-model="formData.score" size="large"></i-input>
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
  listRank,
  addRank,
  deleteRank,
  updateRank
} from "../../request/api";

export default {
  data() {
    return {
      modal: false,
      columns: [
        {
          title: "年份",
          key: "years",
          align: "center",
          width:100
        },
        {
          title: "生源地",
          key: "province",
          align: "center",
          width:100
        },
        {
          title: "类别",
          key: "type",
          align: "center",
          width:100
        },
        {
          title: "排名",
          key: "rank",
          align: "center"
        },
        {
          title: "分数",
          key: "score",
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
                      this.formData.id = this.rankList[params.index].id,
                        this.formData.years = this.rankList[
                          params.index
                        ].years,
                        this.formData.province = this.rankList[
                          params.index
                        ].province,
                        this.formData.type = this.rankList[
                          params.index
                        ].type,
                        this.formData.rank = this.rankList[
                          params.index
                        ].rank,
                        this.formData.score = this.rankList[
                          params.index
                        ].score,
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
                      let id = this.rankList[params.index].id;
                      this.$Modal.confirm({
                        title: "信息提醒",
                        content: "你确定删除吗",
                        onOk: () => {
                          this.rankList[params.index].id;
                          deleteRank({ id: id }).then(res => {
                            if (res.status == 200) {
                              this.$Message.success("删除成功");
                              listRank(this.param).then(res => {
                                this.rankList = res.data.records;
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
      rankList: [],
      total: 20,
      param: {
        currPage: 1,
        rows: 10
      },
      imgUrl: "",
      phone: "",
      formData: {
        years: "",
        type: "",
        rank: "",
        score: "",
        province: ""
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
    listRank(this.param).then(res => {
      self.rankList = res.data.records;
      self.total=res.data.total;
    });
  },
  methods: {
    search(){
          let rank = this.param;
          debugger
            listRank(this.param).then(res => {
            this.rankList = res.data.records;
            this.total = res.data.total
          });
    },
    //点击增加按钮
    addrank() {
      (this.formData = {
        years: "",
        type: "",
        rank: "",
        score: "",
        province: ""
      }),
        (this.modal = true),
        (this.modalInfo = "信息增加"),
        (this.flag = true);
    },
    //确定修改
    editAction() {  
      updateRank(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("修改成功"), (this.modal = false);
          listRank(this.param).then(res => {
            this.rankList = res.data.records;
            this.total = res.data.total
          });
        }
      });
    },
    //确定增加
    addAction() {
      addRank(this.formData).then(res => {
        if (res.status == 200) {
          this.$Message.success("添加成功"), (this.modal = false);
          listRank(this.param).then(res => {
            this.rankList = res.data.records;
            this.total = res.data.total
          });
        }
      });
    },

    pageChange(page) {
      this.param.currPage = page,
        listRank(this.param).then(res => {
          this.rankList = res.data.records;
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