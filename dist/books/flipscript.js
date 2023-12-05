
    $(function () {
        const pdfPath = 'sample.pdf';

        $('#flipbook').turn({
            elevation: 50, // Adjust the 3D effect
            gradients: true, // Add gradients for a realistic look
            autoCenter: true, // Auto center the flip book
            duration: 1000 // Set the duration for page turn animation
        });

        PDFJS.getDocument(pdfPath).then(function (pdf) {
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
                        const pageElement = $('<div class="page">').html('<img src="' + canvas.toDataURL() + '">');
                        if (pageNum % 2 === 0) {
                            pageElement.addClass('even');
                        } else {
                            pageElement.addClass('odd');
                        }

                        $('#flipbook').turn('addPage', pageElement, pageNum);
                    });
                });
            }
        });
    });

