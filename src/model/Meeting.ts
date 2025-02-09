import mongoose from "mongoose";

interface IMeeting {
  meeting_conference_acronym: string;
  meeting_id: string;
  meeting_password:string;
  title: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  organizer_id: mongoose.Schema.Types.ObjectId;
  participants: {
    user_id: mongoose.Schema.Types.ObjectId;
    role: 'Organizer' | 'Speaker' | 'Attendee';
    joined_at?: Date;
  }[];
  room_id: string;
  join_link: string;
  status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';
  timezone: string;
  created_at: Date;
  updated_at: Date;
}

const meetingSchema = new mongoose.Schema({
  meeting_conference_acronym:{
    type:String,
    required:true
  },
  meeting_id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(), // Generates unique meeting ID
  },
  meeting_password:{
    type:String,
    required:true,
    unique:true,
    default: () => new mongoose.Types.ObjectId().toString(), // Generates unique meeting ID
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500, // Limit to avoid overly long descriptions
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
    validate: {
      validator: function (this: { start_time: Date }, value: Date) {
        return value > this.start_time;
      },
      message: 'End time must be greater than start time.',
    }    
  },
  organizer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a `User` schema
    required: true,
  },
  participants: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the `User` schema
      },
      role: {
        type: String,
        enum: ['Organizer', 'Speaker', 'Attendee'], // Define user roles in the meeting
        default: 'Attendee',
      },
      joined_at: {
        type: Date, // Record when the participant joined the meeting
      },
    },
  ],
  room_id: {
    type: String,
    required: true,
  },
  join_link: {
    type: String, // Generated meeting link
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  timezone: {
    type: String,
    required: true, // Ensure time zones are captured
    default: 'UTC',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const MeetingModel= (mongoose.models.Meeting as mongoose.Model<IMeeting>) || (mongoose.model<IMeeting>("Meeting",meetingSchema))

export default MeetingModel