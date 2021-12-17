let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let style = document.createElement('style')

let normalFontName = `PressStart2P`
let asianFontName = `JF-Dot-MPlusS10B`

style.appendChild(document.createTextNode(`
	@font-face {
		font-family: '${normalFontName}';
		src: url('./fonts/${normalFontName}.ttf');
	}
	@font-face {
		font-family: '${asianFontName}';
		src: url('./fonts/${asianFontName}.ttf');
	}
`))

document.head.appendChild(style)

let normalFont = new FontFace(normalFontName, `url(./fonts/${normalFontName}.ttf)`)
let asianFont = new FontFace(asianFontName, `url(./fonts/${asianFontName}.ttf)`)

let strings = [
	"How high can you get?",
	"Do A Barrel Roll!",
	"Okay, let's go!",
	"I used to be an adventurer like you.Then I took an arrow in the knee.",
	"Hello! You found my shop of strange and wonderful things!",
	"WELCOME TO WARP ZONE!",
	"All you had to do was follow the damn train, CJ!",
	"Now is not the time to use that!",
	"This is your fault. I'm going to kill you. And all the cake is gone. You don't even care, do you?",
	"Finish Him!",
	"Let me guess: Someone stole your sweetroll.",
	"Thank you Mario! But our princess is in another castle!",
	"Job's done!",
	"I am error.",
	"It's a secret to everybody.",
	"It's dangerous to go alone! Take this.",
	"Work, Work.",
	"Hey! Listen!",
	"You are not prepared!",
	"Stop poking me.",
	"Fire in the hole!",
	"Wololo!",
	"Heheh! This gym is great! It’s full of women!",
	"It's-a Me, Mario!",
	"Wait, I know you!",
	"The Cake is a lie.",
	"You know what is wrong with Skyrim these days? Everyone is obsessed with death.",
	"ヒトリデハキケンジャコレヲサズケヨウ。",
	"オレノナハエラーダ...",
	"ミンナニナイショダヨ。"
]

strings = strings.map((string) => string + " ")

let width = 3840 || window.innerWidth
let height = 2160 || window.innerHeight
let fontSize = 20

canvas.width = width
canvas.height = height

ctx.fillStyle = '#000000'
ctx.fillRect(0, 0, width, height)

let chars = []
for (let i = 0; i < canvas.height / fontSize; i++) {
	strings.forEach((string) => {
		string.split('').forEach((char) => {
			chars.push(char)
		})
	})
}

normalFont.load().then(() => {
	asianFont.load().then(() => {
		getLines(ctx, chars, canvas.width).forEach((line, i) => {
			let offset = 0
			line.split(/( )/g).forEach((word, j) => {
				if (word.match(/[\u3040-\u30ff]/)) {
					ctx.fillStyle = randomColor()
					ctx.font = `900 ${fontSize}px ${asianFontName}`
					ctx.fillText(word, offset, (i + 1) * fontSize - fontSize / 4)
				} else {
					ctx.font = `normal ${fontSize}px ${normalFontName}`
					ctx.fillStyle = randomColor()
					ctx.fillText(word, offset, (i + 1) * fontSize)
				}
				offset += word.length * fontSize
			})
		})
	})
})

function getLines(ctx, chars, maxWidth) {
	let lines = []
	let currentLine = chars[0]
	for (var i = 1; i < chars.length; i++) {
		let char = chars[i]
		let width = ctx.measureText(currentLine + char).width
		if (width <= maxWidth) {
			currentLine += char
		} else {
			lines.push(currentLine)
			currentLine = char
		}
	}
	lines.push(currentLine)
	return shuffle(lines)
}

function randomColor() {
	let rnd = Math.random() * 255
	let r = rnd
	let g = rnd
	let b = rnd
	let opacity = 0.25
	return `rgba(${r},${g},${b},${opacity})`
}

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
