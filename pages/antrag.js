
import { useState } from "react"
import Head from "next/head"
import Link from "next/link"

export default function Antrag() {
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    reiseziel: "",
    start: "",
    ende: "",
    arbeitstage: 0,
    typ: "workation",
    aufenthalt: "hotel",
    daten: "nicht_sensibel"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Antrag erfolgreich eingereicht! (Demo)")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white min-h-screen">
      <Head>
        <title>Workation Antrag</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Workation-Antrag</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Vorname</label>
          <input name="vorname" type="text" value={form.vorname} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Nachname</label>
          <input name="nachname" type="text" value={form.nachname} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Reiseziel</label>
          <input name="reiseziel" type="text" value={form.reiseziel} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Startdatum</label>
            <input name="start" type="date" value={form.start} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Enddatum</label>
            <input name="ende" type="date" value={form.ende} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Arbeitstage</label>
          <input name="arbeitstage" type="number" min="1" value={form.arbeitstage} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Art</label>
          <select name="typ" value={form.typ} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="workation">Workation</option>
            <option value="urlaub">Urlaub</option>
            <option value="beides">Workation & Urlaub</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Aufenthaltsort</label>
          <select name="aufenthalt" value={form.aufenthalt} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="hotel">Hotel / Resort</option>
            <option value="coworking">Coworking Space</option>
            <option value="beides">Beides</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Verarbeitete Daten</label>
          <select name="daten" value={form.daten} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="nicht_sensibel">Keine / nicht sensibel</option>
            <option value="sensibel">Sensible Daten (z.B. Gesundheit)</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">
          Antrag einreichen
        </button>
        <div className="mt-4">
          <Link href="/">
            <span className="text-blue-900 underline">Zurück zum Dashboard</span>
          </Link>
        </div>
      </form>
    </div>
  )
}
