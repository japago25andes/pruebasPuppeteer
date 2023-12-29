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

		await page.goto("https://www.udemy.com/", { waitUntil: "networkidle0" })
	}, 100000)

	//Pasa despues de cada prueba afterEach
	//Existe el afterAll = Despues de todos
	afterEach(async () => {
		await browser.close()
	})

	//--------------------------------------------------------------------------------------------------------------------------------

    //Acomoda la pantalla a la hoja y recorta su dimension original
	test("PDF de pantalla completa", async () => {
		let pdfCSS = []
		pdfCSS.push("<style>")
		pdfCSS.push("h1{ font-size:10px; margin-left:30px;}")
		pdfCSS.push("</style>")

		const css = pdfCSS.join("")

		await page.pdf({
			path: "./udemy.pdf",
			format: "A4",
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate: css + "<h1>" + "Mira El Script que realice PDF con pupeteer" + "</h1>",
			footerTemplate:
				css + '<h1> page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',

			margin: {
				top: "100px",
				botton: "200px",
				right: "30px",
				left: "30px",
			},
		})
	}, 3500000)

    //Adapta toda la pantalla a la hoja
    test('PDF de pantalla completa en modo landscape', async () => {

        let pdfCSS =[]
        pdfCSS.push('<style>')
        pdfCSS.push('h1{ font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({
            path:'./udemyLandscape.pdf',
            format:'A4',
            printBackground : true,
            displayHeaderFooter: true,
            headerTemplate: css + '<h2>' + 'Mira El Script que realice PDF con pupeteer' + '</h2>',
            footerTemplate: css + '<h2> page <span class="pageNumber"></span> of <span class="totalPages"></span></h2>',
            
            margin:{
                top:'100px',
                botton:'200px',
                right:'30px',
                left: '30px'

            },
            lanscape: true
        })
    }, 3500000)
})
