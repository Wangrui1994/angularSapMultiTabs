define(["require","ngAMD"],function(require){var ngAMD=require("ngAMD");ngAMD.controller("cardUpgradeRuleDetailCtrl",["$scope","$rootScope","ajaxService","register",function($scope,$rootScope,ajaxService,register){$scope.edit=register.getRoot("修改"),$scope.card_upgrade_detaildata={sessionId:$rootScope.sessionId,upgradeType:1,upgradeStatus:0,name:"",initList:[{value:0,cardtype:0}]};var tagdata=$rootScope.TabsData,data=angular.copy(tagdata);$scope.card_upgrade_detaildata=data,$scope.card_upgrade_detaildata.name=data.name,$scope.card_upgrade_detaildata.upgradeType=data.upgradeType,$scope.card_upgrade_detaildata.upgradeStatus=data.upgradeStatus,$scope.from=data.from;var searchkey={id:data.id,pageCount:1e3,sessionId:$rootScope.sessionId};ajaxService.AjaxPost(searchkey,"memberequity/cardupgrade/cardUpgradeDetailById.do").then(function(result){$scope.card_upgrade_detaildata.initList=result.pageInfo.list,result.pageInfo.size>0?$scope.Count=result.pageInfo.size:($scope.Count=1,$scope.card_upgrade_detaildata.initList=null)});var comboSearchkey={id:data.id,sessionId:$rootScope.sessionId,pageCount:1e3};ajaxService.AjaxPost(comboSearchkey,"memberequity/cardupgrade/cardTypeByIdCombo.do").then(function(result){$scope.comboList=result.pageInfo.list}),$scope.add=function(type){type==0&&$scope.Count++;var addObj={value:0};$scope.card_upgrade_detaildata.initList.push(addObj)},$scope.reduce=function(index,type){type==0&&$scope.Count--,$scope.card_upgrade_detaildata.initList.splice(index,1)},$scope.cancel=function(){register.switchTab({id:$scope.from})},$scope.gotoEdit=function(cardUpgrade){console.log(cardUpgrade);var editTab={title:"升级规则修改",id:"cardUpgradeRuleEditCtrl"+cardUpgrade.id,from:$scope.from,ctrlName:"cardUpgradeRuleEditCtrl",ctrl:"memberequity/cardupgraderule/cardUpgradeRuleEdit",template:"memberequity/cardupgraderule/cardUpgradeRuleEdit.html",type:"single",ng_show:!1};register.addToTabs(editTab,cardUpgrade)}}])});