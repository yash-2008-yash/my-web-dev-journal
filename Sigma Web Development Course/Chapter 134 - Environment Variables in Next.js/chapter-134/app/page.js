export default async function Home() {

  const res = await fetch(process.env.API_URL)
  const data = await res.json()

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      {data.map((user) => (
        <div key={user.id} className="mt-4">
          <h1>USERNAME: {user.name}</h1>
          <h1>EMAIL: {user.email}</h1>
        </div>
      ))}
    </div>
  );
}