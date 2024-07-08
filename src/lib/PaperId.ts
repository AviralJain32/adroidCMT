// import PaperIdModel from "@/model/PaperIdSchema"

// interface conferenceType{
//     conferenceAcronym:string,
// }
// export const generatePaperID=async({conferenceAcronym}:conferenceType)=>{
    
//     const paperIDdoc=PaperIdModel.findOne({conferenceAcronym})

//     if(!paperIDdoc){
//         const newUser=new PaperIdModel({
//             conferenceAcronym,
//             paperIdNumber:0
//         })
//         await newUser.save()

//         return `${conferenceAcronym}-0`
//     }

//     const paperNumber=paperIDdoc.paperIdNumber

//     const paperID=`${conferenceAcronym}-paperNumber`

    
// }


// import PaperIdModel from "@/model/PaperIdSchema";

// interface ConferenceType {
//     conferenceAcronym: string;
// }

// export const generatePaperID = async ({ conferenceAcronym }: ConferenceType) => {
//     const paperIDdoc = await PaperIdModel.findOne({ conferenceAcronym });

//     if (!paperIDdoc) {
//         const newPaperIdDoc = new PaperIdModel({
//             conferenceAcronym,
//             paperIdNumber: 0
//         });
//         await newPaperIdDoc.save();

//         return `${conferenceAcronym}-0`;
//     }

//     paperIDdoc.paperIdNumber += 1;
//     await paperIDdoc.save();

//     const paperNumber = paperIDdoc.paperIdNumber;

//     return `${conferenceAcronym}-${paperNumber}`;
// };

import PaperIdModel from "@/model/PaperIdSchema";


export const generatePaperID = async ( conferenceAcronym : string) => {
    const paperIDdoc = await PaperIdModel.findOneAndUpdate(
        { conferenceAcronym },
        { $inc: { paperIdNumber: 1 } },
        { new: true, upsert: true }
    );

    const paperNumber = paperIDdoc.paperIdNumber;

    return `${conferenceAcronym}-${paperNumber}`;
};
