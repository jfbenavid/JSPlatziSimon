const levels = 15
let keys = generateKeys(levels)
nextRound(0)

function generateRandomKey() {
    return Math.round(Math.random() * (90 - 65) + 65)
}

function generateKeys(levels) {
    return new Array(levels).fill(0).map(generateRandomKey)
}

function nextRound(currentLevel) {
    if (currentLevel == (levels - 1)) {
        return swal({ title: 'Great, You Won!', type: 'success' })
    }

    swal(`Level ${currentLevel + 1}`, { timer: 1000, buttons: false })

    for (let i = 0; i <= currentLevel; i++) {
        setTimeout(() => activate(keys[i]), 1000 * (i + 1) + 500);
    }

    let i = 0
    let currentKey = keys[i]
    window.addEventListener('keydown', onkeydown)

    function onkeydown(ev) {
        if (ev.keyCode == currentKey) {
            activate(currentKey, { success: true })
            i++
            if (i > currentLevel) {
                window.removeEventListener('keydown', onkeydown)
                setTimeout(() => nextRound(i), 1500);
            }

            currentKey = keys[i]
        } else {
            activate(ev.keyCode, { fail: true })
            window.removeEventListener('keydown', onkeydown)
            swal({
                title: 'You lose',
                text: 'Do you want to play again?',
                buttons: {
                    yes: {
                        text: 'Yes',
                        value: true
                    },
                    no: {
                        text: 'No', 
                        value: false
                    }
                }
            }).then((ok) => {
                if (ok) {
                    keys = generateKeys(levels)
                    nextRound(0)
                } else {
                    swal('Ok :(', { buttons: false, closeOnEsc: false, closeOnClickOutside: false })
                }
            })
        }
    }
}

function getElementByKeyCode(key) {
    return document.querySelector(`[data-key="${key}"]`)
}

function activate(key, opts = {}) {
    const element = getElementByKeyCode(key)
    element.classList.add('active')
    if (opts.success) {
        element.classList.add('success')
    } else if (opts.fail) {
        element.classList.add('fail')
    }

    setTimeout(() => deactivate(element), 500)
}

const deactivate = (el) => {
    el.className = 'key'
}

