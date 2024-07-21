const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

// TODO: Add actual Translate API
const translateText = async (text, targetLanguage) => {
  return `Translated text in ${targetLanguage}: This is a dummy translation of the text.\n\nOriginal text:\n${text}`;
};

const createPdfWithText = async (text) => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 750]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontSize = 12;
  const lineHeight = fontSize * 1.2;
  const margin = 50;
  const maxWidth = page.getWidth() - 2 * margin;
  const textLines = text.split('\n').map(line => line.trim());

  let yPosition = page.getHeight() - margin;

  textLines.forEach((line) => {
    const words = line.split(' ');
    let currentLine = '';

    words.forEach((word) => {
      const lineWithWord = currentLine ? `${currentLine} ${word}` : word;
      const { width } = font.widthOfTextAtSize(lineWithWord, fontSize);

      if (width <= maxWidth) {
        currentLine = lineWithWord;
      } else {
        if (yPosition - lineHeight < margin) {
          page = pdfDoc.addPage([600, 750]);
          yPosition = page.getHeight() - margin;
        }
        page.drawText(currentLine, { x: margin, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
        yPosition -= lineHeight;
        currentLine = word;
      }
    });

    if (currentLine) {
      if (yPosition - lineHeight < margin) {
        page = pdfDoc.addPage([600, 750]);
        yPosition = page.getHeight() - margin;
      }
      page.drawText(currentLine, { x: margin, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      yPosition -= lineHeight;
    }
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

exports.uploadPdf = async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(pdfBuffer);
    
    const translatedText = await translateText(pdfData.text, 'target-language');
    const newPdfBuffer = await createPdfWithText(translatedText);
    const outputPath = path.join(__dirname, '..', 'translated.pdf');
    fs.writeFileSync(outputPath, newPdfBuffer);
    
    res.download(outputPath, 'translated.pdf', (err) => {
      if (err) {
        console.log(err);
      }
      fs.unlinkSync(pdfPath);
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the PDF.');
  }
};
