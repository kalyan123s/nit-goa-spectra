document.addEventListener('DOMContentLoaded', function () {

    const pdfPath = 'sample.pdf'; // Replace with the path to your PDF file
    const flipbookContainer = document.getElementById('flipbook');

    // Initialize flip book
    $(flipbookContainer).turn();

    // Initialize PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    // Fetch PDF and convert it to flip book pages
    pdfjsLib.getDocument(pdfPath).then(function (pdf) {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(function (page) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const viewport = page.getViewport({ scale: 1.5 });

                canvas.height = viewport.height;
                canvas.width = viewport.width;


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

                    const pageElement = $('<div class="pdf-page">').html('<img src="' + canvas.toDataURL() + '">');
                    if (pageNum % 2 === 0) {
                        pageElement.addClass('even');
                    } else {
                        pageElement.addClass('odd');
                    }

                    $(flipbookContainer).turn('addPage', pageElement);
                });
            });
        }
    });

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
