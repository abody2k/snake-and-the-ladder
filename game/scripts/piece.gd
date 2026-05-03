extends Sprite2D



var current_pos : int = 2
var target = 1
var path : Path2D
var tween : Tween
var moving = false

func _ready():
	scale.x=0.121
	scale.y=0.11
	path = get_tree().get_first_node_in_group("path")
	modulate = Color.from_ok_hsl(randf(),1,1,1)
	
func move_from_to(source : int,destination: int):
	tween = create_tween()
	var path_follow = PathFollow2D.new()
	transform.origin = Vector2.ZERO
	
	path.add_child(path_follow)
	path_follow.progress_ratio = float(current_pos) / 100.0
	reparent(path_follow)
	tween.finished.connect(move_again.bind(path_follow))
	tween.tween_property(path_follow,"progress_ratio",float(destination)/100.0,2).finished.connect(move_again)

	
	
func move_again(path_follow):
	reparent(get_parent().get_parent())
	path_follow.queue_free()
	


func _on_timer_timeout():
	
	if moving:
		return
		
	target = randi_range(1,101)
	moving = true
	
	print("NEW TARGET : " + str(target))

var timer = 0.0

func pick_next_pos(next_target):
	target = next_target
	moving = true
	timer = 0.0
	
	
func _process(delta):
	
	if moving:
		timer += delta * 4
		if current_pos != (target-1):
			if current_pos < (target-1):
				transform.origin = lerp(transform.origin,path.curve.get_point_position(current_pos+1),timer)
				if timer >= 1.0:
					current_pos+=1
					timer = 0.0
			else:
				transform.origin = lerp(transform.origin,path.curve.get_point_position(current_pos-1),timer)
				if timer >= 1.0:
					current_pos-=1
					timer = 0.0
			
		else:
			moving = false
			timer = 0.0
			
	
	
func set_pos(pos: int):
	transform.origin = path.curve.get_point_position(pos-1)
	
