angular.module('controller',[])
.controller('lndata',['$scope','$http','$timeout',function($scope,$http,$timeout){
    $scope.title="Pickup Order";
 $http.get('po.json')
 .then(function(data){
        $scope.op=data.data;
        
        $scope.UpdateTimer = function () {
            if ((!$scope.Timer))
                return true;
                for(var i=0;i<$scope.Timer.length;i++){
              var cDate=new Date();
              var diff = cDate - $scope.Timer[i].InitTime;
            if (diff < $scope.Timer[i].Seconds) {
                var secondToStr =$scope.Timer[i].Seconds - diff;
                $scope.Timer[i].RemainingTime = secondToStr.RemainingTime;
            }else {
                $scope.Timer[i].RemainingTime = '00:00:00';
            }
        }
        return true;
    }
    $scope.Countdown = function () {
        $timeout(function () {
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
