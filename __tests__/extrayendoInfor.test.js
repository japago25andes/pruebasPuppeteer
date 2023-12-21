const puppeteer = require("puppeteer")
const { getText, getCount } = require("../lib/helpers")

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

	it("Extraer la informacion de un elemento", async () => {
		const nombreBoton = await getText(
			page,
			'#es > div.ud-main-content-wrapper > div.ud-app-loader.ud-component--header-v6--header.ud-header.ud-app-loaded > div.ud-header.ud-text-sm.desktop-header-module--header--3nb6v.desktop-header-module--flex-middle--1e7c8 > div:nth-child(9) > a > span'
		)

		console.log(nombreBoton)
	}, 400000)

	it("Extraer el titulo de la pagina y la url", async () => {
		//Extraer el nombre y la url de la pagina
		const titulo = await page.title()
		const url = await page.url()

		console.log(titulo)
		console.log(url)
	}, 400000)

	it("Extraer el titulo de la pagina y la url", async () => {
		//Contar el numero de elementos en una pagina
		const imagenes = await getCount(page, 'div')
		console.log(imagenes)
	}, 400000)
})
