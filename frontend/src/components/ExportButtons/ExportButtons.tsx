import React, { useState } from 'react';
import { CVExporter } from '../../utils/cvExport';
import type { ExportButtonsProps, ExportOptions } from '../../types/forms';
import { EXPORT_BUTTONS_CONFIG, EXPORT_MESSAGES } from '../../constants/exportButtons';
import './ExportButtons.scss';

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  previewRef,
  cvData,
  className = ''
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = async (format: ExportOptions['format']) => {
    if (!previewRef.current) {
      alert(EXPORT_MESSAGES.ELEMENT_NOT_FOUND);
      return;
    }

    setIsExporting(format);

    try {
      await CVExporter.exportCV(
        previewRef.current,
        cvData,
        { 
          format,
          filename: `cv-${cvData.name || 'резюме'}`.toLowerCase().replace(/\s+/g, '-')
        }
      );
    } catch (error) {
      console.error('Помилка експорту:', error);
      alert(`${EXPORT_MESSAGES.EXPORT_ERROR(format)} ${error instanceof Error ? error.message : EXPORT_MESSAGES.UNKNOWN_ERROR}`);
    } finally {
      setIsExporting(null);
    }
  };



  return (
    <div className={`export-buttons ${className}`}>
      <h3 className="export-buttons__title">{EXPORT_MESSAGES.TITLE}</h3>
      <div className="export-buttons__grid">
        {EXPORT_BUTTONS_CONFIG.map(({ format, label, description }) => (
          <button
            key={format}
            className={`export-button ${isExporting === format ? 'export-button--loading' : ''}`}
            onClick={() => handleExport(format)}
            disabled={isExporting !== null}
            title={description}
          >
            <span className="export-button__label">
              {isExporting === format ? EXPORT_MESSAGES.EXPORTING : label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};