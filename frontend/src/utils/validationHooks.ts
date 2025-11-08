import { useState, useEffect } from 'react';
import type { FormData } from '../types/cv';
import { validateCV, type ValidationResult } from './validation';

export const useValidation = (formData: FormData) => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: []
  });

  // Валидация при изменении данных (с задержкой)
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = validateCV(formData);
      setValidationResult(result);
    }, 300); // Задержка 300мс чтобы не валидировать при каждом символе

    return () => clearTimeout(timer);
  }, [formData]);

  // Получить ошибку для конкретного поля
  const getFieldError = (fieldName: string): string | undefined => {
    const error = validationResult.errors.find(err => err.field === fieldName);
    return error?.message;
  };

  // Проверить, есть ли ошибка в поле
  const hasFieldError = (fieldName: string): boolean => {
    return validationResult.errors.some(err => err.field === fieldName);
  };

  // Валидировать только конкретное поле
  const validateField = (fieldName: string): boolean => {
    const result = validateCV(formData);
    const fieldHasError = result.errors.some(err => err.field === fieldName);
    return !fieldHasError;
  };

  return {
    isValid: validationResult.isValid,
    errors: validationResult.errors,
    getFieldError,
    hasFieldError,
    validateField
  };
};