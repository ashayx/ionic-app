angular.module('starter.controllers', [])
/**
 * [主页]
 * @param  {[type]} $scope) {}          [description]
 * @return {[type]}         [description]
 */
 .controller('HomeCtrl', ['$scope','HomeService' ,function($scope,HomeService) {
 	/*加载数据*/
    HomeService.loadData().then(function success (response) {
        var initData=[];
        for(var i=0;i<6;i++){//初始加载6条
          initData.push(response.data[i]);
        }
        $scope.foods = initData;
         // console.log($scope.foods)
      }, function error (response) {
        console.log('error');
      });
    /*上拉加载*/
    $scope.loadMore = function() {
        HomeService.loadData()   
        .success(function(response) { 
            for (var i=$scope.foods.length;i<response.length;i++){//response.length，当前json的数量
        		//加载一条
	            $scope.foods.push(response[i])
	            break;
       		}  
       		$scope.$broadcast('scroll.infiniteScrollComplete');        
     	})
    };
    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
    /*选择城市*/
	var vm=$scope.vm={};
	vm.CityPickData1 = {
	    areaData: [],
	    defaultAreaData: ['河北', '石家庄', '长安区'],
	    tag: '-',
	    iconClass: 'ion-location',
	    // title: '选择地址'
	}
       
 }])
 /**
  * [description]
  * @param  {[type]} $scope           [description]
  * @param  {[type]} $stateParams     [description]
  * @param  {[type]} HomeService      [description]
  * @param  {[type]} $location        [description]
  * @param  {[type]} $anchorScroll){   HomeService.foodData().then(function success (response) {                                                       $scope.detailClass [description]
  * @param  {[type]} function         error                                 ()      {                console.log('加载失败')   })     $scope.screenHeight [description]
  * @return {[type]}                  [description]
  */
 .controller('FoodDetailCtrl', ['$scope','$stateParams','HomeService','$location','$anchorScroll',
    function($scope,$stateParams,HomeService,$location,$anchorScroll){
 	//加载外卖列表数据
      HomeService.foodData().then(function success (response) {
     	  //$stateParams.id获取点击的id
     	  $scope.detailClass = response.data[$stateParams.id]
     	  // console.log($scope.detailClass[1].length)
        var len = 0;  
        for (var j = 0; j < $scope.detailClass.length; j++) {
          len += $scope.detailClass[j].length;            
        }
        // console.log(len)
     	},function error () {
     	   console.log('加载失败')
     	})
      //菜单滚动区的高度
      $scope.screenHeight=screen.height-100+'px';
      // console.log($scope.screenHeight)

      //锚点跳转
      $scope.gotoAnchor = function(x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
          // 将$location.hash设置为`newHash` and
          // $anchorScroll也将自动滚到该处
          $location.hash('anchor' + x);
        } else {
          // 显式地调用 $anchorScroll()方法 ,
          // 因为 $location.hash 并没有改变
          $anchorScroll();
        }
        console.log("触发")
      }
      //订单总价      
      var getTotal = function() {
        $scope.total = 0;
        for (var pindex = 0; pindex < $scope.detailClass.length; pindex++) {
          for (var index = 0; index < $scope.detailClass[pindex].length; index++) { 
            $scope.total = $scope.total + $scope.detailClass[pindex][index].num * $scope.detailClass[pindex][index].price ; 
            
          }
        }
        // console.log( $scope.detailClass[0][0].num*$scope.detailClass[0][0].price);                  
        return $scope.total;
      }
      //订单总数量
       var getCount = function() {
        $scope.count = 0;
        for (var pindex = 0; pindex < $scope.detailClass.length; pindex++) {
          for (var index = 0; index < $scope.detailClass[pindex].length; index++) { 
            $scope.count = $scope.count + $scope.detailClass[pindex][index].num *1; 
            // console.log($scope.count)
          }
        }
        return $scope.count;
      }
      //按钮展示隐藏
      $scope.showbutton = function(index,parentindex){
        // console.log( $scope.detailClass[parentindex][index].num);
        if($scope.detailClass[parentindex][index].num >0){
          return true;
        }else{
          return false;
        }
      }
      $scope.CarItem = [];
      // 订单操作
      // 加
      $scope.add =function (index,parentindex) {
        $scope.detailClass[parentindex][index].num++;
        // console.log( $scope.detailClass[parentindex][index].num);
        //如果弹出框里没有，并且num大于0,不重复添加
        if($scope.CarItem.indexOf($scope.detailClass[parentindex][index]) < 0 && $scope.detailClass[parentindex][index].num >0){  
          $scope.CarItem.push($scope.detailClass[parentindex][index]);
        }      
        $scope.CarItem[$scope.CarItem.indexOf($scope.detailClass[parentindex][index])].num =  $scope.detailClass[parentindex][index].num;
        console.log($scope.CarItem)

        getTotal();
        getCount();
        //监听变化
        $scope.$watch($scope.detailClass[parentindex][index].num,getTotal,true);
        $scope.$watch($scope.detailClass[parentindex][index].num,getCount,true);
          // console.log(index)
      }
      //减
      $scope.reduce = function (index,parentindex) {
        if($scope.detailClass[parentindex][index].num>0){
          $scope.detailClass[parentindex][index].num--;
          // console.log( $scope.detailClass[parentindex][index].num);
            
            $scope.CarItem[$scope.CarItem.indexOf($scope.detailClass[parentindex][index])].num =  $scope.detailClass[parentindex][index].num;

            if ($scope.CarItem.indexOf($scope.detailClass[parentindex][index]) >= 0 && $scope.detailClass[parentindex][index].num ===0) {
              $scope.CarItem.splice($scope.CarItem.indexOf($scope.detailClass[parentindex][index]),1);
            }        
          console.log($scope.CarItem);
          $scope.$watch($scope.detailClass[parentindex][index].num,getTotal,true);
          $scope.$watch($scope.detailClass[parentindex][index].num,getCount,true);
        }
      }
      //购物车添加
      $scope.carAdd = function(index){
        $scope.CarItem[index].num++;
        $scope.$watch($scope.CarItem[index].num,getTotal,true);
        $scope.$watch($scope.CarItem[index].num,getCount,true);
      }
      //购物车减少
      $scope.carReduce = function(index){
        $scope.CarItem[index].num--;
        $scope.$watch($scope.CarItem[index].num,getTotal,true);
        $scope.$watch($scope.CarItem[index].num,getCount,true);
        if ($scope.CarItem[index].num === 0) {
          $scope.CarItem.splice(index,1);
        }
      }

      //购物车弹出
      $scope.showCar = true;
      $scope.CartList = function () {
        $scope.showCar = !$scope.showCar;
      }
      //购物车数量
      
      

 }])
//附近  //注入附近服务
.controller('NearbyCtrl', function($scope,NearbyService,$http) {
  //service获取初始数据
  NearbyService.getdata().then(function success (response) {
    var initData=[];
    for(var i=0;i<6;i++){//初始加载6条
      initData.push(response.data.sites[i]);
    }
    $scope.loaddata = initData;
    // console.log(initData.length)
    // console.log($scope.loaddata)
  }, function error () {
    console.log('加载失败')
  });
  //下拉刷新
  $scope.doRefresh = function() {
    NearbyService.newdata()
      .success(function(response) {
        var initData=[];
        for(var i=0;i<6;i++){//初始加载6条
          initData.push(response.sites[i]);
        }
        $scope.loaddata = initData;
      })
      .finally(function() {
         // 停止广播ion-refresher
         $scope.$broadcast('scroll.refreshComplete');
      });
  };
  //上拉加载
  $scope.loadMore = function() {
    $http.get('data.json')   
    .success(function(response) {      
        for (var i=$scope.loaddata.length;i<response.sites.length;i++){//response.sites.length，当前json的数量
          //加载一条
          $scope.loaddata.push(response.sites[i])
          break;
        }  
        $scope.$broadcast('scroll.infiniteScrollComplete');        
    })
  };
  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMore();
  });

})
//附近详情
.controller('NearbyDetailCtrl', function($scope, $stateParams, NearbyService) {
   NearbyService.getdata().then(function success (response) {
      $scope.loaddata = response.data.sites;
      //$stateParams.id获取点击的id
      $scope.detailData = $scope.loaddata[$stateParams.id]
   },function error () {
      console.log('加载失败')
   })

})
//订单
.controller('OrderCtrl', function($scope) {
 
})
//我的页面
.controller('MineCtrl', function($scope,$ionicModal) {
	$scope.screenwidth=screen.width;
   $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
}).then(function(login) {
  $scope.login = login;
}); 
$ionicModal.fromTemplateUrl('templates/register.html', {
  scope: $scope,
}).then(function(register) {
  $scope.register = register;
}); 

})

//设置
.controller('SettingCtrl',function ($scope) {})

