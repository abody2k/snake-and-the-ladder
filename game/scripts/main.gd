extends Node2D

var window_js : JavaScriptObject
var user_joining_game_ref = JavaScriptBridge.create_callback(user_joining_game)
var game_updated_ref = JavaScriptBridge.create_callback(game_updated)

func _ready():

	if OS.get_name() == "Web":
		print("THIS IS THE RIGHT OS ...")
		
		window_js =JavaScriptBridge.get_interface("window")
		window_js.userJoined = user_joining_game_ref
		window_js.gameUpdated = game_updated_ref


func _process(delta):
	
	if Input.is_action_just_pressed("playing"):
		play()
		


func user_joining_game(args):
	print("USER JOINED : ")
	print(args)
	pass
	

func game_updated(args):
	print("GAME UPDATED : ")
	print(args)
	pass
	
func play():
	print("PLAYYYINGGGGG brrrrrr")
	window_js.play()


func _on_dice_clicked(viewport, event, shape_idx):
	print(event)
	if event is InputEventMouseButton:
		print(event)
		if (event as InputEventMouseButton).button_index == 1:
			print("haaaaaaaa")
			$dice.play("moving")
