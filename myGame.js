/*거실*/
living_room = game.createRoom("living_room", "거실.png") // 거실 생성

// TV 배치.
living_room.TV = living_room.createObject("TV", "TV2.png") 
living_room.locateObject(living_room.TV, 600, 200)

game.start(living_room)
printMessage("여긴 어디지...? 왠지 낯익다...")
