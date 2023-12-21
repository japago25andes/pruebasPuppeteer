const puppeteer = require("puppeteer")

//--------------------------------------------------------------------------------------------------------------------------------

describe("Capturas de pantalla", () => {
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

		//crean un context de pagina ingognita y la utiliza
		const context = await browser.createIncognitoBrowserContext()
		page = await context.newPage()

		await page.goto("https://www.google.com/", { waitUntil: "networkidle0" })
	}, 100000)

	//Pasa despues de cada prueba afterEach
	//Existe el afterAll = Despues de todos
	afterEach(async () => {
		await browser.close()
	})

	//--------------------------------------------------------------------------------------------------------------------------------

	test("Captura de pantalla completa", async () => {
		await page.screenshot({
			path: "./captura.png",
			fullPage: true,
		})
	}, 3500000)

	test("Captura de pantalla seleccionando un area", async () => {
		await page.screenshot({
			path: "./captura2.png",
			clip: {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			},
		})
	}, 3500000)

	test("Captura de pantalla con fondo transparente", async () => {
		await page.evaluate(() => (document.body.style.background = "transparent"))

		await page.screenshot({
			path: "./captura3.png",
			omitBackground: true,
		})
	}, 3500000)

	test("Captura de pantalla a un elemnto", async () => {
		const element = await page.waitForSelector("#hplogo")

		await element.screenshot({
			path: "./captura4.png",
			omitBackground: true,
		})
	}, 3500000)
})
