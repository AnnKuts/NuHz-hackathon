import type { FormData } from "../types/cv";

export const createArrayUpdateHandler = <T extends keyof FormData>(
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  fieldName: T
) => {
  return (index: number, value: any) => {
    const array = [...(formData[fieldName] as any[])];
    array[index] = value;
    setFormData({
      ...formData,
      [fieldName]: array,
    });
  };
};

export const createArrayAddHandler = <T extends keyof FormData>(
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  fieldName: T,
  defaultValue: any,
  maxLength?: number
) => {
  return () => {
    const array = formData[fieldName] as any[];
    if (!maxLength || array.length < maxLength) {
      setFormData({
        ...formData,
        [fieldName]: [...array, defaultValue],
      });
    }
  };
};

export const createArrayRemoveHandler = <T extends keyof FormData>(
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  fieldName: T,
  minLength: number = 1
) => {
  return (index: number) => {
    const array = formData[fieldName] as any[];
    if (array.length > minLength) {
      const newArray = array.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        [fieldName]: newArray,
      });
    }
  };
};

export const createObjectInArrayUpdateHandler = <T extends keyof FormData, K extends string>(
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  fieldName: T
) => {
  return (index: number, objectField: K, value: string) => {
    const array = [...(formData[fieldName] as any[])];
    array[index] = { ...array[index], [objectField]: value };
    setFormData({
      ...formData,
      [fieldName]: array,
    });
  };
};

export const autoResizeTextarea = (element: HTMLTextAreaElement) => {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
};