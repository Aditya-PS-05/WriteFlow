import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (content: string) => {
  try {
    // Create a temporary container for the content
    const container = document.createElement('div');
    container.innerHTML = content;
    document.body.appendChild(container);

    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL('image/png');

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      imgWidth * ratio,
      imgHeight * ratio
    );

    // Download PDF
    pdf.save('writeflow-document.pdf');

    // Clean up
    document.body.removeChild(container);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};