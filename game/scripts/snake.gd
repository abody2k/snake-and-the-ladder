extends Node2D


func setupCurve(start: Vector3, ending:Vector3):
	
	var distance = ending.distance_to(start)
	var steps = distance/float($Skeleton2D/Head.get_child_count(true)-1)
	
