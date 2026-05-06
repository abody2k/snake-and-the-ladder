extends Node2D

var window_js : JavaScriptObject
var user_joining_game_ref = JavaScriptBridge.create_callback(user_joining_game)
var game_updated_ref = JavaScriptBridge.create_callback(game_updated)
var init_game_ref = JavaScriptBridge.create_callback(init_data)
var my_turn = false
var my_ID = "x"
var room_id = "x"
var playing_against_AI = true

var names = {}
var wins ={}


const PIECE = preload("res://scenes/piece.tscn")
const ROW = preload("res://scenes/row.tscn")
var my_piece

func init_data(args):
	print("INITALIZED ALL DATA with this : ")
	var real_data = JSON.parse_string(args[0])
	print(real_data)
	my_ID = real_data.userID
	room_id = real_data.roomID
	my_turn = real_data.myTurn
	my_piece = PIECE.instantiate()
	add_child(my_piece)
	my_piece.set_pos(real_data.pos)
	my_piece.id = my_ID
	playing_against_AI = false
	if my_ID == room_id:
		my_turn = true
		
	
	user_joining_game(args)
	
	
	
	
	
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
	print(args)
	var data = JSON.parse_string(args[0])
	piece_manager = get_tree().get_first_node_in_group("piece_manager")
	get_tree().call_group("pieces","queue_free")
	print(data)
	
	#saving names
	names={}
	wins={}
	print(data.names)
	for i in data.names:
		print("printing names")
		print(i)
		names.set(str(i[0]),i[1])
	for i in data.wins:
		wins.set(str(i[0]),i[1])		
				
	set_labels()
	for i in range(data.wins.size()):
		print(i)
		print(data.playerPos[i])
		var piece = PIECE.instantiate()
		piece_manager.add_child(piece)
		piece.set_pos((data.playerPos[i][1]))
		if data.playerPos[i][0] == my_ID:
			my_piece = piece
	if data.playerTurn == my_ID:
		my_turn = true
	
	
	
	

	

func game_updated(args):
	print("GAME UPDATED : ")
	print(JSON.parse_string(args[0]))
	var data = JSON.parse_string(args[0])
	
	$dice.stop()
	$dice.frame = int(data.dice) -1
	my_turn = my_ID == data.roomData.playerTurn
	
	user_joining_game([JSON.stringify(data.roomData)])
	
func play():
	$dice.play("moving")
	window_js.play(room_id)


func set_labels():
	get_tree().call_group("rows","queue_free")
	
	for key in names.keys():
		var row = ROW.instantiate()
		$CanvasLayer/Panel/vert.add_child(row)
		
		row.update_row(names[(key)],wins[(key)])
		
	pass

func _on_dice_clicked(viewport, event, shape_idx):
	if not my_turn:
		return
	
	if event is InputEventMouseButton:
		print(event)
		if (event as InputEventMouseButton).button_index == 1:
			play()
