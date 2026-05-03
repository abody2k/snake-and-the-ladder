extends AnimatedSprite2D


func _input(event):
	if event is InputEventMouseButton:
		
		print(event as InputEventMouseButton)
