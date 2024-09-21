import mongoose, { Schema, Document } from "mongoose";

// Interface for Paper document
export interface IPaper extends Document {
  paperAuthor: mongoose.Types.ObjectId[];
  correspondingAuthor:mongoose.Types.ObjectId[];
  paperTitle: string;
  paperFile: string;
  paperKeywords: string[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  conference: mongoose.Types.ObjectId;
  paperStatus: 'submitted' | 'accepted' | 'rejected' | 'review';
  paperID:string,
  // paperComment:string,
  // paperReview1:string,
  // paperReview2:string,
  // comment:string,
  paperCommentHistory: { comment: string; updatedAt: Date }[];
  paperReview1History: { review: string; updatedAt: Date }[];
  paperReview2History: { review: string; updatedAt: Date }[];
}

// Paper schema definition
const PaperSchema: Schema<IPaper> = new Schema({
    paperAuthor: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  correspondingAuthor:[{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
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
    enum: ['submitted', 'accepted', 'rejected','review'],
    default: 'submitted'
  },
  paperID:{
    type:String,
    required:true
  },
  // paperComment: {
  //   type: String
  // },
  paperCommentHistory: [
    {
      comment: String,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  // Array to store the history of paperReview1 with timestamps
  paperReview1History: [
    {
      review: String,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  // Array to store the history of paperReview2 with timestamps
  paperReview2History: [
    {
      review: String,
      updatedAt: { type: Date, default: Date.now },
    },
  ]
},{timestamps:true});

// Paper model
const PaperModel = (mongoose.models.Paper as mongoose.Model<IPaper>) || mongoose.model<IPaper>("Paper", PaperSchema);

export default PaperModel;
