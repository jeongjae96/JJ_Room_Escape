/*거실*/
living_room = game.createRoom("living_room", "거실.png") // 거실 생성

living_room.TV = living_room.createObject("TV", "TV.png") // TV 배치.
living_room.locateObject(living_room.TV, 600, 200)

// 현관문 배치.
living_room.entrance_door = living_room.createObject("entrance_door", "문1-닫힘.png")
living_room.entrance_door.setWidth(200)
living_room.locateObject(living_room.entrance_door, 200, 367)

living_room.entrance_door.onClick = function()
{
  if (living_room.entrance_door.isClosed())
  {
    living_room.entrance_door.open()
  }
  else if (living_room.entrance_door.isOpened())
  {
    living_room.entrance_door.close()
  }
  else
  {

  }
}

living_room.entrance_door.onOpen = function()
{
  living_room.entrance_door.setSprite("문1-열림.png")
}

living_room.entrance_door.onClose = function()
{
  living_room.entrance_door.setSprite("문1-닫힘.png")
}

// 문2 배치.
living_room.room_door = living_room.createObject("room_door", "문2-닫힘.png")
living_room.room_door.setWidth(150)
living_room.locateObject(living_room.room_door, 900, 255)

living_room.room_door.onClick = function()
{
  if (living_room.room_door.isClosed())
  {
    living_room.room_door.open()
  }
  else if (living_room.room_door.isOpened())
  {
    living_room.room_door.close()
  }
  else
  {

  }
}

living_room.room_door.onOpen = function()
{
  living_room.room_door.setSprite("문2-열림.png")
}

living_room.room_door.onClose = function()
{
  living_room.room_door.setSprite("문2-닫힘.png")
}

game.start(living_room)
