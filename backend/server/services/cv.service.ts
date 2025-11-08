import { ICV, ICVData, CV } from '../models/cv.model';

export async function createCv(
  userId: string,
  templateName: string,
  data: ICVData
): Promise<ICV> {
  const newCv = new CV({ userId, templateName, data });
  return newCv.save();
}

export async function getCvById(cvId: string): Promise<ICV | null> {
  return CV.findById(cvId);
}

export async function getCvsByUser(userId: string): Promise<ICV[]> {
  return CV.find({ userId });
}

export async function updateCv(
  cvId: string,
  updates: Partial<ICV>
): Promise<ICV | null> {
  return CV.findByIdAndUpdate(cvId, updates, { new: true });
}

export async function deleteCv(cvId: string): Promise<ICV | null> {
  return CV.findByIdAndDelete(cvId);
}