import Head from "next/head"
import { useEffect, useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("antrag")
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    land: "",
    start: "",
    ende: "",
    arbeitstage: 0,
    vertrag: false,
    familie: false,
    sensibel: [],
    steuerpflicht: false,
    bankkonto: false,
    tageVorher: 0,
    bestaetigung: false
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      if (name === "sensibel") {
        setForm((prev) => {
          const values = new Set(prev.sensibel)
          if (checked) values.add(value)
          else values.delete(value)
          return { ...prev, sensibel: Array.from(values) }
        })
      } else {
        setForm((prev) => ({ ...prev, [name]: checked }))
      }
    } else if (type === "radio") {
      const parsed = value === "true"
      setForm((prev) => ({ ...prev, [name]: parsed }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setActiveTab("meine-anfragen")
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Workation World</h1>
        <button onClick={() => setActiveTab("antrag-formular")} className="block w-full text-left">Antrag stellen</button>
        <button onClick={() => setActiveTab("meine-anfragen")} className="block w-full text-left">Meine Anfragen</button>
        <hr className="my-2 border-gray-300" />
        <button onClick={() => setActiveTab("profil")} className="block w-full text-left">Mein Profil</button>
        <button onClick={() => setActiveTab("policy")} className="block w-full text-left">Workation Policy</button>
        <hr className="my-4 border-gray-300" />
        <button onClick={() => setActiveTab("destinationen")} className="block w-full text-left">Meine Workation-Destinationen</button>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-end items-center space-x-4 mb-6">
          <select className="border px-2 py-1 rounded">
            <option>DE</option>
            <option>EN</option>
          </select>
          <div className="bg-blue-900 text-white px-3 py-1 rounded-full">TB – Tobias Benz</div>
        </div>

        {activeTab === "antrag-formular" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Workation-Antrag stellen</h2>
            {/* Reiseschritte hier anzeigen */}
            <form onSubmit={(e) => {
              e.preventDefault()
              if (step < 4) setStep(step + 1)
              else handleSubmit(e)
            }} className="space-y-4">
              {step === 1 && (
                <>
                  <label>Reiseziel: <input name="land" value={form.land} onChange={handleChange} className="w-full border p-2" /></label>
                  <label>Startdatum: <input type="date" name="start" value={form.start} onChange={handleChange} className="w-full border p-2" /></label>
                  <label>Enddatum: <input type="date" name="ende" value={form.ende} onChange={handleChange} className="w-full border p-2" /></label>
                  <label>Arbeitstage: <input type="number" name="arbeitstage" value={form.arbeitstage} onChange={handleChange} className="w-full border p-2" /></label>
                </>
              )}
              {step === 2 && (
                <>
                  <label><input type="radio" name="vertrag" value="true" onChange={handleChange} /> Verträge aushandeln</label>
                  <label><input type="radio" name="vertrag" value="false" onChange={handleChange} /> Keine Verträge</label>
                  <label><input type="radio" name="familie" value="true" onChange={handleChange} /> Familie vor Ort</label>
                  <label><input type="radio" name="familie" value="false" onChange={handleChange} /> Keine Familie</label>
                  <label>Datenarten:</label>
                  <label><input type="checkbox" name="sensibel" value="öffentlich" onChange={handleChange} /> Öffentliche</label>
                  <label><input type="checkbox" name="sensibel" value="persönlich" onChange={handleChange} /> Persönliche</label>
                  <label><input type="checkbox" name="sensibel" value="vertraulich" onChange={handleChange} /> Vertrauliche</label>
                </>
              )}
              {step === 3 && (
                <>
                  <label>Steuerpflicht in Zielland: <input type="radio" name="steuerpflicht" value="true" onChange={handleChange} /> Ja <input type="radio" name="steuerpflicht" value="false" onChange={handleChange} /> Nein</label>
                  <label>Bankkonto im Zielland: <input type="radio" name="bankkonto" value="true" onChange={handleChange} /> Ja <input type="radio" name="bankkonto" value="false" onChange={handleChange} /> Nein</label>
                  <label>Tage Aufenthalt vorher: <input type="number" name="tageVorher" value={form.tageVorher} onChange={handleChange} /></label>
                  <label><input type="checkbox" name="bestaetigung" checked={form.bestaetigung} onChange={handleChange} /> Ich bestätige die Angaben</label>
                </>
              )}
              {step === 4 && (
                <>
                  <h3>Zusammenfassung</h3>
                  <p><strong>Land:</strong> {form.land}</p>
                  <p><strong>Dauer:</strong> {form.start} bis {form.ende}</p>
                  <p><strong>Arbeitstage:</strong> {form.arbeitstage}</p>
                  <p><strong>Vertraglich tätig:</strong> {form.vertrag ? "Ja" : "Nein"}</p>
                  <p><strong>Familie vor Ort:</strong> {form.familie ? "Ja" : "Nein"}</p>
                  <p><strong>Daten-Sensibilität:</strong> {form.sensibel.join(", ")}</p>
                  <p><strong>Steuerpflicht:</strong> {form.steuerpflicht ? "Ja" : "Nein"}</p>
                  <p><strong>Bankkonto:</strong> {form.bankkonto ? "Ja" : "Nein"}</p>
                  <p><strong>Vorherige Aufenthaltstage:</strong> {form.tageVorher}</p>
                </>
              )}
              <button type="submit" className="btn">{step < 4 ? "Weiter" : "Absenden"}</button>
            </form>
          </div>
        )}

        {activeTab === "meine-anfragen" && submitted && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Meine Workation-Anfragen</h2>
            <div className="bg-white rounded shadow p-4">
              <p>Ihr Antrag auf Workation nach {form.land} vom {form.start} bis {form.ende} wurde eingereicht.</p>
              <div className="mt-4">
                <h3 className="font-semibold">Status</h3>
                <p className="text-yellow-600">In Bearbeitung</p>
                <h4 className="mt-4 font-semibold">Genehmigungen</h4>
                <ul className="space-y-2">
                  <li><strong>Manager-Genehmigung:</strong> <span className="text-yellow-600">Ausstehend</span></li>
                  <li><strong>HR-Genehmigung:</strong> <span className="text-yellow-600">Ausstehend</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
