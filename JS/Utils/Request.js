// const service_url = 'http://106.14.70.38:8080/smartMonitor';
//外网
//const service_url = 'http://110.186.51.123:8080/smartMonitor';
const service_url = 'http://182.136.8.130:4808/smartMonitor';
export const LOGIN_URL=service_url+'/api/login';  //登录地址
//查询工单
export const WORKORDER_URL=service_url+'/api/queryProcess';

//查询工单优先级和数量
export const QUERY_PRI_NUM = service_url+'/api/queryPriNum';
//查询工单列表
export const QUERY_PROCESSINFO_BY_PRI = service_url+'/api/queryProcessInfoByPri';
//查询工单详情
export const QUERYPROCESSINFO_URL = service_url+'/api/queryProcessInfo';
//工单详情页查询工单图片
export const QUERY_FILE_BY_BID = service_url+'/api/queryFileByBid';
//修改密码
export const MODIFYPASSWORD_URL=service_url+'/api/resetPassword';
//处理工单
export const CONDUCTPROCESS_URL=service_url+'/api/conductProcess';
//查询企业信息
export const QUERYENTINFO_URL=service_url+'/api/queryEntInfo';
//搜索我的工单
export const SEARCHPROCESS_URL=service_url+'/api/searchProcess';
//上传附件
export const UPLOAD_URL=service_url+'/api/upload';

export const DEVICESINFO_URL=service_url+'/api/queryCameraInfo';
//登出
export const LOGOUT_URL=service_url+'/api/logout';
//查询个人信息
export const QUERYUSERINFO_URL=service_url+'/api/queryUserInfo';
//获取快照
export const GET_SNAPSHOT=service_url+'/api/getSnapshot';
//查询我的快照
export const QUERY_SNAPSHOT=service_url+'/api/querySnapshot';
//查询工单处理类型
export const GET_PROCESS_DEAL_TYPE = service_url+'/api/getProcessDealType';
//地图
export const MAP_URL = service_url+'/api/map';
//报表
export const REPORT_FORMS = service_url+'/report/showChart';

