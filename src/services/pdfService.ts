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
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const canvasX = (pdfWidth - imgWidth * ratio) / 2;
      const canvasY = 0;

      pdf.addImage(imgData, 'JPEG', canvasX, canvasY, imgWidth * ratio, imgHeight * ratio);
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
