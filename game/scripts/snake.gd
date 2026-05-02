extends Node2D


func setupCurve(start: Vector2, ending:Vector2):
	
	print([start,ending])
	var distance = start.distance_to(ending)
	var steps = 18
	var segment_length = distance/float(steps-1)
	var dir = (ending - start).normalized()
	#$Skeleton2D/Head.transform.origin = ending
	#$Skeleton2D/Head.rotation = dir.angle()
	
	
	for i in range(1,steps+1):
		
		find_child(str(i)).transform.origin = start + (dir * (i * segment_length))
		find_child(str(i)).rotation = dir.angle()
func _ready():
	
	pass
	
	


func _on_timer_timeout():
	setupCurve(Vector2.ZERO, Vector2.ONE* randf_range(200,340))
