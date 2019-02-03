angular.module('controller',[])
.controller('lndata',['$scope','$http','$timeout',function($scope,$http,$timeout){
    $scope.title="Pickup Order";
	$http.get('po.json')
	.then(function(data){
        $scope.order_pickup=data.data;
        $scope.SecondsToStr = function (count) {
            var day = Math.floor(count / 86400);
            var hour = Math.floor(count / 3600);
            var min = Math.floor(count % 3600 / 60);
            var sec = Math.floor(count % 3600 % 60);
            var secondsToStr = '' + ('00' + hour).substr(-2) + ':' + ('00' + min).substr(-2) + ':' + ('00' + sec).substr(-2);       
            return {RemainingTime:secondsToStr};
        }
        
        $scope.UpdateTimer = function () {
            for(var k=0;k<$scope.Timer.length;k++){
                console.log($scope.Timer);
            if ((!$scope.Timer[k]) || (!$scope.Timer[k].Seconds))
                return true;
              var cDate=new Date();
              var diff = (cDate - new Date($scope.Timer[k].InitTime)) / 1000;
            if (diff < $scope.Timer[k].Seconds) {
                var secondToStr = $scope.SecondsToStr($scope.Timer[k].Seconds - diff);
                $scope.Timer[k].RemainingTime = secondToStr.RemainingTime;
                return true;
            }
            else {
                $scope.Timer[k].RemainingTime = '00:00:00';
                return false;
            }
        }
    }
    $scope.Countdown = function () {
        $timeout(function () {
            if ($scope.UpdateTimer())
                $scope.Countdown();
        }, 1000);
    };
    $scope.InitTimer = function (count) {
        var timers = [];
        for(var i=0;i<$scope.order_pickup.length;i++){
           var timer={
            RemainingTime: "",
            InitTime: new Date($scope.order_pickup[i].waktu),
            Seconds: count
        }
        timers.push(timer);
    }
        $scope.Countdown();
        return timers;
    }
    $scope.SecondsRemains = 6000;
    $scope.Timer = $scope.InitTimer($scope.SecondsRemains);
    }) 
}])