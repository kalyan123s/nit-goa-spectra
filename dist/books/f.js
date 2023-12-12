document.addEventListener('DOMContentLoaded', function () {
    const pdfPath = 'sample.pdf'; // Replace with the path to your PDF file
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');

    // Initialize PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    // Fetch PDF and render it to the canvas
    pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDocument) {
        // Load the first page of the PDF
        pdfDocument.getPage(1).then(function (page) {
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Render the PDF page to the canvas
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext).promise.then(function () {
                console.log('PDF rendered to canvas successfully.');
            }).catch(function (error) {
                console.error('Error rendering PDF:', error);
            });
        }).catch(function (error) {
            console.error('Error getting page:', error);
        });
    }).catch(function (error) {
        console.error('Error loading PDF:', error);
    });
});
