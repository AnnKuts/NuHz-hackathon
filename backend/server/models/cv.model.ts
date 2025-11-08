import { Schema, model, Document } from 'mongoose';

export interface ICVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
  };
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate?: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }[];
  skills: string[];
  summary?: string;
}

export interface ICV extends Document {
  userId: Schema.Types.ObjectId;
  templateName: string;
  data: ICVData;
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const cvSchema = new Schema<ICV>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    templateName: { type: String, required: true },
    data: {
      personalInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: String,
        address: String,
      },
      education: [
        {
          institution: String,
          degree: String,
          startDate: String,
          endDate: String,
        },
      ],
      experience: [
        {
          company: String,
          position: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      skills: [String],
      summary: String,
    },
    pdfUrl: String,
  },
  { timestamps: true }
);


export const CV = model<ICV>('CV', cvSchema);