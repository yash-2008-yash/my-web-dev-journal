import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function URLPage({ params }) {
  const { url } = await params

  const client = await clientPromise
  const db = client.db("shawty")
  const collection = db.collection("url")

  const document = await collection.findOne({ keyword: url })
  if (document) {
    redirect(document.longURL)
  } else {
    redirect(`${process.env.NEXT_PUBLIC_HOST}`)
  }
}