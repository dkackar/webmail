
webmailApp.factory('messageService', ['Restangular', function(Restangular){

    var obj = {};
    var _messages = {};
    var _currentMessage;
    var messageObj = {};

    obj.buildIndex = function(){
      if( Object.keys(_messages).length === 0 ){
        Restangular.all("messages").getList().then(function(data){
          data.forEach( function(datum) {
            messageObj = {
              id: datum.id,
              from: datum.from,
              to: datum.to,
              subject: datum.subject,
              body: datum.body,
              received_date: datum.received_date,
              read: datum.read
            }
            _messages[datum.id] = messageObj;
          });
        _currentMessage = _messages[1];
        });
      }
    };

    obj.getMessages = function(){
        return _messages;
    };

    obj.getCurrentMessage = function(){
        return _currentMessage;
    };

    obj.show = function( id ) {
      return Restangular.one( "messages", id).get();
    };

    obj.update = function( messageObj ){
      messageObj.put();
    };

    obj.create = function ( messageObj ) {
      return Restangular.all( "messages").post( messageObj );
    };

    obj.destroy = function ( id ) {
      Restangular.one("messages", id).remove();
    };

    return obj;
}]);