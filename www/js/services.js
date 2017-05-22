angular.module('starter.services', [])

.service('HomeService',function ($http) {
  /*home加载数据*/
	this.loadData=function () {
		return $http({
		   method:'GET',
		   url:'food.json'
		 })
	}
  /*加载外卖详情页*/
  this.foodData=function () {
    return $http({
       method:'GET',
       url:'fooddetail.json'
     })
  }
  
})
.service('NearbyService', function($http) {   
	  /*加载数据*/
    this.getdata=function () {
       return $http({
          method:'GET',
          url:'data.json'
        })
    }
    /*刷新数据*/
    this.newdata=function() {
    	return $http({
          method:'GET',
          url:'data.json'
        })
    }
  
})

