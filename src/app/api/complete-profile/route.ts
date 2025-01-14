import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function GET(request:Request){
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const queryParams = {
  email: searchParams.get('email'),
  };
  if (!queryParams.email) {
    return Response.json(
      {
        success: false,
        message: "Email is required",
      },
      { status: 400 }
    );
  }
  const user=await UserModel.findOne({email:queryParams.email})

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "User not found. Please register first.",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Details fetched successfully.of a user",
      data:{email:user.email,fullname:user.fullname}
    },
    { status: 200 }
  );

}

export async function PATCH(request:Request) {
  await dbConnect();
  try {
    // Parse the request body
    const { email, contactNumber, affilation, country } = await request.json();

    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Email is required to complete the profile.",
        },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found. Please register first.",
        },
        { status: 404 }
      );
    }

    // Update the user's profile details
    user.contactNumber = contactNumber || user.contactNumber;
    user.affilation = affilation || user.affilation;
    user.country = country || user.country;

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Profile updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json(
      {
        success: false,
        message: "An error occurred while updating the profile.",
      },
      { status: 500 }
    );
  }
}
