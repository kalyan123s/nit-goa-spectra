document.addEventListener('DOMContentLoaded', function () {
    const pdfPath = 'sample.pdf'; // Replace with the correct path to your PDF file
    const pdfContainer = document.getElementById('pdf-container');
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');

    let currentPage = 1;
    const fixedScale = 1.3; // Adjust the scale as needed

    // Function to render a specific page
    function renderPage(pageNum) {
        pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDocument) {
            pdfDocument.getPage(pageNum).then(function (page) {
                const viewport = page.getViewport({ scale: fixedScale });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render the PDF page to the canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext).promise.then(function () {
                    console.log(`Page ${pageNum} rendered to canvas successfully.`);
                }).catch(function (error) {
                    console.error(`Error rendering Page ${pageNum} of PDF:`, error);
                });
            }).catch(function (error) {
                console.error('Error getting page:', error);
            });
        }).catch(function (error) {
            console.error('Error loading PDF:', error);
        });
    }

    // Initial rendering of the first page
    renderPage(currentPage);

    // Button click event to go to the previous page
    prevPageBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    });

    // Button click event to go to the next page
    nextPageBtn.addEventListener('click', function () {
        pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDocument) {
            if (currentPage < pdfDocument.numPages) {
                currentPage++;
                renderPage(currentPage);
            }
        }).catch(function (error) {
            console.error('Error loading PDF:', error);
        });
    });
});
