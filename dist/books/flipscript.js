document.addEventListener('DOMContentLoaded', function () {
    const pdfViewerContainer = document.getElementById('pdf-viewer');

    if (!pdfViewerContainer) {
        console.error("PDF viewer container not found.");
        return;
    }

    const pdfPath = './dist/books/sample.pdf';

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    // Fetch the PDF document
    pdfjsLib.getDocument(pdfPath).then(function (pdfDocument) {
        // Loop through each page in the PDF
        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            // Create a container for each page
            const pageContainer = document.createElement('div');
            pageContainer.className = 'pdf-page';

            // Append the page container to the PDF viewer
            pdfViewerContainer.appendChild(pageContainer);

            // Render the page into the container
            pdfDocument.getPage(pageNum).then(function (page) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext).promise.then(function () {
                    // Append the canvas to the page container
                    pageContainer.appendChild(canvas);
                }).catch(function (error) {
                    console.error('Error rendering page:', error);
                });
            }).catch(function (error) {
                console.error('Error getting page:', error);
            });
        }
    }).catch(function (error) {
        console.error('Error loading PDF:', error);
    });
});
