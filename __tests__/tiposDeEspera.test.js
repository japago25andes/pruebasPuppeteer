const puppeteer = require("puppeteer")

describe("Tipos de espera", () => {
	it("Mostrar todos los diferentes tios de espera", async () => {
		const browser = await puppeteer.launch({
			headless: false, //que se abra o no el navedagor en mi pantalla (ginete sin cabeza). headless: false abre el navegador
			defaultViewport: null, //modifica el ancho interno de la ventana para ajustarse al que se abre

		})
		const page = await browser.newPage()
        await page.goto("https://www.yahoo.com/", {waitUntil: 'networkidle0'})

		//Espera explicita
		await page.waitForTimeout(500)
        
		//Espera por un  css selector
		await page.waitForSelector("#ybar-logo > img._yb_2qzib._yb_iun8j")
        
		//Espera por un xpath
		await page.waitForXPath('//*[@id="ybar-logo"]/img[1]')
        
		//Otra pagina
		await page.goto("https://demoqa.com/modal-dialogs", { waitUntil: "networkidle0" })
		//Valida ademas que el Dom aparezca el selector tambien que sea 100% visible, tambien se puede 
        //cambiar la propiedad de "visible" por "hidden" para validar que este en el DOM pero que no sea visible
		const button = await page.waitForSelector("#showSmallModal", { visible: true })
		//await page.waitForSelector('//*[@id="showSmallModal"]', { visible: true })
        await button.click()
		await page.waitForTimeout(500)
        
        
        //Espera por funcion
        //Se toma el selector y se revisa que en el selector aparezca el texto que se envia como argumento
		await page.waitForFunction(() => document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')
        
        //Ejemplo para observar el viewport
        const observaResize = page.waitForFunction('window.innerWidth < 100')
        await page.setViewport({width:50, height:50})
        await observaResize  
        
        //Se cierra la ventana emergente y seguidose valida con negacion que ya no este presente
        await page.click('#closeSmallModal')
		await page.waitForFunction(() => !document.querySelector('#example-modal-sizes-title-sm'))
        


		await browser.close()
	}, 40000)
})
