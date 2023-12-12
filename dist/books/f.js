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
});
