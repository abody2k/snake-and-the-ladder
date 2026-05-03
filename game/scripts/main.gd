extends Node2D

var window_js : JavaScriptObject
var user_joining_game_ref = JavaScriptBridge.create_callback(user_joining_game)
var game_updated_ref = JavaScriptBridge.create_callback(game_updated)
var init_game_ref = JavaScriptBridge.create_callback(init_data)
var my_turn = false
var my_ID = ""


const PIECE = preload("res://scenes/piece.tscn")

var my_piece

func init_data(args):
	print("INITALIZED ALL DATA")
	var real_data = JSON.parse_string(args[0])
	my_ID = real_data.userID
	my_turn = real_data.myTurn
	my_piece = PIECE.instantiate()
	add_child(my_piece)
	my_piece.set_pos(1)
	
	
	
	
	
func _ready():

	if OS.get_name() == "Web":
		print("THIS IS THE RIGHT OS ...")
		
		window_js =JavaScriptBridge.get_interface("window")
		window_js.userJoined = user_joining_game_ref
		window_js.gameUpdated = game_updated_ref
		window_js.init = init_game_ref


func _process(delta):
	
	if Input.is_action_just_pressed("playing"):
		play()
		

var piece_manager 


func user_joining_game(args):
	print("USER JOINED : ")
	var data = JSON.parse_string(args[0])
	piece_manager = get_tree().get_first_node_in_group("piece_manager")
	piece_manager.get_children().all(func (piece): piece.queue_free())
	
	for i in range(data.wins.size()):
		var piece = PIECE.instantiate()
		piece_manager.add_child(piece)
		piece.set_pos(int(data.playerPos[i][1]))
		if data.playerPos[i][0] == my_ID:
			my_piece = piece
	if data.playerTurn == my_ID:
		my_turn = true
	
	
	

	

func game_updated(args):
	print("GAME UPDATED : ")
	print(JSON.parse_string(args[0]))
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
