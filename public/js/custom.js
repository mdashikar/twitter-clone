 $(function () {
     var socket = io();

     $('#sendTweet').submit( function(){
         var content = $('#tweet').val();
         socket.emit('tweet', {content:content});

         $('#tweet').val('');
         return false;
     });

     socket.on('incommingTweet',function(data){
        console.log(data);
        var html = '';
        html += ' <div class="row tweets" ><div class="col-md-4"><a href="#"><img src="'+ data.user.photo +'"></a></div><div class="col-md-8"><h4>'+ data.user.name +'</h4><p>'+ data.data.content +'</p></div></div>' ;

        $('#tweets').prepend(html);
     });


 })