jQuery(document).ready(function($) {
           
           $('.b-shift-content').css('text-align', 'center');
           
           var arrow = $('.left-bframe').attr('data-pid');
           
           //console.log(button_array[0]);
           
           var data = {
	        'action': 'bshift_action_two',
	        'id': arrow
	        };
    		$.post(ajaxurl, data, function(response) {
	            console.log(response);
	            //var reta = JSON.parse(response);
              
              //var array = response.split(',');
	            var j_array = JSON.parse(response);
              console.log(j_array['colors'][0]);
              var ind = $('.slick-current').attr('data-index');
              var color = '#'+response[ind];
              $('.slick-arrow').css('color','#'+j_array['colors'][ind]);
              //console.log(ind);
        	});
        var qid = $('.left-bframe').attr('data-pid');
           
           //console.log(button_array[0]);
           
           var data = {
          'action': 'bshift_action',
          'id': qid
          };
        $.post(ajaxurl, data, function(response) {
            $()
            //console.log(JSON.parse(response));
            var reta = JSON.parse(response);
            speed = reta.did;
            $('.left-bframe').slick({
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          autoplay: false,
                          arrows: true,
                          rtl: false,
                          autoplaySpeed: speed                                
           });
        });
        
        $(document).on('change','.slick-current', function() {
            

            var arrow = $('.left-bframe').attr('data-pid');
           
           //console.log(button_array[0]);
           
            var data = {
            'action': 'bshift_action_two',
            'id': arrow
            };
            $.post(ajaxurl, data, function(response) {
                  console.log(response);
                  //var reta = JSON.parse(response);
                  
                  //var array = response.split(',');
                  var j_array = JSON.parse(response);
                  console.log(j_array['colors'][0]);
                  var ind = $('.slick-current').attr('data-index');
                  var color = '#'+response[ind];
                  $('.slick-arrow').css('color','#'+j_array['colors'][ind]);
                  //console.log(ind);
              });
        });
        //var button_array = document.getElementsByClassName('slick-arrow');

           //$('.b-shift-content').css('color', 'orange');
});
