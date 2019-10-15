/*거실*/
living_room = game.createRoom("living_room", "거실.png") // 거실 생성

// 등 전원 스위치 생성.
living_room.switch = living_room.createObject("switch", "switch.png")
living_room.switch.setWidth(30)
living_room.locateObject(living_room.switch, 350, 200)

roomLight = true

living_room.switch.onClick = function()
{
  if (roomLight)
  {
    playSound("click.wav")
    living_room.setRoomLight(1)
    roomLight = false

    printMessage("... 여긴 어디지...? 뭔가 낯익다...")
  }
}

//암호키 배치.
living_room.lock = living_room.createObject("lock", "캡처.png")
living_room.lock.setWidth(50)
living_room.locateObject(living_room.lock, 250, 520)
living_room.lock.hide()

living_room.lock.onClick = function()
{
  playSound("click.wav")
  if (living_room.lock.isClosed())
  {
    living_room.lock.open()
    printMessage("음...? 뭔가 생겼다...!")
  }
  else
  {
    printMessage("답은... 내가 돌아가고 싶은 곳일거야...")
  }
  showKeypad("alphabet", "HOUSE", function(){
    living_room.entrance_door.unlock()
    playSound("correct.wav")
    printMessage("현관문이 열린 것 같다...!")
})
}

// TV 배치.
living_room.TV = living_room.createObject("TV", "TV.png")
living_room.locateObject(living_room.TV, 600, 200)

// TV 클릭 시.
living_room.TV.onClick = function()
{
  if(living_room.TV.isClosed()) // 처음 클릭 시, 교통사고에 관련된 뉴스 재생.
  {
    playSound("beep.wav")
    living_room.TV.open()
    playYoutube("https://www.youtube.com/watch?v=XsoghKE7B08&list=PLEG_iYeG7EPbhdZA7uo1PNEj21Cm__RPu&index=8&t=0s")
    printMessage("TV를 켜니 교통사고에 관한 뉴스가 나온다...")
  }
  else if(living_room.TV.isOpened()) // 두 번째 클릭 시
  {
    playSound("click.wav")
    living_room.TV.lock()
    printMessage("교통사고...? 머리가 지끈거린다 나한테 무슨 일이 있었던 걸까...?")

  }
  else // 그 후, TV는 더 이상 켜지지 않는다.
  {
    playSound("click.wav")
    printMessage("TV가 켜지지 않는다...")
  }
}

//뒤집어진 장난감 차 배치.
living_room.toy_car = living_room.createObject("toy_car", "차.png")
living_room.toy_car.setWidth(50)
living_room.locateObject(living_room.toy_car, 1090, 550)
living_room.toy_car.hide()

living_room.toy_car.onClick = function()
{
  playSound("click.wav")
  printMessage("장난감 차...? 손상되어 있다.")
}

// 찬장 배치.
living_room.cupboard = living_room.createObject("cupboard", "찬장.png")
living_room.locateObject(living_room.cupboard, 1090, 500)

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
      playSound("drag.wav")
    }
    else if (living_room.cupboard.move)
    {
      printMessage("찬장 아래에 무언가 있는 것 같다.")
    }
}

living_room.cupboard.onClick = function()
{
    if (living_room.cupboard.move)
    {
      playSound("bump.wav")
      printMessage("찬장 아래에 무언가 있는 것 같다.")
    }
}

// 현관문 배치.
living_room.entrance_door = living_room.createObject("entrance_door", "문1-닫힘.png")
living_room.entrance_door.setWidth(79)
living_room.locateObject(living_room.entrance_door, 200, 367)
living_room.entrance_door.lock()

living_room.entrance_door.onClick = function()
{
  if (living_room.entrance_door.isClosed())
  {
    playSound("door_open.wav")
    living_room.entrance_door.open()
  }
  else if (living_room.entrance_door.isOpened())
  {
    playSound("footstep.wav")
    game.move(white_room)
    playSound("heart_rate.wav")
    showImageViewer("에필로그.png", "")
  }
  else if (living_room.entrance_door.isLocked())
  {
    playSound("bump.wav")
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
    playSound("door_open.wav")
    living_room.room_door.open()
    printMessage("문이 열렸다!")
  }
  else if (living_room.room_door.isOpened()) // 복도로 이동.
  {
    playSound("footstep.wav")
    game.move(corridor)
    if (corridor.door2.isLocked())
    {
      printMessage("아무리 봐도 이상한 구조의 집이군...")
    }
    else
    {
      printMessage("어서 여길 나가자")
    }
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
corridor = game.createRoom("corridor", "복도1.png") // 복도생성

// 가족사진 배치.
corridor.fam_pic = corridor.createObject("fam_pic", "액자.png")
corridor.locateObject(corridor.fam_pic, 200, 200)

corridor.fam_pic.onClick = function()
{
    playSound("click.wav")
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
    playSound("door_open.wav")
    corridor.door1.open()
    printMessage("문이 열렸다.")
  }
  else if (corridor.door1.isOpened())
  {
    if (kids_room.door.isLocked())
    {
      printMessage("(문이 잠기며) 어...? 아이의 방이다...")
    }
    playSound("footstep.wav")
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
      playSound("door_open.wav")
      corridor.door2.open()
    }
    else if (corridor.door2.isOpened())
    {
      playSound("footstep.wav")
      game.move(main_room)
      printMessage("안방이다...")
    }
    else if (corridor.door2.isLocked())
    {

      if (game.getHandItem() == bed_drawer.key)
      {
        corridor.door2.unlock()
        playSound("key_unlock.wav")
        printMessage("문이 열렸다!")
      }
      else
      {
        playSound("bump.wav")
        printMessage("문이 잠겨있다...")
      }
    }
}

corridor.door2.onOpen = function()
{
    corridor.door2.setSprite("문2-열림.png")
}

corridor.door2.onClose = function()
{
    corridor.door2.setSprite("문2-닫힘.png")
}

corridor.door3.onClick = function()
{
  playSound("footstep.wav")
  game.move(living_room)
}

/*아이의 방*/
kids_room = game.createRoom("kids_room", "아이의방.png") // 아이 방 생성.

kids_room.door = kids_room.createObject("door", "화살표2.png") // 화살표로 문 대체.
kids_room.locateObject(kids_room.door, 600, 690)

kids_room.door.lock()

kids_room.door.onClick = function()
{
  if (kids_room.door.isLocked())
  {
    playSound("beep.wav")
    showKeypad("telephone", "5518", function() {
      kids_room.door.unlock()
      corridor.fam_pic.lock()
      living_room.TV.lock()
      playSound("door_open.wav")
      printMessage("문이 열렸다!")
    })
    printMessage("문이 잠겼다...")
  }
  else
  {
    playSound("footstep.wav")
    game.move(corridor)
    if (corridor.door2.isLocked())
    {
      printMessage("기억이 돌아오기 시작한다... 내 아들 찬혁이...")
    }
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
    playSound("click.wav")
    kids_room.notebook.open()
    printMessage("아이의 일기인가...?")
  }
  else if (kids_room.notebook.isOpened())
  {
    playSound("click.wav")
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
  // playSound("click.wav")
  showImageViewer("문제1-2.png", "")

  if (kids_room.prob1.isClosed())
  {
    playSound("click.wav")
    kids_room.prob1.open()
    printMessage("아이의 과제인가...?")
  }
  else if (kids_room.prob1.isOpened())
  {
    playSound("click.wav")
    kids_room.prob1.lock()
    printMessage("쌓기나무의 갯수를 구하는 문제인가...")
  }
  else
  {
    playSound("click.wav")
    printMessage("위, 앞, 옆 모양을 보고 총 갯수를 구해야겠군...")
  }
}

// 연필 배치.
kids_room.pencil = kids_room.createObject("pencil", "연필.png")
kids_room.pencil.setWidth(35)
kids_room.locateObject(kids_room.pencil, 370, 355)

// 침대 서랍 안 구현.
bed_drawer = game.createRoom("bed_drawer", "침대 서랍.png")

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
  playSound("key.wav")
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
    playSound("bump.wav")
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
      playSound("lock_rattle.wav")
      printMessage("잠금장치가 열렸다.")
    })
  }
}

// 방으로 다시 돌아가기.
bed_drawer.arrow = bed_drawer.createObject("arrow", "화살표2.png")
bed_drawer.locateObject(bed_drawer.arrow, 150, 690)

bed_drawer.arrow.onClick = function()
{
  playSound("footstep.wav")
  game.move(kids_room)
}

// 침대 서랍 열기.
kids_room.arrow1 = kids_room.createObject("arrow1", "화살표3.png")
kids_room.arrow1.setWidth(50)
kids_room.locateObject(kids_room.arrow1, 815, 615)

kids_room.arrow1.onClick = function()
{
  playSound("footstep.wav")
  game.move(bed_drawer)

  if (kids_room.arrow1.isClosed())
  {
    kids_room.arrow1.open()
    printMessage("상자...?")
  }
}

// 책상 서랍 안 구현.
desk_drawer = game.createRoom("desk_drawer", "책상 서랍.png") // 책상 서랍 안 구현.

// 방으로 다시 돌아가기.
desk_drawer.arrow = desk_drawer.createObject("arrow", "화살표2.png")
desk_drawer.locateObject(desk_drawer.arrow, 1000, 690)

desk_drawer.arrow.onClick = function()
{
  playSound("footstep.wav")
  game.move(kids_room)
}

desk_drawer.prob3 = desk_drawer.createObject("prob3", "문제3.png")
desk_drawer.locateObject(desk_drawer.prob3, 600, 420)

desk_drawer.prob3.onClick = function()
{
  // playSound("click.wav")
  if (desk_drawer.prob3.isClosed())
  {
    playSound("click.wav")
    desk_drawer.prob3.open()
    printMessage("음... 원의 넓이를 구하면 되려나...?")
  }
  else if (desk_drawer.prob3.isOpened())
  {
    playSound("click.wav")
    desk_drawer.prob3.lock()
    printMessage("초록 부분을 제외하고 구하면 되겠군...")
  }
}

// 책상 서랍 열기.
kids_room.arrow2 = kids_room.createObject("arrow2", "화살표4.png")
kids_room.arrow2.setWidth(50)
kids_room.locateObject(kids_room.arrow2, 177, 420)

kids_room.arrow2.onClick = function()
{
  playSound("footstep.wav")
  game.move(desk_drawer)
}

// 가방 열기.
kids_room.bag = kids_room.createObject("bag", "화살표5.png")
kids_room.bag.setWidth(50)
kids_room.locateObject(kids_room.bag, 485, 550)

kids_room.bag.onClick = function()
{
  // playSound("click.wav")
  showImageViewer("문제2.png")

  if (kids_room.bag.isClosed())
  {
    playSound("click.wav")
    kids_room.bag.open()
    printMessage("가방 안에도 문제가 있다.")
  }
}

/*안방*/
main_room = game.createRoom("main_room", "안방.png") // 안방 생성

// 가족 그림 배치
main_room.fam_pic = main_room.createObject("fam_pic", "가족그림.png")
main_room.fam_pic.setWidth(40)
main_room.locateObject(main_room.fam_pic, 100, 280)

main_room.fam_pic.onClick = function()
{
  showImageViewer("가족그림.png", "")

  if (main_room.fam_pic.isClosed())
  {
    playSound("click.wav")
    main_room.fam_pic.open()
    printMessage("내게 제일 소중한 가족...")
  }
}

// 집 그림 배치
main_room.home_pic = main_room.createObject("home_pic", "집.png")
main_room.home_pic.setWidth(50)
main_room.locateObject(main_room.home_pic, 900, 260)

main_room.home_pic.onClick = function()
{
  playSound("paper.wav")
  main_room.home_pic.pick()
  living_room.lock.show()
  printMessage("빨리 집으로 돌아가고 싶다...")
}

main_room.home_pic.setItemDescription("내가 돌아가고 싶은 곳...")

// 복도로 가는 문 배치.
main_room.door = main_room.createObject("door", "화살표2.png")
main_room.door.setWidth(80)
main_room.locateObject(main_room.door, 600, 690)

main_room.door.onClick = function()
{
  playSound("footstep.wav")
  game.move(corridor)
}

// 창문 상호작용.
main_room.window_arrow = main_room.createObject("window_arrow", "화살표5.png")
main_room.window_arrow.setWidth(70)
main_room.locateObject(main_room.window_arrow, 1080, 160)

main_room.window_arrow.onClick = function()
{
  playSound("click.wav")
  if (main_room.window_arrow.isClosed())
  {
    main_room.window_arrow.open()
    printMessage("밖에 아무것도 보이지 않는다... 그냥 푸르다...")
  }
  else if (main_room.window_arrow.isOpened())
  {
    main_room.window_arrow.lock()
    printMessage("아무래도 여긴 실재하는 공간은 아닌 것 같다...")
  }
  else
  {
    printMessage("여길 나가면 다시 가족을 볼 수 있을까...?")
  }
}

/*하얀 방*/
white_room = game.createRoom("white_room", "white.png") // 하얀 방 생성.

white_room.door = white_room.createObject("door", "문2-열림.png") // 문 생성.

white_room.door.onClick = function()
{
  playSound("footstep.wav")
  game.clear()
}

// 게임 시작
playSound("car_crash.wav")
living_room.setRoomLight(0.2)
game.start(living_room)
printMessage("안 돼...!")
