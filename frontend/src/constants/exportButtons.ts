import type { ExportButtonConfig } from '../types/forms';

export const EXPORT_BUTTONS_CONFIG: ExportButtonConfig[] = [
  {
    format: 'pdf',
    label: 'PDF',
    description: 'Export in PDF format'
  },
  {
    format: 'png',
    label: 'PNG',
    description: 'Export as image'
  },
  {
    format: 'json',
    label: 'JSON',
    description: 'Export structured data'
  }
];

export const EXPORT_MESSAGES = {
  ELEMENT_NOT_FOUND: 'Cannot find the element to export',
  EXPORT_ERROR: (format: string) => `Export error in ${format.toUpperCase()}:`,
  UNKNOWN_ERROR: 'Unknown error',
  EXPORTING: 'Exporting...',
  TITLE: 'Download CV'
} as const;