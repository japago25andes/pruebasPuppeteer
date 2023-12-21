const puppeteer = require("puppeteer")

describe("Extrayendo informacion", () => {
	it("Extraer la informacion de un elemento", async () => {
		const browser = await puppeteer.launch({
			headless: false, //que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
			defaultViewport: null, //modifica el ancho interno de la ventana para ajustarse al que se abre
			slowMode: 500, //Especifica la velocidad a la que se deben realizar las cosas dentro de la prueba
		})
		const page = await browser.newPage()
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

		await browser.close()
	}, 40000)

	it("Extraer el titulo de la pagina y la url", async () => {
		const browser = await puppeteer.launch({
			headless: false, //que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
			defaultViewport: null, //modifica el ancho interno de la ventana para ajustarse al que se abre
			slowMode: 500, //Especifica la velocidad a la que se deben realizar las cosas dentro de la prueba
		})
		const page = await browser.newPage()
		await page.goto("https://www.yahoo.com/", { waitUntil: "networkidle0" })
		//Extraer el nombre y la url de la pagina
		const titulo = await page.title()
		const url = await page.url()

		console.log(titulo)
		console.log(url)

		await browser.close()
	}, 40000)

	it("Extraer el titulo de la pagina y la url", async () => {
		const browser = await puppeteer.launch({
			headless: false, //que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
			defaultViewport: null, //modifica el ancho interno de la ventana para ajustarse al que se abre
			slowMode: 500, //Especifica la velocidad a la que se deben realizar las cosas dentro de la prueba
		})
		const page = await browser.newPage()
		await page.goto("https://www.yahoo.com/", { waitUntil: "networkidle0" })
		
        //Contar el numero de elementos en una pagina
		const imagenes = await page.$$eval('img', (imagenes) => imagenes.length)
        console.log(imagenes)
        
		await browser.close()
	}, 40000)
})
