extends Node2D



func _ready():
	var window_js =JavaScriptBridge.get_interface("window")
	window_js.userJoined = JavaScriptBridge.create_callback(user_joining_game)
	window_js.gameUpdated = JavaScriptBridge.create_callback(game_updated)
	

func user_joining_game(args):
	pass
	

func game_updated(args):
	pass
