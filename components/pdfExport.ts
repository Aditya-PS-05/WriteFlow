import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (content: string) => {
  try {
    // Create a temporary container for the content
    const container = document.createElement('div');
    container.innerHTML = content;
    container.style.width = '595px'; // A4 width in pixels
    container.style.padding = '40px';
    container.style.boxSizing = 'border-box';
    document.body.appendChild(container);

    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL('image/png');

    // Create PDF (A4 format)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * 595) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, 595, imgHeight);
    heightLeft -= pageHeight;

    // Add pages if content overflows
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, 595, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download PDF
    pdf.save('writeflow-document.pdf');

    // Clean up
    document.body.removeChild(container);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};