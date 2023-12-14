const puppeteer = require("puppeteer")

describe("Mi primer test en puppeteer", () => {
	it("Debe abrir y cerrar el navegador", async () => {
		const browser = await puppeteer.launch({
			headless: false,//que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
            slowMo: 1000, //camara lenta para que se pueda ver mejor la interacion con el navegador
            devtools: false, //abre por decir algo el inspeccionar del navegador
            //defaultViewport:{//cambia el tamaño de la pantalla interna
            //    width: 2100,
            //    height: 1080
            //},
            //args: ['--window-size=1920,1080']//modifica e tamaño de la pantallas o de la ventana para ser exactos
            // defaultViewport: null//modifica el ancho interno de la ventana para ajustarse al que se abre
		})
		const page = await browser.newPage()
		await page.goto("https://www.google.com")
		await page.waitForTimeout(5000)
		await browser.close()
	}, 30000)
})
