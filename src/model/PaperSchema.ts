import mongoose, { Schema, Document } from "mongoose";

// Interface for Paper document
export interface IPaper extends Document {
  paperAuthor: mongoose.Types.ObjectId;
  paperTitle: string;
  paperFile: string;
  paperKeywords: string[];
  paperKeyphrases: string[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  conference: mongoose.Types.ObjectId;
  paperStatus: 'submitted' | 'accepted' | 'rejected';
}

// Paper schema definition
const PaperSchema: Schema<IPaper> = new Schema({
    paperAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  paperTitle: {
    type: String,
    required: true,
  },
  paperFile: {
    type: String, // cloudinary url
    required: true
  },
  paperKeywords: {
    type: [String],
    required: true
  },
  paperKeyphrases: {
    type: [String],
    required: true
  },
  paperAbstract: {
    type: String,
    required: true
  },
  paperSubmissionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  conference: {
    type: Schema.Types.ObjectId,
    ref: "Conference",
    required: true
  },
  paperStatus: {
    type: String,
    enum: ['submitted', 'accepted', 'rejected'],
    default: 'submitted'
  }
});

// Paper model
const PaperModel = (mongoose.models.Paper as mongoose.Model<IPaper>) || mongoose.model<IPaper>("Paper", PaperSchema);

export default PaperModel;
