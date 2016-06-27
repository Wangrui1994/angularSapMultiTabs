define(["require","css!score_rule_css"],function(require){var ngAMD=require("ngAMD");return ngAMD.controller("scoreRuleCtrl",["$scope","getCookieService","appConstant","register","$rootScope",function($scope,getCookieService,appConstant,register,$rootScope){var sessionId=$rootScope.sessionId;$rootScope.editScoreRule=register.getRoot("修改"),$scope.conditions={ajaxUrl:"memberEquity/scoreRule/list.do",request:{sessionId:sessionId,pageNo:"1",pageCount:appConstant.pageSet.numPerPage},filter:[{type:"normal",field:"适用卡型：",requestFiled:"cardTypeId",value:[],ajaxUrl:"memberequity/cardtype/getCardTypeForSearch.do",request:{sessionId:sessionId}},{type:"normal",field:"有效状态：",requestFiled:"ruleStatus",value:[{name:"全部",state:!0,value:null},{name:"已生效",state:!1,value:1},{name:"未生效",state:!1,value:0},{name:"已过期",state:!1,value:2}]},{type:"normal",field:"启用状态：",requestFiled:"isAble",value:[{name:"全部",state:!0,value:null},{name:"已启用",state:!1,value:"1"},{name:"未启用",state:!1,value:"0"}]}]},$scope.pageSet={title:"积分规则列表",currentPage:appConstant.pageSet.currentPage,maxSize:appConstant.pageSet.maxSize,numPerPage:appConstant.pageSet.numPerPage,button:{title:"新建",newtab:{title:"新建积分规则",id:"newScoreRule",template:"memberequity/scorerule/newScoreRule.html",ctrlName:"newScoreRule",ctrl:"memberequity/scorerule/newScoreRule",from:10020,type:"multiple",ng_show:!1}},table:[{field:"index",desc:"编号"},{field:"name",desc:"积分规则名称",column:"name"},{field:"type",desc:"积分方式",column:"type",filter:"tranScoreRuleType"},{field:["type","howMoney","howScore"],desc:"积分内容",filter:"tranScoreRuleContent"},{field:["isDate","isTime","startTime","endTime"],desc:"有效期",filter:"tranScoreRuleIsTime",isRender:"true"},{field:"isAble",desc:"启用状态",column:"is_able",filter:"tranScoreRuleIsAble",isRender:"true"}],task:[{type:"toAjax",content:"scoreRule",ajaxUrl:"memberEquity/scoreRule/update.do",field:"isAble",filter:"tranScoreRuleIsAble2"},{type:"toChange",desc:"修改",newtab:{title:"修改积分规则",id:"scoreEdit",from:10020,ctrlName:"scoreRuleEdit",ctrl:"memberequity/scorerule/scoreRuleEdit",template:"memberequity/scorerule/scoreRuleEdit.html",ng_show:!1}},{type:"delete",content:"scoreRule",ajaxUrl:"memberEquity/scoreRule/delete.do",desc:"删除"},{type:"toDetail",desc:"详情",newtab:{title:"积分规则详情",ctrlName:"scoreRuleDetail",ctrl:"memberequity/scorerule/scoreRuleDetail",from:10020,id:"scoreDetail",template:"memberequity/scorerule/scoreRuleDetail.html",ng_show:!1}}]}}]),"scoreRuleCtrl"});