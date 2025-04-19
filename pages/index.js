import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <Head><title>Workation World</title></Head>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Workation World</h1>
      <div className="flex space-x-4 mb-6">
        <Link href="/"><button className="px-4 py-2 rounded-full border bg-blue-900 text-white">Dashboard</button></Link>
        <Link href="/destinationen"><button className="px-4 py-2 rounded-full border border-blue-900 text-blue-900">Destinationen</button></Link>
        <Link href="/admin"><button className="px-4 py-2 rounded-full border border-blue-900 text-blue-900">Admin</button></Link>
        <Link href="/antrag"><button className="px-4 py-2 rounded-full border border-blue-900 text-blue-900">Antrag</button></Link>
      </div>
      <p>Willkommen im Dashboard!</p>
    </div>
  )
}