define(["posService"],function(){var angular=require("angular");return["$scope","$window","ajaxService","posService","getCookieService","$rootScope","modalService","$timeout",function($scope,$window,ajaxService,posService,getCookieService,$rootScope,modalService,$timeout){function trueSave(lossVo){ajaxService.AjaxPost(lossVo,"postrade/posCardUsed/saveLossOperate.do").then(function(result){lossVo.forbideSave=!1,result.status&&(lossVo.operationType=="1"?modalService.info({content:"会员卡挂失成功!",type:"ok"}):modalService.info({content:"会员卡取消挂失成功!",type:"ok"}),$scope.entranceFrom==0?($scope.doLossVo={cardNo:"",tsCode:"",operationType:"1",sessionId:sessionId,forbideSave:!1},$scope.cancelLossVo={cardNo:"",tsCode:"",operationType:"2",sessionId:sessionId,forbideSave:!1},$scope.cardNoDisabled=!1,$rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null):($scope.getMemeberAndCardInfo(lossVo.cardNo),posService.goBack()))},function(){$scope.lossVo.forbideSave=!1})}var sessionId=getCookieService.getCookie("CRMSESSIONID");$scope.tipMsg={},$scope.entranceFrom=0,$scope.cardNoDisabled=!1,$scope.doLossVo={cardNo:"",tsCode:"",operationType:"1",sessionId:sessionId,forbideSave:!1},$scope.cancelLossVo={cardNo:"",tsCode:"",operationType:"2",sessionId:sessionId,forbideSave:!1},$scope.setFocus=function(eId){var setTimer=posService.setFocus(eId);$scope.$on("$destroy",function(){$timeout.cancel(setTimer)})},$rootScope.currentuserinfo&&($scope.entranceFrom=1,$scope.currUserInfo=$rootScope.currentuserinfo,$scope.doLossVo.cardNo=$scope.currUserInfo.cardInfoBean.number,$scope.cancelLossVo.cardNo=$scope.currUserInfo.cardInfoBean.number,$scope.cardNoDisabled=!0),$scope.getMemeberAndCardInfo=function(cardNo){$rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null;if(!cardNo||cardNo==""||!/^(((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})|([1-9](\d{4,9}|\d{11,15})))$/.test(cardNo))return!1;ajaxService.AjaxPost({paramValue:cardNo,sessionId:sessionId},"postrade/memberhome/memberhomeinfo.do").then(function(result){if(result.status&&result.data){var data=result.data;$rootScope.cardoperatetoeditusrmemberinfo=data.memberInfoBean,$rootScope.currentuserinfo=data,$scope.currUserInfo=$rootScope.currentuserinfo,$scope.doLossVo.cardNo=$scope.currUserInfo.cardInfoBean.number,$scope.cancelLossVo.cardNo=$scope.currUserInfo.cardInfoBean.number}})},$scope.goBack=function(){$scope.entranceFrom==0&&($rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null),posService.goBack()},$scope.saveLossOperation=function(lossVo){lossVo.forbideSave=!0;if(!lossVo.cardNo||lossVo.cardNo==""||!/^[1-9](?:\d{0,9}|\d{11,15})$/.test(lossVo.cardNo))return modalService.info({title:"提示",content:"获取不到正确卡号!",size:"sm",type:"confirm"}),lossVo.forbideSave=!1,!1;lossVo.tsCode?trueSave(lossVo):ajaxService.AjaxPost({sessionId:sessionId},"postrade/postscode/generatorTsCode.do").then(function(result){result.tsCode?(lossVo.tsCode=result.tsCode,trueSave(lossVo)):lossVo.forbideSave=!1},function(){lossVo.forbideSave=!1})}}]});