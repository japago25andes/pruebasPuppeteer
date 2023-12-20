const puppeteer = require("puppeteer")

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
		await page.click("#authentication > button", { clickCount: 2, delay: 500 })
		await page.waitForTimeout(3000)
		
		//click derecho
		await page.click("#authentication > span", { button: "right", delay: 500 })
		await page.waitForTimeout(3000)
		
		//Escrbir en un espacio determinado
		await page.goto("https://devexpress.github.io/testcafe/example/")
		await page.type("#developer-name", "John Pardo", { delay: 100 })
		await page.click("#remote-testing")
		await page.click("#tried-test-cafe")
		await page.type("#comments", "Esto es un comentario para la clase de testing", { delay: 100 })
		await page.click("#submit-button")
		await page.waitForSelector('#article-header')
		await page.waitForTimeout(3000)
		
		await browser.close()
	}, 40000)
})
