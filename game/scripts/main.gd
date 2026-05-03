extends Node2D

var window_js : JavaScriptObject
var user_joining_game_ref = JavaScriptBridge.create_callback(user_joining_game)
var game_updated_ref = JavaScriptBridge.create_callback(game_updated)
var readyy_ref = JavaScriptBridge.create_callback(_readyy)

func _ready():

	if OS.get_name() == "Web":
		print("THIS IS THE RIGHT OS ...")
		
		window_js =JavaScriptBridge.get_interface("window")
		window_js.userJoined = user_joining_game_ref
		window_js.gameUpdated = game_updated_ref
		window_js.godotReady = readyy_ref
		_readyy()
		


func user_joining_game(args):
	print("USER JOINED : ")
	print(args)
	pass
	

func game_updated(args):
	print("GAME UPDATED : ")
	print(args)
	pass
	
func play():
	window_js.play()

func _readyy():
	JavaScriptBridge.eval("window.init()")
