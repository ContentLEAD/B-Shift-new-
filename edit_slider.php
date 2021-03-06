<?php
	
	if(isset($_POST['add_new_slider'])) {

		$post_id = get_the_id(); 
	} else {
		$post_id = isset($_GET['slider_id'])? $_GET['slider_id'] : $_POST['slider_id'];
	}

	
	if(isset($_POST['update'])) {
	
	  	if($_POST) { 
	  			$post_id = $_POST['slider_id']; 
	  	}

	  	update_post_meta($post_id,'Slider_Name',$_POST['title']);
	  	update_post_meta($post_id,'Slider_Delay',$_POST['delay']);
	  	update_post_meta($post_id,'Slider_State',$_POST['state']);
	  	update_post_meta($post_id,'Slider_Height',$_POST['height']);
	  	update_post_meta($post_id,'Slider_Width',$_POST['width']);
	  	update_post_meta($post_id,'Slider_Effect',$_POST['effect']);
	  	update_post_meta($post_id,'Slider_Bgcolor',$_POST['bgcolor']);
	  	update_post_meta($post_id,'Slider_Width_Metric',$_POST['width_metric']);
	  	update_post_meta($post_id,'Slider_Height_Metric',$_POST['height_metric']);
	
	}


	if(isset($_POST['save_slides'])) {
		echo '</br>';
		
		$len = (sizeof($_POST['counter']))? sizeof($_POST['counter']) : sizeof($_POST['content']);
		$temp_array = array(array());
		for($i=0;$i<$len;$i++) {
			$index = ($_POST['index'][$i]=="")? $i : trim($_POST['index'][$i]);
			if($index!=$i) {
					$temp_array['slide_content'][$index] = $_POST['slide_content'][$i];
					$temp_array['image_upload'][$index] = ($_POST['image_upload'][$i])? $_POST['image_upload'][$i] : '';
					$temp_array['image_height'][$index] = ($_POST['image_height'][$i])? $_POST['image_height'][$i] : '';
					$temp_array['image_position'][$index] = ($_POST['image_position'][$i])? $_POST['image_position'][$i] : '';
					$temp_array['text_position'][$index] = ($_POST['text_position'][$i])? $_POST['text_position'][$i] : '';
					$temp_array['position_bottom'][$index] = ($_POST['position_bottom'][$i])? $_POST['position_bottom'][$i] : 0;
					$temp_array['color'][$index] = $_POST['color'][$i];
					$temp_array['effect'][$index] = $_POST['effect'][$i];
					//$temp_array['height'][$index] = $_POST['height'][$i];
					$temp_array['width'][$index] = $_POST['width'][$i];
					$temp_array['width_metric'][$index] = $_POST['width_metric'][$i];
					$temp_array['delay'][$index] = $_POST['delay'][$i];
					$temp_array['slide_upload'][$index] = ($_POST['slide_upload'][$i])? $_POST['slide_upload'][$i] : '';
					$temp_array['index'][$index] = $index;
			} else{
					$temp_array['slide_content'][$i] = $_POST['slide_content'][$i];
					$temp_array['image_upload'][$i] = ($_POST['image_upload'][$i])? $_POST['image_upload'][$i] : '';
					$temp_array['image_height'][$i] = ($_POST['image_height'][$i])? $_POST['image_height'][$i] : '';
					$temp_array['image_position'][$i] = ($_POST['image_position'][$i])? $_POST['image_position'][$i] : '';
					$temp_array['text_position'][$i] = ($_POST['text_position'][$i])? $_POST['text_position'][$i] : '';
					$temp_array['position_bottom'][$i] = ($_POST['position_bottom'][$i])? $_POST['position_bottom'][$i] : 0;
					$temp_array['color'][$i] = $_POST['color'][$i];
					$temp_array['effect'][$i] = $_POST['effect'][$i];
					//$temp_array['height'][$i] = $_POST['height'][$i];
					$temp_array['width'][$i] = $_POST['width'][$i];
					$temp_array['width_metric'][$i] = $_POST['width_metric'][$i];
					$temp_array['delay'][$i] = $_POST['delay'][$i];
					$temp_array['slide_upload'][$i] = ($_POST['slide_upload'][$i])? $_POST['slide_upload'][$i] : '';
					$temp_array['index'][$i] = $index;
				}
		}
		if(is_array($temp_array)) {
			$temp_array_len = count($temp_array['slide_content']);
		
			if(get_post_meta($post_id,'Slides_Array')) {
				
				$prev_count = get_post_meta($post_id,'Slides_Array_Count',true);
				$new_index = ($prev_count + $temp_array_len)-1;
				$prev_array = get_post_meta($post_id,'Slides_Array',true);
				update_post_meta($post_id,'Slides_Array',$temp_array,$prev_array);
				update_post_meta($post_id,'Slides_Array_Count',$temp_array_len);
				
				}else {
					add_post_meta($post_id,'Slides_Array',$temp_array);
					add_post_meta($post_id,'Slides_Array_Count',$temp_array_len);
				}
		}
	}


 ?>

	<div class="container">
		<form action=" " class="row gen-settings-form" method="post">
			<div class="col-md-4">
				<h4>TITLE</h4>
				<input type="text" name="title" value="<?php echo get_post_meta($post_id,'Slider_Name',true); ?>"></input></br>
				<h4>HEIGHT</h4>
				<input type="text" name="height" value="<?php echo get_post_meta($post_id,'Slider_Height',true); ?>"></input>
				<select name="height_metric" class="metric">
					<?php
				    $selected_metric = get_post_meta($post_id,'Slider_Height_Metric',true);
					?>
					<option value="px" <?php if($selected_metric == 'px'){echo("selected");}?>>Pixels</option>
					<option value="%" <?php if($selected_metric == '%'){echo("selected");}?>>Percent</option>
				</select></br>
				<h4>Background Color</h4><input type="text" class="jscolor" name="bgcolor" value="<?php echo get_post_meta($post_id,'Slider_Bgcolor',true); ?>"></br>
				<input type="hidden" name="update"></input>
				<input type="hidden" name="slider_id" value="<?php echo $post_id; ?>">
			</div>
			<div class="col-md-4">
				<h4>DELAY</h4>
				<input type="text" name="delay" value="<?php echo get_post_meta($post_id,'Slider_Delay',true); ?>"></input></br>
				<h4>WIDTH</h4>
				<input type="text" name="width" value="<?php echo get_post_meta($post_id,'Slider_Width',true); ?>"></input>
				<?php
				    $selected_metric = get_post_meta($post_id,'Slider_Width_Metric',true);
				?>
				<select name="width_metric" class="<?php echo $selected_metric; ?> metric">
					<option value="px" <?php if($selected_metric == 'px'){echo("selected");}?>>Pixels</option>
					<option value="%" <?php if($selected_metric == '%'){echo("selected");}?>>Percent</option>
				</select></br>
				<input type="submit" value="update slider" class="update_slider"></input>
			</div>
			<div class="col-md-4">
				<h4>STATE</h4>
				<?php $selected_state = get_post_meta($post_id,'Slider_State',true); ?>
				<select name="state">
					<option value="draft" <?php if($selected_state == 'draft'){echo("selected");}?>>Draft</option>
					<option value="published" <?php if($selected_state == 'published'){echo("selected");}?>>Published</option>
					<option value="pending" <?php if($selected_state == 'pending'){echo("selected");}?>>Pending</option>
				</select></br>
				<h4>EFFECT</h4>
				<?php $selected_effect = get_post_meta($post_id,'Slider_Effect',true); ?>
				<select name="effect" >
					<option value="fader" <?php if($selected_effect == 'fade'){echo("selected");}?>>Fade</option>
					<option value="slide_vertical" <?php if($selected_effect == 'slide_vertical'){echo("selected");}?>>Slide Vertical</option>
					<option value="slide_left" <?php if($selected_effect == 'slide_left'){echo("selected");}?>>Slide Left</option>
					<option value="slide_right" <?php if($selected_effect == 'slide_right'){echo("selected");}?>>Slide Right</option>
					<option value="toggle" <?php if($selected_effect == 'toggle'){echo("selected");}?>>Standard Toggle</option>
					<option value="rotate" <?php if($selected_effect == 'rotate'){echo("selected");}?>>Invert</option>
				</select>
			</div>
			
		</form>

	</div>
	
		<h3 class="add_slide_btn" id="new_slide" data-pid="<?php echo $post_id; ?>">Add Slide</h3>
		<form action="admin.php?page=edit_slider&slider_id=<?php echo $post_id; ?>" method="post" id="slides" class="container <?php echo $post_id; ?>">
			<input type="hidden" name="pid" value="<?php echo $post_id; ?>"></input>
			<ul>
			<?php if(get_post_meta($post_id,'Slides_Array',true)) : ?>
				
				<?php 	$new_array = array(array());
						
						$count = get_post_meta($post_id,'Slides_Array_Count',true);
						$new_array = get_post_meta($post_id,'Slides_Array',true);
						
						?>
						<?php for($i=0;$i<$count;$i++) { ?>
							
								<li style="display: inline-block; vertical-align: top;"><h2 class="<?php if($i==0) { echo 'slide_title engaged'; } else { echo 'slide_title';} ?>">Slide <?php echo $i+1; ?></h2>
								<div class="<?php if($i==0) { echo 'ib show_slide'; } else { echo 'ib collapse';} ?>">
									<h4>Content</h4>
										<!--Slide editor is loaded here -->
										<?php
										$editor_id = 'slide_editor'.$i;
										$settings = array( 'media_buttons' => false, 'textarea_name'=> 'slide_content[]','editor_height'=>'75px','editor_class'=>'bshift-editor','editor_css'=>'<style>.wp-editor-wrap{width: 255px;}</style>');
										$content = ($new_array['slide_content'][$i])? $new_array['slide_content'][$i] : ' ';
										//$box = wp_editor( $content, $editor_id, $settings);
										
										?>
										<textarea class="slide_input bshift-editor" name="slide_content[]"><?php echo $content; ?></textarea>
									
									<h4 style="display:inline">Image Height</h4>
									<input type="text" name="image_height[]" class="slide_input ih" value="<?php echo $new_array['image_height'][$i]; ?>"></input></br>
									<h4 style="display:inline">Image Position</h4>
									<?php $selected_position = ($new_array['image_position'][$i])? $new_array['image_position'][$i] : 'none'; ?>
										<select name="image_position[]" class="ip">
											<option value="left" <?php if($selected_position == 'left'){echo("selected");}?>>Left</option>
											<option value="right" <?php if($selected_position == 'right'){echo("selected");}?>>Right</option>
										</select></br>
									<h4 style="display:inline">Text Position</h4>
									<?php $selected_position = ($new_array['text_position'][$i])? $new_array['text_position'][$i] : 'none'; ?>
										<select name="text_position[]" class="tp">
											<option value="left" <?php if($selected_position == 'left'){echo("selected");}?>>Left</option>
											<option value="right" <?php if($selected_position == 'right'){echo("selected");}?>>Right</option>
											<option value="none" <?php if($selected_position == 'none'){echo("selected");}?>>Center</option>
										</select></br>
									<h4 style="display:inline">Image Bottom Adjustment</h4>
									<input type="text" name="position_bottom[]" class="slide_input btm" value="<?php echo ($new_array['position_bottom'][$i])? $new_array['position_bottom'][$i] : 0;  ?>"></input></br>
									<input class="slide_input image_url" id="inner-image-url" name="image_upload[]" value="<?php echo $new_array['image_upload'][$i]; ?>" type="text"></input>
									<input class="upload_image_button" value="Add Image" data-target="slide-button-preview" type="button"></input>
									<h4>Content Color</h4><input type="text" class="jscolor slide_input" name="color[]" value=<?php echo $new_array['color'][$i];?>></br>
									<h4>Width</h4>
										<input type="text" class="slide_input" name="width[]" value="<?php echo $new_array['width'][$i];?>"></input>
										<?php $selected_metric = ($new_array['width_metric'][$i])? $new_array['width_metric'][$i] : get_post_meta($post_id,'Slider_Width_Metric',true); ?>
										<select name="width_metric[]" class="<?php echo $selected_metric; ?> metric">
											<option value="px" <?php if($selected_metric == 'px'){echo("selected");}?>>Pixels</option>
											<option value="%" <?php if($selected_metric == '%'){echo("selected");}?>>Percent</option>
										</select></br>
									<!--<h4>Height</h4>
										<input type="text" class="slide_input" name="height[]" value="<?php echo $new_array['height'][$i]; ?>"></input>
										<?php $selected_metric = ($new_array['height_metric'][$i])? $new_array['height_metric'][$i] : get_post_meta($post_id,'Slider_Height_Metric',true); ?>
										<select name="height_metric[]" class="<?php echo $selected_metric; ?> metric">
											<option value="px" <?php if($selected_metric == 'px'){echo("selected");}?>>Pixels</option>
											<option value="%" <?php if($selected_metric == '%'){echo("selected");}?>>Percent</option>
										</select></br>-->
									<h4>Delay</h4>
										<input type="text" class="slide_input" name="delay[]" value="<?php echo $new_array['delay'][$i]; ?>"></input>
									<h4>Effect</h4>
										<?php $selected_effect = $new_array['effect'][$i]; ?>
									<select name="effect[]" class="slide_input">
										<option value="fader" <?php if($selected_effect == 'fader'){echo("selected");}?>>Fade</option>
										<option value="slide_vertical" <?php if($selected_effect == 'slide_vertical'){echo("selected");}?>>Slide Vertical</option>
										<option value="slide_left" <?php if($selected_effect == 'slide_left'){echo("selected");}?>>Slide Left</option>
										<option value="slide_right" <?php if($selected_effect == 'slide_right'){echo("selected");}?>>Slide Right</option>
										<option value="toggle" <?php if($selected_effect == 'toggle'){echo("selected");}?>>Standard Toggle</option>
										<option value="rotate" <?php if($selected_effect == 'rotate'){echo("selected");}?>>Invert</option>
									</select>
									<h4>Index</h4>
										<input type="text" class="slide_input" name="index[]" value="<?php echo $i; ?>"></input>
										<input class="slide_input image_url" name="slide_upload[]" value="<?php echo $new_array['slide_upload'][$i]; ?>" type="text"></input>
										<input class="upload_image_button" value="Add Background" data-target="slide-button-preview" type="button"></input>
										<img src="<?php echo plugin_dir_url(__FILE__); ?>/img/delete-512.png" class="delete_slide" title="Delete this slide."/>
										<!--<img src="<?php echo plugin_dir_url(__FILE__); ?>/img/prev.png" class="b-preview" title="Preview this slide." />-->
										<div class="slide-preview" >
											<div style="color: #<?php echo $new_array['color'][$i]; ?>; background-image: url('<?php echo $new_array['slide_upload'][$i]; ?>'); background-position: 0; background-size:cover; width: <?php echo $new_array['width'][$i]; ?><?php echo $new_array['width_metric'][$i]; ?>; height: <?php echo get_post_meta($post_id,'Slider_Height',true); ?><?php echo get_post_meta($post_id,'Slider_Height_Metric',true); ?>;">
												<span class="slide-nav-left" data-direction="left"></span>
                    							<span class="slide-nav-right" data-direction="right"></span>
												<div style="position: relative; top: 50%; transform: translateY(-50%);">
													<div class="option-a" style="float: <?php echo $new_array['text_position'][$i]; ?>">
													<?php 
														echo html_entity_decode($new_array['slide_content'][$i]); 
															 
														?>
													</div>
													<div class="option-b" style="float: <?php echo $new_array['image_position'][$i]; ?>; bottom: <?php $new_array['position_bottom'][$i]; ?>">
														<img src="<?php	echo $new_array['image_upload'][$i]; ?>" id="inner-image" height="<?php	echo $new_array['image_height'][$i]; ?>" width="auto" style="position: <?php echo $selected_position; ?>; "/>
													</div>	
												</div>
											</div>
										</div>
										<!--<input type="submit" name="delete[]" value="delete slide" data-ref="<?php echo $i; ?>" class="delete_slide"></input>-->
										<input type="hidden" name="counter[]"></input>
										
								</div> <!--end .ib -->
							</li>
						<?php } ?>
			<?php endif; ?>
			<input type="hidden" name="save_slides" data-slide-staus="" />
			<input type="submit" value="save/edit" class="btn_save"/>
		</form>
		
		



	


