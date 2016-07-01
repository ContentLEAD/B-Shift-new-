jQuery(document).ready(function($){

    $('.ih').keyup(function() {
        console.log($(this).val());
        img_height = $(this).val();
        $('#inner-image').css('height',img_height);
    });

    $('.btm').keyup(function() {
        bottom = $(this).val();
        $('.option-b').css('bottom', bottom+'px' );
    });

   $('.tp').change(function() {
        text_position = $(this).val();
        if(text_position=="none") {
            $('.option-a').css({'float': text_position, 'transform': "none" });
        } else {
            $('.option-a').css({'float': text_position, 'transform': "translateY(-50%)" });
        }
        
   });

   $('.ip').change('select',function() {
        image_position = $(this).val();
        console.log(image_position);
        $('.option-b').css({'float': image_position, 'transform': "translateY(-50%)"});
   });

    $('.jscolor').on('blur', function() {


          var color_input = $(this).val();
          $('.show_slide .slide-preview div').css('color','#'+color_input);      

    });

    $(document).on('click', function() {


          var color_input = $('.jscolor-active').val();
          $('.slide-preview div').css('color','#'+color_input);      

    });

    function dynamicText(a) {
        $('.slide-preview div div').html(a);
        var dynamic_height = $('input[name="height"]').val();
        $('.much_hate').css('height',dynamic_height);
    }

    tinyMCE.init({ 
                            mode: "textareas",
                            selector : ".bshift-editor", 
                            browser_spellcheck : true,
                            valid_elements : 'h1,h2,h3,h4,h5,ul,div,br,a[href]',
                            /*plugins : ['wplink fullscreen'],*/
                            menubar : false,
                            setup: function(editor) {
                                editor.on('keyup', function(editor){
                                    var mce = $('#tinymce');
                                    var latest = tinyMCE.activeEditor.getContent({format : 'raw'});
                                    dynamicText(latest);
                                    });
                                editor.on('change', function(editor){
                                    var mce = $('#tinymce');
                                    var latest = tinyMCE.activeEditor.getContent({format : 'raw'});
                                    dynamicText(latest);
                                    });
                            }, 
                            /*toolbar1: 'bold italic strikethrough bullist numlist | ',
                            toolbar2: 'blockquote hr h3 alignleft aligncenter alignright format |', 
                            toolbar3: ' link unlink | more fullscreen toggle'*/
                        }); 
            

    var qid = $('#new_slide').attr('data-pid');
    var data = {
        'action': 'bshift_action',
        'id': qid
        };
    $.post(ajaxurl, data, function(response) {
            console.log(response);
            var reta = JSON.parse(response);
            slides_length = reta.lid;
        });

	$('.slide_input').mousedown(function() {
    	$('.btn_save').show();
    });

    $('textarea').mousedown(function() {
        $('.btn_save').show();
    });

    $(document).on('click','.slide_title',function( event ) {


        var parent = $(this).parent();
        var grand_parent = $(parent).parent();
        //console.log(grand_parent);
        var engaged = $(grand_parent).find('.engaged');
        $(engaged).removeClass('engaged');
        var active_slide = $(parent).find('.ib');
        //console.log(active_slide);
        var obj = $('.ib.show_slide');
        //console.log(obj);
        $(obj).removeClass('show_slide').addClass('collapse');
        $(active_slide).removeClass('collapse').addClass('show_slide');
        $(this).addClass('engaged');

    });

    $(document).on('click','.delete_slide',function( event ) {
        event.preventDefault();
        var garbage = $(this).parent();
        $(garbage).remove();
        $('.btn_save').show();
        console.log($(this).attr('data-ref'));
        if($(this).attr('data-ref')==0) {
            location.reload();
        }
        
    });

    $(document).on('change','input #image_url', function() {
        var pic_url = $(this).val();
        $('.slide-preview div').css("background-color","red");
        console.log($('.slide-preview div').css("background-color"));
    });

    $(document).on('click','.b-current .switch-html', function() {
        $('.mce-tinymce').hide();
        $('.b-current .bshift-editor').show();
    });

    $(document).on('click','#new_slide',function(e) {
        $(this).hide();
        $('#slides ul li').hide();
        var pid = $(this).attr('data-pid');
        var parent = $(this).context;
        //console.log($(parent).attr('id'));
        //console.log(pid);
        var data = {
        'action': 'bshift_action',
        'id': pid
        };
        //console.log(pid);

        //ajaxurl is always defined in the admin header and points to admin-ajax.php
        $.post(ajaxurl, data, function(response) {
            //console.log(JSON.parse(response));
            var ret = JSON.parse(response);
            var width = ret.wid;
            var width_metric = ret.widm;
            var height = ret.hid;
            var effect = ret.eid;
            var delay = ret.did;
            var slides_length = ret.lid;
            var dynamic_box =  ret.cid;
            console.log(dynamic_box);
            //console.log(ret);
            //$('.btn_save').after(dynamic_box);
            var slides = $('#slides').find('.ib');
            //console.log(dynamic_box);
            $('.ib').hide();
            $('.b-current').show();
            //$(".slide_content").val(slides_length);
            var slide_name = 'content['+slides_length+']';
            //console.log(dynamic_box);
            $(".slide_content").attr('name',slide_name);
            //$(".slide_label").after(dynamic_box); 

            //console.log(tinyMCE););
            //$('.wp-core-ui').attr('id',slides_length);
            $(".b-current input[class='slide_width']").val(width);
            $(".b-current input[class='slide_height']").val(height);
            //$(".ib input[class='slide_effect']").val(effect);
            $(".b-current input[class='slide_delay']").val(delay);
            $(".b-current input[class='slide_index']").val(slides_length);
            $(".b-current select[class='slide_effect']").val(effect);
            $(".b-current select[class='slide_width_metric']").val(width_metric);
            //$(".b-current textarea").attr('name','slide_content['+slides_length+']');
            //$('.bshift-editor').attr('id','slide_editor');
            $(".b-current h4[class='slide_content_label']").attr('id',slides_length);
            $('.delete_slide').css('margin-top','0px');
            
            //$(".slide_label").after(dynamic_box); // loading wp_editor function via output buffer in ajax call
            //console.log(tinyMCE);
            
            tinyMCE.init({ 
                            mode: "none",
                            selector : ".bshift-editor",
                            browser_spellcheck : true,
                            menubar : false,
                            setup: function(editor) {
                                editor.on('keyup', function(editor){
                                    var mce = $('#tinymce');
                                    var latest = tinyMCE.activeEditor.getContent({format : 'raw'});
                                    //console.log(latest);
                                    dynamicText(latest);
                                    });
                                editor.on('change', function(editor){
                                    var mce = $('#tinymce');
                                    var latest = tinyMCE.activeEditor.getContent({format : 'raw'});
                                    dynamicText(latest);

                                    });
                            }
                             
                            /*valid_elements : 'h2,h3', 
                            toolbar1: 'bold italic strikethrough bullist numlist | ',
                            toolbar2: 'blockquote hr alignleft aligncenter alignright |', 
                            toolbar3: ' link unlink | more fullscreen toggle' */
                        }); 
            
            
        });
        
        $('.btn_save').show();
        $(document).on('click','.btn_save', function() { console.log($('.b-current textarea').val());});
        /*
        string += '<div class="b-current"><h4>Content</h4>';
        string += '<div id="wp-slide_editor'+ slides_length +'-wrap" class="wp-core-ui wp-editor-wrap html-active">';
        string += '<style>.wp-editor-wrap{width: 175px;}</style>';
        string += '<div id="wp-slide_editor2-editor-tools" class="wp-editor-tools hide-if-no-js"><div class="wp-editor-tabs">';
        string += '<button type="button" id="slide_editor2-tmce" class="wp-switch-editor switch-tmce" data-wp-editor-id="slide_editor2">Visual</button>';
        string += '<button type="button" id="slide_editor2-html" class="wp-switch-editor switch-html" data-wp-editor-id="slide_editor2">Text</button></div></div>';
        string += '<div id="wp-slide_editor'+ slides_length +'-editor-container" class="wp-editor-container"><div id="qt_slide_editor2_toolbar" class="insert_tools quicktags-toolbar">';
        string += '<input id="qt_slide_editor2_strong" class="ed_button button button-small" aria-label="Bold" value="b" type="button"><input id="qt_slide_editor2_em" class="ed_button button button-small" aria-label="Italic" value="i" type="button"><input id="qt_slide_editor2_link" class="ed_button button button-small" aria-label="Insert link" value="link" type="button"><input id="qt_slide_editor2_block" class="ed_button button button-small" aria-label="Blockquote" value="b-quote" type="button"><input id="qt_slide_editor2_del" class="ed_button button button-small" aria-label="Deleted text (strikethrough)" value="del" type="button"><input id="qt_slide_editor2_ins" class="ed_button button button-small" aria-label="Inserted text" value="ins" type="button"><input id="qt_slide_editor2_img" class="ed_button button button-small" aria-label="Insert image" value="img" type="button"><input id="qt_slide_editor2_ul" class="ed_button button button-small" aria-label="Bulleted list" value="ul" type="button"><input id="qt_slide_editor2_ol" class="ed_button button button-small" aria-label="Numbered list" value="ol" type="button"><input id="qt_slide_editor2_li" class="ed_button button button-small" aria-label="List item" value="li" type="button"><input id="qt_slide_editor2_code" class="ed_button button button-small" aria-label="Code" value="code" type="button"><input id="qt_slide_editor2_more" class="ed_button button button-small" aria-label="Insert Read More tag" value="more" type="button"><input id="qt_slide_editor2_close" class="ed_button button button-small" title="Close all open tags" value="close tags" type="button">';
        string += '</div>';
        string += '<textarea aria-hidden="false" class="wp-editor-area bshift-editor" style="height: 75px;" autocomplete="off" cols="40" name="slide_content[]" id="slide_editor2">';
        string += '</textarea></div></div>';*/
        /*
        string += '<div id="mceu_18-body"><div aria-label="Bold" role="button" id="mceu_0" class="mce-widget mce-btn mce-first" tabindex="-1" aria-labelledby="mceu_0">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-bold"></i></button></div>';
        string += '<div aria-label="Italic" role="button" id="mceu_1" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_1">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-italic"></i></button></div>';
        string += '<div aria-label="Underline" role="button" id="mceu_2" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_2">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-underline"></i></button></div>';
        string += '<div aria-label="Blockquote" role="button" id="mceu_3" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_3"><button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-blockquote"></i></button></div>';
        string += '<div aria-label="Strikethrough" role="button" id="mceu_4" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_4">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-strikethrough"></i></button></div>';
        string += '<div aria-label="Bullet list" role="button" id="mceu_5" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_5"><button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-bullist"></i></button></div>';
        string += '<div aria-label="Numbered list" role="button" id="mceu_6" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_6"><button role="presentation" type="button" tabindex="-1">';
        string += '<i class="mce-ico mce-i-numlist"></i></button></div><div aria-label="Align left" role="button" id="mceu_7" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_7">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-alignleft"></i></button></div>';
        string += '<div aria-label="Align center" role="button" id="mceu_8" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_8">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-aligncenter"></i></button></div>';
        string += '<div aria-label="Align right" role="button" id="mceu_9" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_9"><button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-alignright"></i></button></div>';
        string += '<div aria-disabled="true" aria-label="Undo" role="button" id="mceu_10" class="mce-widget mce-btn mce-disabled" tabindex="-1" aria-labelledby="mceu_10">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-undo"></i></button></div>';
        string += '<div aria-disabled="true" aria-label="Redo" role="button" id="mceu_11" class="mce-widget mce-btn mce-disabled" tabindex="-1" aria-labelledby="mceu_11">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-redo"></i></button></div>';
        string += '<div aria-label="Insert/edit link" role="button" id="mceu_12" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_12"><button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-link"></i></button></div>';
        string += '<div aria-label="Remove link" role="button" id="mceu_13" class="mce-widget mce-btn" tabindex="-1" aria-labelledby="mceu_13"><button role="presentation" type="button" tabindex="-1">';
        string += '<i class="mce-ico mce-i-unlink"></i></button></div><div aria-pressed="false" aria-label="Fullscreen" role="button" id="mceu_14" class="mce-widget mce-btn mce-last" tabindex="-1" aria-labelledby="mceu_14">';
        string += '<button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-fullscreen"></i></button></div></div></div></div></div></div></div>';
        string += '<div style="border-width: 1px 0px 0px;" id="mceu_19" class="mce-edit-area mce-container mce-panel mce-stack-layout-item" hidefocus="1" tabindex="-1" role="group">';
        string += '<iframe src="javascript:&quot;&quot;" style="width: 100%; height: 100px; display: block;" title="Rich Text Area. Press Alt-Shift-H for help" allowtransparency="true" id="0_ifr" frameborder="0"></iframe>';
        string += '</div><div style="border-width: 1px 0px 0px;" id="mceu_20" class="mce-statusbar mce-container mce-panel mce-stack-layout-item mce-last" hidefocus="1" tabindex="-1" role="group"><div id="mceu_20-body" class="mce-container-body mce-flow-layout">';
        string += '<div id="mceu_21" class="mce-path mce-flow-layout-item mce-first"><div role="button" class="mce-path-item mce-last" data-index="0" tabindex="-1" id="mceu_21-0" aria-level="0">p</div></div>';
        string += '<div id="mceu_22" class="mce-flow-layout-item mce-last mce-resizehandle"><i class="mce-ico mce-i-resize"></i></div></div></div></div></div>';
        string += '</div></div>';*/
        var inp = document.createElement('INPUT');
        var picker = new jscolor(inp);
        picker.fromHSV();
        $('.btn_save').before('<div class="b-current"><h4 class="slide_label">Content</h4><textarea hidden="false" class="bshift-editor wp-editor-area" style="height: 182px;" autocomplete="off" cols="40" name="slide_content[]"></textarea><input class="slide_input image_url" name="image_upload[]" type="text"></input><h4 style="display:inline">Image Height</h4><input type="text" name="image_height[]" class="slide_input ih" ></input></br><h4 style="display:inline">Image Position</h4><select name="image_position[]" class=""><option value="relative" >Relative</option><option value="absolute" >Absolute</option></select></br><input class="upload_image_button" value="Add Image" data-target="slide-button-preview" type="button"></input><h4 id="color_label">Content Color</h4><h4>Width</h4><input type="text" name="width[]" class="slide_width" value="" ></input><br><select name="width_metric[]" class="slide_width_metric"><option value="px" class="slide_width_metric_px" selected="">Pixels</option><option value="%" class="slide_width_metric_pc" selected="">Percent</option></select></br><!--<h4>Height</h4><input type="text" name="height[]" class="slide_height" value="" ></input>--><h4>Delay</h4><input type="text" name="delay[]" value="" class="slide_delay" ></input><h4>Effect</h4><select name="effect[]" class="slide_effect"><option value="fader">Fade</option><option value="slide_vertical">Slide Vertical</option><option value="slide_left">Slide Left</option><option value="slide_right">Slide Right</option><option value="toggle">Standard Toggle</option></select><h4>Index</h4><input type="text" name="index[]" class="slide_index"></input><input id="image_url" class="slide_input image_url" name="slide_upload[]" value="" type="text"></input><input class="upload_image_button" value="Add Image" data-target="brafton-end-button-preview" type="button"></input><img src="../wp-content/plugins/B-Shift//img/delete-512.png" data-ref="0" class="delete_slide" title="Delete this slide."/><!--<img src="../wp-content/plugins/B-Shift//img/prev.png" class="b-preview" title="Preview this slide."/>--><div class="slide-preview"><div class="much_hate"><div></div></div></div><input type="hidden" name="counter[]"></input></div>');
        document.getElementById('color_label').appendChild(inp);

        b = document.getElementById("color_label");
        c = b.children[0];
        //console.log(c);
        c.setAttribute("name", "color[]");
        c.style.width = "110px";
        c.style.marginLeft = "10px";
    });

    
    
});