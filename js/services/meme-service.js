'use strict'

let gFilterBy = ''

const gTxts = [
    'I hope we didnt need that', 'Here we go again', 'You win some you lose some', 'Take it or leave it', 'Better than nothing',
    'My time has come', 'Better you than me', 'Fight me!', 'Bring it on!'
]

const gDefaultLine1 = {
    txt: 'DOM or MODEL?',
    size: 40,
    align: 'center',
    color: 'white',
    x: 200,
    y: 50,
    font: 'impact',
    strokeClr: 'black'
}

const gDefaultLine2 = {
    txt: 'NEITHER',
    size: 40,
    align: 'center',
    color: 'white',
    x: 200,
    y: 350,
    font: 'impact',
    strokeClr: 'black'
}

const gDefaultLine3 = {
    txt: 'NOT SO SURE',
    size: 40,
    align: 'center',
    color: 'white',
    x: 200,
    y: 200,
    font: 'impact',
    strokeClr: 'black'
}


let gImgs = [
    createImg(1, 'img/1.jpg', ['funny', 'politics']),
    createImg(2, 'img/2.jpg', ['funny', 'dogs']),
    createImg(3, 'img/3.jpg', ['babies', 'dogs']),
    createImg(4, 'img/4.jpg', ['funny', 'cats']),
    createImg(5, 'img/5.jpg', ['babies', 'funny']),
    createImg(6, 'img/6.jpg', ['crazy']),
    createImg(7, 'img/7.jpg', ['babies', 'shock']),
    createImg(8, 'img/8.jpg', ['funny', 'happy']),
    createImg(9, 'img/9.jpg', ['babies', 'laugh'])
]

let gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'DOM or MODEL?',
            size: 40,
            align: 'center',
            color: 'white',
            x: 200,
            y: 50,
            font: 'impact',
            strokeClr: 'black'
        },
        {
            txt: 'NEITHER',
            size: 40,
            align: 'center',
            color: 'white',
            x: 200,
            y: 350,
            font: 'impact',
            strokeClr: 'black'
        }
    ]
}

//returns the global variable of imgs or the filtered imgs
function getImgs() {
    if (!gFilterBy) return gImgs
    const imgs = gImgs.filter(img => {
        return img.keywords.includes("funny") && gFilterBy === 'funny'
            || img.keywords.includes("dogs") && gFilterBy === 'dogs'
            || img.keywords.includes("babies") && gFilterBy === 'babies'
            || img.keywords.includes("politics") && gFilterBy === 'politics'
            || img.keywords.includes("cats") && gFilterBy === 'cats'
            || img.keywords.includes("shock") && gFilterBy === 'shock'
            || img.keywords.includes("happy") && gFilterBy === 'happy'
            || img.keywords.includes("laugh") && gFilterBy === 'laugh'
            || img.keywords.includes("crazy") && gFilterBy === 'crazy'
    })
    return imgs

}

//returns the global variable of meme
function getMeme() {
    return gMeme
}

//changes the txt over the canvas according to user
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

//after clicking an img - set the id of it in the model
function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

//after picking a color by the user - update the model color
function setColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val
}

//setting the font size in the model
function setFontSize(indicator) {
    gMeme.lines[gMeme.selectedLineIdx].size += indicator
}

//switch the line which we write in + focusing it with a drawRect
function switchLine() {
    switch (gMeme.selectedLineIdx) {
        case 2:
            gMeme.selectedLineIdx = 0
            break
        case 0:
            gMeme.selectedLineIdx = 1
            break
        case 1:
            if (gIsLineAdded) gMeme.selectedLineIdx = 2
            else gMeme.selectedLineIdx = 0
            break
    }
}

//set back to default settings both lines + splicing third line
function SetDefaultLine() {
    let default1 = Object.assign({}, gDefaultLine1)
    let default2 = Object.assign({}, gDefaultLine2)
    gMeme.lines[0] = default1
    gMeme.lines[1] = default2
    gMeme.lines.splice(2, 1)
}

//changes align direction in model by the direction that was sent
function alignTxt(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}

//updating model and pushing the third line
function addLine() {
    let default3 = Object.assign({}, gDefaultLine3)
    gMeme.lines.push(default3)
}

//receiving font from controller and changing model font
function fontPick(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

//receiving stroke clr from controller and changing model clr
function setStroke(clr) {
    gMeme.lines[gMeme.selectedLineIdx].strokeClr = clr
}

//randomizing all the settings if flexible option was sent
function randomMeme() {
    gMeme.selectedImgId = getRandomIntInclusive(0, gImgs.length - 1)
    gMeme.lines[getRandomIntInclusive(0, gMeme.lines.length - 1)].txt = gTxts[getRandomIntInclusive(0, gTxts.length - 1)]
    gMeme.lines[getRandomIntInclusive(0, gMeme.lines.length - 1)].color = getRandomColor()
    gMeme.lines[getRandomIntInclusive(0, gMeme.lines.length - 1)].strokeClr = getRandomColor()
    gMeme.lines[getRandomIntInclusive(0, gMeme.lines.length - 1)].size = getRandomIntInclusive(20, 40)
}

//receiving filter keyword and changing global var
function setFilter(filterBy) {
    gFilterBy = filterBy
}

//create img - returns object
function createImg(id, url, keywords) {
    let img = {
        id,
        url,
        keywords
    }
    return img
}


