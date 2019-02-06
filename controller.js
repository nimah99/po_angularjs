angular.module('controller',[])
.controller('lndata',['$scope','$http','$timeout',function($scope,$http,$timeout){
    $scope.title="Pickup Order";
 $http.get('po.json')
 .then(function(data){
        $scope.op=data.data;
        $scope.Timer = [{ RemainingTime: '00:00:00'}];
        $scope.SecondsToStr = function (count) {
            var day = Math.floor(count / 86400);
            var hour = Math.floor(count / 3600);
            var min = Math.floor(count % 3600 / 60);
            var sec = Math.floor(count % 3600 % 60);
            var secondsToStr = '' + ('00' + hour).substr(-2) + ':' + ('00' + min).substr(-2) + ':' + ('00' + sec).substr(-2);     
            //if(count<6000)
            return {RemainingTime: secondsToStr};
        }
        
        $scope.UpdateTimer = function () {
            if ((!$scope.Timer))
                return true;
                for(var i=0;i<$scope.Timer.length;i++){
              var cDate=new Date();
              var diff = (cDate - $scope.Timer[i].InitTime) / 1000;
            if (diff < $scope.Timer[i].Seconds) {
                var secondToStr = $scope.SecondsToStr($scope.Timer[i].Seconds - diff);
                $scope.Timer[i].RemainingTime = secondToStr.RemainingTime;
            }else {
                $scope.Timer[i].RemainingTime = '00:00:00';
            }
        }
        return true;
    }
    $scope.Countdown = function () {
        $timeout(function () {
            if ($scope.UpdateTimer())
                $scope.Countdown();
        }, 1000);
    };
    $scope.InitTimer = function (counts) {
        var timers = [];
        for(var i=0;i<$scope.op.length;i++){
           var timer={
            RemainingTime: "",
            InitTime: new Date($scope.op[i].waktu),
            Seconds: counts
        }
        timers.push(timer);
    };
        $scope.Countdown();
        return timers;
    }
    $scope.SecondsRemains = 6000;
    $scope.Timer = $scope.InitTimer($scope.SecondsRemains);
    }) 
}])
