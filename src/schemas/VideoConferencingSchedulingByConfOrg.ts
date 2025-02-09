import moment from 'moment';
import { z } from 'zod';

export const MeetSchedulingSchema = z.object({
    title: z.string().min(6, 'title should be minimum of 6 digits'),
    password:z.string().min(6,'password should be minimum of 6 digits'),
    description:z.string().max(1000,"description should be of maximum 1000 words"),
    start_time: z.string().transform(date => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        return formattedDate;
    }),
    end_time: z.string().transform(date => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        return formattedDate;
    }),
    timezone:z.string().min(3,"timezone should be minimum of 3 digit"),

})
.refine(
    data => {
      console.log('in the refine');
      const { start_time,end_time } = data;
      return (
        moment(start_time).isAfter(moment()) &&
        moment(start_time).isBefore(end_time)
      );
    },
    {
      message:
        'Start time must be of the future or it must be earlier then the end time',
      path: ['start_time'],
    },
  )