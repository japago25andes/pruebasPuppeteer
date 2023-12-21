const puppeteer = require("puppeteer")

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
	})

	//Pasa despues de cada prueba afterEach
	//Existe el afterAll = Despues de todos
	afterEach(async () => {
		await browser.close()
	})

	it("Extraer la informacion de un elemento", async () => {
		await page.goto("https://www.yahoo.com/", { waitUntil: "networkidle0" })
		//Esperar por el selector para que no tengamos problemas al ejecutar la prueba
		await page.waitForSelector("#ybarAccountProfile > a")

		const nombreBoton = await page.$eval("#ybarAccountProfile > a", (button) => button.textContent)

		console.log(nombreBoton)

		const [button] = await page.$x('//*[@id="ybarAccountProfile"]/a')
		const propiedad = await button.getProperty("textContent")
		const texto = await propiedad.jsonValue()

		console.log(texto)

		//segunda forma
		const texto2 = await page.evaluate((name) => name.textContent, button)
		console.log(texto2)
	}, 400000)

	it("Extraer el titulo de la pagina y la url", async () => {
		await page.goto("https://www.yahoo.com/", { waitUntil: "networkidle0" })
		//Extraer el nombre y la url de la pagina
		const titulo = await page.title()
		const url = await page.url()

		console.log(titulo)
		console.log(url)
	}, 400000)

	it("Extraer el titulo de la pagina y la url", async () => {
		await page.goto("https://www.yahoo.com/", { waitUntil: "networkidle0" })

		//Contar el numero de elementos en una pagina
		const imagenes = await page.$$eval("img", (imagenes) => imagenes.length)
		console.log(imagenes)
	}, 400000)
})
