enum RadioMessage {
    message1 = 49434,
    up = 483,
    down = 21844,
    left = 14947,
    right = 32391,
    hello = 49337,
    X = 36564,
    Y = 55950
}
radio.onReceivedMessage(RadioMessage.X, function () {
    other_direction = "X"
    draw()
})
function draw_player (x: number, y: number, direction: string) {
    if (direction == "X") {
        led.plot(x, y)
        led.plotBrightness(x + 1, y, 97)
        led.plotBrightness(x - 1, y, 97)
    }
    if (direction == "Y") {
        led.plot(x, y)
        led.plotBrightness(x, y + 1, 97)
        led.plotBrightness(x, y - 1, 97)
    }
}
function broadcast_poz () {
    if (!(x == x_step)) {
        if (x > x_step) {
            while (!(x == x_step)) {
                x_step += 1
                radio.sendMessage(RadioMessage.right)
            }
        } else {
            while (!(x == x_step)) {
                x_step += -1
                radio.sendMessage(RadioMessage.left)
            }
        }
    }
    if (!(y == y_step)) {
        if (y > y_step) {
            while (!(y == y_step)) {
                y_step += 1
                radio.sendMessage(RadioMessage.down)
            }
        } else {
            while (!(y == y_step)) {
                y_step += -1
                radio.sendMessage(RadioMessage.up)
            }
        }
    }
}
radio.onReceivedMessage(RadioMessage.Y, function () {
    other_direction = "Y"
    draw()
})
input.onButtonPressed(Button.A, function () {
    if (direction == "X") {
        x += -1
    } else {
        y += -1
    }
    draw()
})
radio.onReceivedMessage(RadioMessage.hello, function () {
    x = 0
    y = 0
    x_step = 0
    y_step = 0
    direction = "X"
    other_direction = "X"
    other_x = 0
    other_y = 0
    hello = true
    draw()
    basic.pause(1000)
    hello = false
    draw()
})
function draw () {
    if (hello) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.clearScreen()
        draw_player(x, y, direction)
        draw_player(other_x, other_y, other_direction)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (direction == "X") {
        direction = "Y"
        radio.sendMessage(RadioMessage.Y)
    } else {
        direction = "X"
        radio.sendMessage(RadioMessage.X)
    }
    draw()
})
radio.onReceivedMessage(RadioMessage.left, function () {
    other_x += -1
    draw()
})
input.onButtonPressed(Button.B, function () {
    if (direction == "X") {
        x += 1
    } else {
        y += 1
    }
    draw()
})
radio.onReceivedMessage(RadioMessage.right, function () {
    other_x += 1
    draw()
})
function check_poz () {
    if (x > 4) {
        x = 4
    }
    if (x < 0) {
        x = 0
    }
    if (y > 4) {
        y = 4
    }
    if (y < 0) {
        y = 0
    }
}
radio.onReceivedMessage(RadioMessage.up, function () {
    other_y += -1
    draw()
})
radio.onReceivedMessage(RadioMessage.down, function () {
    other_y += 1
    draw()
})
let hello = false
let other_y = 0
let other_x = 0
let y_step = 0
let y = 0
let x_step = 0
let x = 0
let other_direction = ""
let direction = ""
direction = "X"
other_direction = "X"
radio.sendMessage(RadioMessage.hello)
draw()
basic.forever(function () {
    check_poz()
    broadcast_poz()
})
