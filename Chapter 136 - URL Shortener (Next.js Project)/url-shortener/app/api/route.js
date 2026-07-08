import clientPromise from "@/lib/mongodb"

export async function POST(request) {

  const body = await request.json()
  const client = await clientPromise
  const db = client.db("shawty")
  const collection = db.collection("url")

  // Check if the short URL already exists or not
  const document = await collection.findOne({ keyword: body.keyword })
  if (document) {
    return Response.json({ success: false, message: "URL already exists!" })
  }

  const result = await collection.insertOne({
    longURL: body.longURL,
    keyword: body.keyword
  })

  return Response.json(
    {
      success: true,
      message: "URL generated successfully!",
      keyword: body.keyword
    }
  )
}