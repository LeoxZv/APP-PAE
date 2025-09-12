export function convertHtmlPdf(divElement) {
    const element = document.getElementById(divElement)

    const options = {
        filaname: 'reporte.pdf',
        image: { type: 'pdf', quality: 0.98 },
        html2canvas: { scale: 3 }
    }

    html2pdf().set(options).from(element).toPdf().get('pdf').then(
        function(pdf) {
            const newWindonw = window.open(pdf.output('bloburl'), '_blank') 
        }
    )
}