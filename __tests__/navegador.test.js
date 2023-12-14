const puppeteer = require("puppeteer")

describe("Mi primer test en puppeteer", () => {
	it("Debe abrir y cerrar el navegador", async () => {
		const browser = await puppeteer.launch({
			headless: false, //que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
			defaultViewport: null, //modifica el ancho interno de la ventana para ajustarse al que se abre
		})
		const page = await browser.newPage()
		await page.goto("https://www.yahoo.com/")
		// await page.waitForTimeout(5000)
        await page.waitForSelector('img')
        
        
        //Instruccion que recarga la pagina
        await page.reload()
        await page.waitForSelector('img')
        
        //Navegar a otro sitio web
		await page.goto("https://www.eltiempo.com/")
        await page.waitForSelector('#header_new > div.nivel-logo > a')
        
        //Navegar hacia atras
        await page.goBack()
        await page.waitForSelector('img')
        
        //Navegar hacia adelante
        await page.goForward()
        
        //Abrir otra pagina
        const page2 = await browser.newPage()
        await page2.goto("https://www.caracoltv.com/")
		await page.waitForTimeout(5000)
		
        
        
        await browser.close()
	}, 40000)
})
