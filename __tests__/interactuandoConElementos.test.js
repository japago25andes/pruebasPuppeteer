const puppeteer = require("puppeteer")
const { click, type, doubleClick } = require("../lib/helpers")

//-------------------------------------------------------------------------------------------------------------------------------------

describe("Interactuando con elementos", () => {
	it("Debe abrir y cerrar el navegador", async () => {
		const browser = await puppeteer.launch({
			headless: false, //que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
			defaultViewport: null, //modifica el ancho interno de la ventana para ajustarse al que se abre
		})
		const page = await browser.newPage()
		await page.goto("https://demo.guru99.com/test/simple_context_menu.html")

		//Se utiliza par poder realizar la aceptacion de cuadros de dialogos
		page.on("dialog", async (dialog) => {
			await dialog.accept()
		})

		//Doble click
		await doubleClick(page, '#authentication > button')
		await page.waitForTimeout(3000)

		//click derecho
		await page.click("#authentication > span", { button: "right", delay: 500 })
		await page.waitForTimeout(3000)

		//Escrbir en un espacio determinado
		await page.goto("https://devexpress.github.io/testcafe/example/")


		await type(page, "#developer-name", "John Pardo")
		await click(page, "#remote-testing")
		await click(page, "#tried-test-cafe")
		await type(page, "#comments", "Esto es un comentario para la clase de testing")
		await click(page, "#submit-button")
		await page.waitForSelector("#article-header")
		await page.waitForTimeout(3000)

		await browser.close()
	}, 40000)
})
