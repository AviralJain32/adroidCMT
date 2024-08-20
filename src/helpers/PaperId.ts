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
