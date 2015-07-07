describe("Testing the controller", function() {
    var $scope, recentMessagesReply;

    beforeEach(module('chatApp'));

    beforeEach(function(){
        recentMessagesReply = {
                data: {
                    lastMessage: "2015-06-29T14:50:58.796Z",
                    messages: [{
                        content: "hello test1"
                    }, {
                        content: "hello test2"
                    }],
                    messageCount: 2
                }
            }
    });

    beforeEach(inject(function($rootScope, $controller, $q) {
        $scope = $rootScope.$new();

        var serviceMock = {
            getRecentMessages : function() {
                var deferred = $q.defer();
                deferred.resolve(recentMessagesReply);
                return deferred.promise;
            },

            postMessage : function(content) {
                recentMessagesReply.data.messageCount++;
                recentMessagesReply.data.messages.push({content:content})
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            }           
        }
        $controller("chatCtrl", {$scope: $scope, dataService: serviceMock});
        $scope.$apply();
    }));  

    it('Has a message count of two', function() {
        expect($scope.messageCount).toEqual(2);
    });

    it('Has a last message date', function() {
        expect($scope.lastMessage).toEqual("2015-06-29T14:50:58.796Z");
    });

    it('Has a message array with size two', function() {
        expect($scope.messages.length).toEqual(2);
    });

    it('The content of the first message is hello test1', function() {
        expect($scope.messages[0].content).toEqual('hello test1');
    });

    it('The content of the first message is hello test2', function() {
        expect($scope.messages[1].content).toEqual('hello test2');
    });

    it('That the post message function updates the recent messages', function() {
        $scope.newMessage = 'hello test3';
        $scope.postMessage();
        $scope.$apply();

        expect($scope.messageCount).toEqual(3);
        expect($scope.messages.length).toEqual(3);
        expect($scope.messages[2].content).toEqual('hello test3');
    });
});

describe('Testing the data service', function() {
    var service, $httpBackend;

    beforeEach(module('chatApp'));

    beforeEach(inject(function(dataService, _$httpBackend_) {
        service = dataService;
        $httpBackend = _$httpBackend_;
    }));

    it('Makes the correct GET request for recent messages', function() {
        $httpBackend.expectGET('http://192.168.59.103:8080/messages/recent').respond({});
        service.getRecentMessages();
        $httpBackend.flush();
    });

    it('Makes the correct POST request for new messages', function() {
        var content = 'hello';
        $httpBackend.expectPOST('http://192.168.59.103:8080/messages/names/' + content).respond({});
        service.postMessage(content);
        $httpBackend.flush();
    });
});