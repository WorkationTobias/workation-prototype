
import Head from 'next/head'

export default function Home() {
  return (
    <div className="p-8 bg-white min-h-screen font-sans">
      <Head>
        <title>Workation World</title>
      </Head>
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Workation World</h1>
      <p className="text-gray-700">Willkommen beim klickbaren Prototypen für deine Workation-Plattform!</p>
    </div>
  )
}
