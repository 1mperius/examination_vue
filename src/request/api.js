/**
 * api接口统一管理
 */
import  axios from '@/request/axios.js'
//获得学生信息
export const  listStudentInfo = (parm)=>{return axios.post("/student/listStudentInfo",parm)}
//修改学生信息
export const  updateStudentInfo = (parm)=>{return axios.post("/student/update",parm)}
//删除学生信息
export const  deleteStudentInfo = (parm)=>{return axios.post("/student/delete",parm)}
//增加学生信息
export const  addStudentInfo = (parm)=>{return axios.post("/student/add",parm)}

//获得排名信息
export const  listRank = (parm)=>{return axios.post("/rank/listrank",parm)}
//修改学生信息
export const  updateRank = (parm)=>{return axios.post("/rank/updaterank",parm)}
//删除学生信息
export const  deleteRank = (parm)=>{return axios.post("/rank/deleterank",parm)}
//增加学生信息
export const  addRank = (parm)=>{return axios.post("/rank/addrank",parm)}

//获得招生简章信息
export const  listCollegeRecruitmen = (parm)=>{return axios.post("/collegerecruitmen/listcollegerecruitmen",parm)}
//修改招生简章信息
export const  updateCollegeRecruitmen = (parm)=>{return axios.post("/collegerecruitmen/updatecollegerecruitmen",parm)}
//删除招生简章信息
export const  deleteCollegeRecruitmen = (parm)=>{return axios.post("/collegerecruitmen/deletecollegerecruitmen",parm)}
//增加招生简章信息
export const  addCollegeRecruitmen = (parm)=>{return axios.post("/collegerecruitmen/addcollegerecruitmen",parm)}

//获得学校信息
export const  listCollegeInfo = (parm)=>{return axios.post("/collegeinfo/listcollegeinfo",parm)}
//修改学校信息
export const  updateCollegeInfo = (parm)=>{return axios.post("/collegeinfo/updatecollegeinfo",parm)}
//删除学校信息
export const  deleteCollegeInfo = (parm)=>{return axios.post("/collegeinfo/deletecollegeinfo",parm)}
//增加学校信息
export const  addCollegeInfo = (parm)=>{return axios.post("/collegeinfo/addcollegeinfo",parm)}

//获得学校分数信息
export const  listCollegeScore = (parm)=>{return axios.post("/collegescore/listcollegescore",parm)}
//修改学校分数信息
export const  updateCollegeScore = (parm)=>{return axios.post("/collegescore/updatecollegescore",parm)}
//删除学校分数信息
export const  deleteCollegeScore = (parm)=>{return axios.post("/collegescore/deletecollegescore",parm)}
//增加学校分数信息
export const  addCollegeScore = (parm)=>{return axios.post("/collegescore/addcollegescore",parm)}

//获得专业分数信息
export const  listMajorScore = (parm)=>{return axios.post("/majorscore/listmajorscore",parm)}
//修改专业分数信息
export const  updateMajorScore = (parm)=>{return axios.post("/majorscore/updatemajorscore",parm)}
//删除专业分数信息
export const  deleteMajorScore = (parm)=>{return axios.post("/majorscore/deletemajorscore",parm)}
//增加专业分数信息
export const  addMajorScore = (parm)=>{return axios.post("/majorscore/addmajorscore",parm)}

//获得专业信息
export const  listMajorInfo = (parm)=>{return axios.post("/majorinfo/listmajorinfo",parm)}
//修改专业信息
export const  updateMajorInfo = (parm)=>{return axios.post("/majorinfo/updatemajorinfoe",parm)}
//删除专业信息
export const  deleteMajorInfo = (parm)=>{return axios.post("/majorinfo/deletemajorinfo",parm)}
//增加专业信息
export const  addMajorInfo = (parm)=>{return axios.post("/majorinfo/addmajorinfo",parm)}




export const  adminlogin = (parm)=>{return axios.post("/login",parm)}




