import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import type { FormData } from '../types/cv';
import type { ExportOptions } from '../types/forms';


export class CVExporter {
  private static async captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
    return html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });
  }

  static async exportToPDF(element: HTMLElement, filename: string = 'cv'): Promise<void> {
    try {
      const canvas = await this.captureElement(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Export error in PDF:', error);
      throw new Error('Failed to export CV as PDF');
    }
  }

  static async exportToPNG(element: HTMLElement, filename: string = 'cv'): Promise<void> {
    try {
      const canvas = await this.captureElement(element);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${filename}.png`);
        }
      });
    } catch (error) {
      console.error('Export error in PNG:', error);
      throw new Error('Failed to export CV as PNG');
    }
  }

  static exportToJSON(data: FormData, filename: string = 'cv'): void {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      saveAs(blob, `${filename}.json`);
    } catch (error) {
      console.error('Export error in JSON:', error);
      throw new Error('Failed to export CV as JSON');
    }
  }

  static async exportCV(
    element: HTMLElement,
    data: FormData,
    options: ExportOptions
  ): Promise<void> {
    const filename = options.filename || 'my-cv';

    switch (options.format) {
      case 'pdf':
        await this.exportToPDF(element, filename);
        break;
      case 'png':
        await this.exportToPNG(element, filename);
        break;
      case 'json':
        this.exportToJSON(data, filename);
        break;
      default:
        throw new Error(`Unsupported format: ${options.format}`);
    }

    this.saveExportToStorage(options.format, filename, data.name);
  }

  private static saveExportToStorage(format: string, filename: string, userName: string): void {
    try {
      const existingExports = JSON.parse(localStorage.getItem('cv_exports') || '[]');
      const exportRecord = {
        id: Date.now().toString(),
        format,
        filename,
        userName: userName || 'Anonymous',
        timestamp: Date.now(),
        date: new Date().toLocaleDateString()
      };
      
      const updatedExports = [...existingExports, exportRecord];
      localStorage.setItem('cv_exports', JSON.stringify(updatedExports));
    } catch (error) {
      console.warn('Failed to save export record to localStorage:', error);
    }
  }
}