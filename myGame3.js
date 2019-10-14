living_room = game.createRoom("living_room", "거실.png") // 거실 생성
corridor = game.createRoom("corridor", "복도1.png") // 복도생성
kids_room = game.createRoom("kids_room", "아이의방.png") // 아이 방 생성.
bed_drawer = game.createRoom("bed_drawer", "침대 서랍.png") // 아이 방 침대 서랍 생성.
desk_drawer = game.createRoom("desk_drawer", "책상 서랍.png") // 아이 방 책상 서랍 안 구현.
main_room = game.createRoom("main_room", "안방.png") // 안방 생성

/*거실*/
// TV 배치.
living_room.TV = living_room.createObject("TV", "TV.png") 
living_room.locateObject(living_room.TV, 600, 200)

// TV 클릭 시.
living_room.TV.onClick = function()
{
  if(living_room.TV.isClosed()) // 처음 클릭 시, 교통사고에 관련된 뉴스 재생.
  {
    living_room.TV.open()
    playYoutube("https://www.youtube.com/watch?v=XsoghKE7B08&list=PLEG_iYeG7EPbhdZA7uo1PNEj21Cm__RPu&index=8&t=0s")
    printMessage("TV를 켜니 교통사고에 관한 뉴스가 나온다...")
  }
  else if(living_room.TV.isOpened()) // 두 번째 클릭 시
  {
    living_room.TV.lock()
    printMessage("교통사고...? 머리가 지끈거린다 나한테 무슨 일이 있었던 걸까...?")
    
  }
  else // 그 후, TV는 더 이상 켜지지 않는다.
  {
    printMessage("TV가 더 이상 켜지지 않는다...")
  }
}

//뒤집어진 장난감 차 배치.
living_room.toy_car = living_room.createObject("toy_car", "차.png")
living_room.toy_car.setWidth(50)
living_room.locateObject(living_room.toy_car, 1090, 550)
living_room.toy_car.hide()

// 찬장 배치.
living_room.cupboard = living_room.createObject("cupboard", "찬장.png")
living_room.locateObject(living_room.cupboard, 1090, 500)

living_room.toy_car.onClick = function()
{
    printMessage("장난감 차...? 손상되어 있다.")
}

// 찬장 Drag.
living_room.cupboard.move = true
living_room.cupboard.onDrag = function(direction)
{
    if (direction == "Down" && living_room.cupboard.move)
    {
        living_room.cupboard.moveX(90)
        living_room.cupboard.moveY(130)
        living_room.cupboard.move = false
        living_room.toy_car.show() // 찬장을 밀면 장난감 차가 보이도록 한다.
        printMessage("무언가 보인다.")
    }
    else if (living_room.cupboard.move)
    {
        printMessage("찬장 아래에 무언가 있는 것 같다.")
    }
}

living_room.cupboard.onClick = function() // 찬장 아래로 drag 시.
{
    if (living_room.cupboard.move)
    {
        printMessage("찬장 아래에 무언가 있는 것 같다.")
    }
}

// 현관문 배치.
living_room.entrance_door = living_room.createObject("entrance_door", "문1-닫힘.png")
living_room.entrance_door.setWidth(200)
living_room.locateObject(living_room.entrance_door, 200, 367)
living_room.entrance_door.lock()

living_room.entrance_door.onClick = function()
{
  if (living_room.entrance_door.isClosed())
  {
    
  }
  else if (living_room.entrance_door.isOpened())
  {
    
  }
  else if (living_room.entrance_door.isLocked())
  {
    printMessage("문이 잠겨있다... 이 문을 통해 밖으로 나갈 수 있을 것 같다.")
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

// 방으로 향하는 문 배치.
living_room.room_door = living_room.createObject("room_door", "문2-닫힘.png")
living_room.room_door.setWidth(150)
living_room.locateObject(living_room.room_door, 900, 255)

living_room.room_door.onClick = function()
{
  if (living_room.room_door.isClosed())
  {
    living_room.room_door.open()
    printMessage("문이 열렸다!")
  }
  else if (living_room.room_door.isOpened()) // 복도로 이동.
  {
    game.move(corridor)
    printMessage("아무리 봐도 이상한 구조의 집이군...")
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

/*복도*/
corridor.key = corridor.createObject("key", "열쇠.png")
corridor.key.setWidth(50)
corridor.locateObject(corridor.key,100,100)

corridor.key.onClick = function()
{
  corridor.key.pick()
}

/*
bed_drawer.key.onClick = function()
{
  bed_drawer.key.pick()
  printMessage("열쇠를 얻었다!")
}*/


// 가족사진 배치.
corridor.fam_pic = corridor.createObject("fam_pic", "액자.png")
corridor.locateObject(corridor.fam_pic, 200, 200)

corridor.fam_pic.onClick = function()
{
    showImageViewer("흐릿한가족사진.png", "")

    if (corridor.fam_pic.isClosed())
    {
      corridor.fam_pic.open()
      printMessage("나잖아...? 내 아내와 아이인가...?")
    }
    else if (corridor.fam_pic.isOpened())
    {
      corridor.fam_pic.lock()
      printMessage("머리가 너무 아프다... 아무것도 기억이 나질 않아...!")
    }
}

corridor.door1 = corridor.createObject("door1", "문2-닫힘.png") // 아이의 방으로 향하는 문.
corridor.door1.setWidth(150)
corridor.locateObject(corridor.door1, 550, 260)

corridor.door2 = corridor.createObject("door2", "문2-닫힘.png") // 안방으로 향하는 문.
corridor.door2.setWidth(150)
corridor.locateObject(corridor.door2, 750, 260)
corridor.door2.lock()

corridor.door3 = corridor.createObject("door3", "화살표.png") // 거실로 향하는 문.
corridor.door3.setWidth(60)
corridor.locateObject(corridor.door3, 50, 300)

corridor.door1.onClick = function()
{

  if (corridor.door1.isClosed())
  {
    corridor.door1.open()
    printMessage("문이 열렸다.")
  }
  else if (corridor.door1.isOpened())
  {
    printMessage("아이의 방이다...")
    game.move(kids_room)
  }
}

corridor.door1.onOpen = function()
{
    corridor.door1.setSprite("문2-열림.png")
}

corridor.door1.onClose = function()
{
    corridor.door1.setSprite("문2-닫힘.png")
}

corridor.door2.onClick = function()
{
    if (corridor.door2.isClosed())
    {
      corridor.door2.open()
    }
    else if (corridor.door2.isOpened())
    {
      game.move(main_room)
      printMessage("안방이다.")
    }
    else if (corridor.door2.isLocked())
    //console.log('hey1')
    //console.log(game.getHandItem() + '!')
    {
      
      if (game.getHandItem() == corridor.key)
      {
        //console.log('hey')
        printMessage("hey")
      }
      else
      {
      printMessage("문이 잠겨있다...")
      }
      
    }
}

corridor.door3.onClick = function()
{
    game.move(living_room)
}

/*아이의 방*/
kids_room.door = kids_room.createObject("door", "화살표2.png") // 화살표로 문 대체.
kids_room.locateObject(kids_room.door, 600, 690)

kids_room.door.lock()

kids_room.door.onClick = function()
{
  if (kids_room.door.isLocked())
  {
    showKeypad("telephone", "5518", function() {
      kids_room.door.unlock()
      corridor.fam_pic.lock()
      living_room.TV.lock()
      printMessage("문이 열렸다!")
    })
    printMessage("문이 잠겼다...")
  }
  else
  {
    game.move(corridor)
    printMessage("기억이 돌아오기 시작한다... 내 아들 찬혁이...")
  }
}

// 공책 배치.
kids_room.notebook = kids_room.createObject("notebook", "노트.png")
kids_room.notebook.setWidth(70)
kids_room.locateObject(kids_room.notebook, 265, 355)

kids_room.notebook.onClick = function()
{
  showImageViewer("일기.png", "")

  if (kids_room.notebook.isClosed())
  {
    kids_room.notebook.open()
    printMessage("아이의 일기인가...?")
  }
  else if (kids_room.notebook.isOpened())
  {
    kids_room.notebook.lock()
    printMessage("어린이날을 무척 좋아하나보군...")
  }
}

// 문제1 배치.
kids_room.prob1 = kids_room.createObject("prob1", "문제1-1.png")
kids_room.prob1.setWidth(35)
kids_room.locateObject(kids_room.prob1, 330, 355)

kids_room.prob1.onClick = function()
{
  showImageViewer("문제1-2.png", "")

  if (kids_room.prob1.isClosed())
  {
    kids_room.prob1.open()
    printMessage("아이의 과제인가...?")
  }
  else if (kids_room.prob1.isOpened())
  {
    kids_room.prob1.lock()
    printMessage("쌓기나무의 갯수를 구하는 문제인가...")
  }
  else{
    printMessage("위, 앞, 옆 모양을 보고 총 갯수를 구해야겠군...")
  }
}

// 연필 배치.
kids_room.pencil = kids_room.createObject("pencil", "연필.png")
kids_room.pencil.setWidth(35)
kids_room.locateObject(kids_room.pencil, 370, 355)

// 침대 서랍 열기.
kids_room.arrow1 = kids_room.createObject("arrow1", "화살표3.png")
kids_room.arrow1.setWidth(50)
kids_room.locateObject(kids_room.arrow1, 815, 615)

kids_room.arrow1.onClick = function()
{
  game.move(bed_drawer)

  if (kids_room.arrow1.isClosed())
  {
    kids_room.arrow1.open()
    printMessage("상자...?")
  }
}

// 책상 서랍 열기.
kids_room.arrow2 = kids_room.createObject("arrow2", "화살표4.png")
kids_room.arrow2.setWidth(50)
kids_room.locateObject(kids_room.arrow2, 177, 420)

kids_room.arrow2.onClick = function()
{
  game.move(desk_drawer)
}

// 가방 열기.
kids_room.bag = kids_room.createObject("bag", "화살표5.png")
kids_room.bag.setWidth(50)
kids_room.locateObject(kids_room.bag, 485, 550)

kids_room.bag.onClick = function()
{
  showImageViewer("문제2.png")

  if (kids_room.bag.isClosed())
  {
    kids_room.bag.open()
    printMessage("가방 안에도 문제가 있다.")
  }
}

/*아이 방 책상 서랍*/
desk_drawer.arrow = desk_drawer.createObject("arrow", "화살표2.png")
desk_drawer.locateObject(desk_drawer.arrow, 1000, 690)

desk_drawer.arrow.onClick = function()
{
  game.move(kids_room)
}

desk_drawer.prob3 = desk_drawer.createObject("prob3", "문제3.png")
desk_drawer.locateObject(desk_drawer.prob3, 600, 420)

desk_drawer.prob3.onClick = function()
{
  if (desk_drawer.prob3.isClosed())
  {
    desk_drawer.prob3.open()
    printMessage("음... 원의 넓이를 구하면 되려나...?")
  }
  else if (desk_drawer.prob3.isOpened())
  {
    desk_drawer.prob3.lock()
    printMessage("초록 부분을 제외하고 구하면 되겠군...")
  }
}

/*아이 방 침대 서랍*/
// 상자 배치.
bed_drawer.box = bed_drawer.createObject("box", "상자-닫힘.png")
bed_drawer.box.setWidth(400)
bed_drawer.box.lock()

// 상자 안 키 배치.
bed_drawer.key = bed_drawer.createObject("key", "열쇠.png")
bed_drawer.key.setWidth(50)
bed_drawer.locateObject(bed_drawer.key, 640, 365)
bed_drawer.key.hide()

bed_drawer.key.onClick = function()
{
  bed_drawer.key.pick()
  printMessage("열쇠를 얻었다!")
}

bed_drawer.key.setItemDescription("방문을 열 수 있을 것 같다.")

bed_drawer.box.onClick = function()
{
  if (bed_drawer.box.isClosed())
  {
    bed_drawer.box.open()
  }
  else if (bed_drawer.box.isLocked())
  {
    printMessage("상자가 잠겨있다.")
  }
}

bed_drawer.box.onOpen = function()
{
  bed_drawer.box.setSprite("상자-열림.png")
  bed_drawer.lock.hide()
  bed_drawer.key.show()
  printMessage("상자 안에 열쇠가 있다!")
}

bed_drawer.box.onClose = function()
{
  bed_drawer.box.setSprite("상자-닫힘.png")
}

// 상자 뚜껑에 숫자키 배치.
bed_drawer.lock = bed_drawer.createObject("lock", "숫자키.png")
bed_drawer.lock.setWidth(50)
bed_drawer.locateObject(bed_drawer.lock, 700, 380)

bed_drawer.lock.onClick = function()
{
  if (bed_drawer.box.isLocked())
  {
    showKeypad("number", "0505", function() {
      bed_drawer.box.unlock()
      printMessage("잠금장치가 열렸다.")
    })
  }
}

// 방으로 다시 돌아가기.
bed_drawer.arrow = bed_drawer.createObject("arrow", "화살표2.png")
bed_drawer.locateObject(bed_drawer.arrow, 150, 690)

bed_drawer.arrow.onClick = function()
{
  game.move(kids_room)
}

// 게임 시작
game.start(living_room)
printMessage("여긴 어디지...? 뭔가 낯익다...")