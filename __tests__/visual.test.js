const puppeteer = require("puppeteer")
const { toMatchImageSnapshot } = require("jest-image-snapshot")
expect.extend({ toMatchImageSnapshot })

//-------------------------------------------------------------------------------------------------------------------------------------

describe("Extrayendo informacion", () => {
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

		page = await browser.newPage()
		await page.goto("https://www.udemy.com/", { waitUntil: "networkidle0" })
	}, 50000)

	//Pasa despues de cada prueba afterEach
	//Existe el afterAll = Despues de todos
	afterEach(async () => {
		await browser.close()
	})

	//-------------------------------------------------------------------------------------------------------------------------------------

	test("Snapshot de toda la pagina", async () => {
		await page.waitForSelector("img")

		const screenshot = await page.screenshot()

		//Toma el screenshot y hace una comparacion sobre uno antiguo qye tenga
		expect(screenshot).toMatchImageSnapshot()
	}, 400000)

	test("Snapshot de solo un elemento", async () => {
		const image = await page.waitForSelector("img")

		const screenshot = await image.screenshot()

		expect(screenshot).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: "percent",
		})
	}, 400000)

	test("Snapshot de un celular", async () => {
		const tablet = puppeteer.devices["iPad landscape"]

		await page.emulate(tablet)

		await page.waitForSelector("img")

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: "percent",
		})
	}, 400000)

	//Este se utiliza para validar todo menos las imagenes ya que estas pueden cambiar como un baner
	test("Remover imagen antes de crear snapshot", async () => {
		await page.waitForSelector("img")

		await page.evaluate(() =>
			(document.querySelectorAll("img") || []).forEach((img) => img.remove())
		)

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: "percent",
		})
	}, 400000)
})
