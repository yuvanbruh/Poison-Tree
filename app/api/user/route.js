
// import connectMongoDB from "@/lib/mongodb"
import connectMongoDB from "@/app/lib/mongodb";
import Topic from "@/app/models/topic";
import { NextResponse } from "next/server";
import { connect } from "mongoose";
export async function POST(request){
    const {email,name } = await request.json()
    console.log("Received data:", { email, name }); 
    await connectMongoDB();
    const existingUser = await Topic.findOne({ email });
   if(existingUser){
    return NextResponse.json({message:"user exists",ok:true})
   } 
 const newTopic=   await Topic.create({email, name})
    return NextResponse.json({message:"Topic created "}, {status:201})
}
export async function GET(){
    await connectMongoDB()
    const topics = await Topic.find()
    return NextResponse.json({topics})
}
export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB();
    // await Topic.findByIdAndDelete(id)
    await Topic.deleteMany({})
    return NextResponse.json({message:"Topic deleted"},{status:200})
}
// export async function DELETE(request,{params}){
//     const id = params;
//     await connectMongoDB();
//     await Topic.findByIdAndDelete(id)
//     return NextResponse.json({message:"Topic deleted"},{status:200})
// }



