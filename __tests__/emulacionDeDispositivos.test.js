const puppeteer = require("puppeteer")

describe("Emulando dispositivos", () => {
	let browser
	let page

	//Pasa antes de cada prueba beforeEach
	//Existe el beforeAll = antes que todos
	beforeEach(async () => {
		browser = await puppeteer.launch({
			headless: false, //que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
			defaultViewport: null, //modifica el ancho interno de la ventana para ajustarse al que se abre
			//slowMode: 500, //Especifica la velocidad a la que se deben realizar las cosas dentro de la prueba
		})

		//Pagina de browser normal(sin que sea de modo incognito)
		//page = await browser.newPage()

		const context = await browser.createIncognitoBrowserContext()
		page = await context.newPage()

		await page.goto("https://www.yahoo.com/", { waitUntil: "networkidle0" })
	}, 100000)

	//Pasa despues de cada prueba afterEach
	//Existe el afterAll = Despues de todos
	afterEach(async () => {
		await browser.close()
	})

	test("Emulando dispositivos de forma manual", async () => {
		await page.emulate({
			name: "Dispositivo",
			viewport: {
				width: 375,
				height: 667,
				deviceScaleFactor: 2,
				isMobile: true,
				hasTouch: true,
				isLandscape: false,
			},
			userAgent:
				"Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36",
		})

		await page.waitForTimeout(3000)
	}, 3500000)

	//Emulando los sitios comos si fuesen de escritorio
	test("Emulando un sitio de escritorio", async () => {
		await page.setViewport({
			width: 1500,
			height: 800,
		})

		await page.waitForTimeout(3000)
	}, 3500000)

	//Emulando tablets de forma horizontal
	test("Emulando un en una tablet en modo horizontal", async () => {
		const tablet = puppeteer.devices["iPad landscape"]

		await page.emulate(tablet)

		await page.waitForTimeout(3000)
	}, 3500000)

	//Emulando un celular
	test("Emulando un sitio en un celular", async () => {
		const iphone = puppeteer.devices["iPhone X"]

		await page.emulate(iphone)

		await page.waitForTimeout(3000)
	}, 3500000)
})
