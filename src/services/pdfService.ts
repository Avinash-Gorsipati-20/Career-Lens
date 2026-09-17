import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const pdfService = {
  /**
   * Triggers native print dialog which retains vector fonts and print-friendly styles
   */
  printResume: () => {
    window.print();
  },

  /**
   * Generates crisp PDF document directly from element ID
   */
  downloadPdf: async (elementId: string, fileName: string = 'resume.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id ${elementId} not found.`);
      return false;
    }

    try {
      // Temporarily set high DPI scaling
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const contentRatio = canvas.height / canvas.width;
      const maxWidth = 297;
      const maxHeight = 420;
      const pageWidth = Math.min(maxWidth, Math.max(210, maxHeight / contentRatio));
      const pageHeight = Math.min(maxHeight, pageWidth * contentRatio);
      const pdf = new jsPDF(pageHeight >= pageWidth ? 'p' : 'l', 'mm', [pageWidth, pageHeight]);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const renderedHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageCount = Math.max(1, Math.ceil(renderedHeight / pdfHeight));
      for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, -pageIndex * pdfHeight, pdfWidth, renderedHeight);
      }
      pdf.save(fileName);
      return true;
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback to window print if canvas capture fails
      window.print();
      return false;
    }
  }
};
