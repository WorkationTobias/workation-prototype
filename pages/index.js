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
    steuerpflicht: false,
    bankkonto: false,
    tageVorher: 0,
    bestaetigung: false
  })
  const [submitted, setSubmitted] = useState(false)
  const [anfragen, setAnfragen] = useState([
    {
      land: "Kroatien",
      start: "10.09.2024",
      ende: "20.09.2024",
      arbeitstage: 9,
      risikobewertung: "In Bearbeitung",
      genehmigung: "Ausstehend",
      buchungscode: "ausstehend",
      dokumente: "ausstehend"
    },
    {
      land: "Spanien",
      start: "21.10.2024",
      ende: "05.11.2024",
      arbeitstage: 12,
      risikobewertung: "Kein Risiko",
      genehmigung: "Genehmigt",
      buchungscode: "WWES82631",
      dokumente: "hier downloaden"
    }
  ])

  const [destinationenDetails] = useState([
    {
      name: "Robinson Club",
      info: "Mehr als 400 Reiseziele",
      rabatt: "10% Nachlass nutzen",
      bild: "https://www.robinson.com/fileadmin/media/_processed_/b/f/csm_qr58_13610_Hauptpool_381a397ac3.jpg",
      detail: true,
      scoring: [4, 5, 5, 3, 5]
    },
    {
      name: "Wyndham Resorts",
      info: "Mehr als 300 Reiseziele",
      rabatt: "10% Nachlass nutzen",
      bild: "https://www.wyndhamhotels.com/content/dam/property-images/en-us/hr/au/others/torquay/16284/16284_pool%2014.jpg?downsize=700:*"
    },
    {
      name: "Valamar",
      info: "Poreč",
      rabatt: "10% Nachlass nutzen",
      bild: "https://multimedia.valamar.com/mediagallery-dxp-production/Objekti_Hvar_Amicor_V4_gallery_amicor-resort-pools-sport-airview.jpg"
    }
  ])

  const [selectedResort, setSelectedResort] = useState(null)

  const handleKachelClick = (resort) => {
    if (resort.detail) setSelectedResort(resort.name)
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <div className="text-xl font-bold">Workation World</div>
        <nav className="space-y-2">
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "antrag" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("antrag"); setSelectedResort(null); }}>Antrag stellen</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "meine-anfragen" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("meine-anfragen"); setSelectedResort(null); }}>Meine Anfragen</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "mein-profil" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("mein-profil"); setSelectedResort(null); }}>Mein Profil</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "policy" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("policy"); setSelectedResort(null); }}>Workation Policy</button>
          <div className="border-t border-gray-600 my-2"></div>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "destinationen" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("destinationen"); setSelectedResort(null); }}>Meine Workation-Destinationen</button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {selectedResort === "Robinson Club" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Robinson Club</h2>
            <img src="https://www.robinson.com/fileadmin/media/_processed_/b/f/csm_qr58_13610_Hauptpool_381a397ac3.jpg" className="w-full h-64 object-cover rounded mb-4" />
            <ul className="space-y-2 mb-4">
              <li>⭐ Infrastruktur und technische Ausstattung: 4 Sterne von 5 möglichen Sternen</li>
              <li>⭐ Unterkunft & Komfort: 5 Sterne von 5 möglichen Sternen</li>
              <li>⭐ Freizeit- und Erholungsangebote: 5 Sterne von 5 möglichen Sternen</li>
              <li>⭐ Nachhaltigkeit & Umweltbewusstsein: 3 Sterne von 5 möglichen Sternen</li>
              <li>⭐ Service & Betreuung: 5 Sterne von 5 möglichen Sternen</li>
            </ul>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded shadow w-fit">Diese Destination ist <strong>WORKATION READY</strong> zertifiziert</div>
          </div>
        ) : selectedResort == null && activeTab === "destinationen" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Workation-Destinationen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinationenDetails.map((d, i) => (
                <div key={i} onClick={() => handleKachelClick(d)} className="cursor-pointer bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
                  <img src={d.bild} alt={d.name} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{d.name}</h3>
                    <p className="text-sm text-gray-600">{d.info}</p>
                    <button className="mt-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">{d.rabatt}</button>
                    {d.scoring && (
                      <div className="mt-3 text-xs text-gray-600 space-y-1">
                        <div>⭐ Infrastruktur: {d.scoring[0]} Sterne von 5 möglichen Sternen</div>
                        <div>⭐ Komfort: {d.scoring[1]} Sterne von 5 möglichen Sternen</div>
                        <div>⭐ Freizeit: {d.scoring[2]} Sterne von 5 möglichen Sternen</div>
                        <div>⭐ Nachhaltigkeit: {d.scoring[3]} Sterne von 5 möglichen Sternen</div>
                        <div>⭐ Service: {d.scoring[4]} Sterne von 5 möglichen Sternen</div>
                        <div className="text-green-600 font-semibold pt-1">✅ WORKATION READY zertifiziert</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "antrag" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation-Antrag stellen</h2>
            <form className="space-y-4 max-w-lg">
              <div>
                <label className="block font-medium">Zielland</label>
                <select className="w-full border px-2 py-1" value={form.land} onChange={e => setForm({ ...form, land: e.target.value })}>
                  <option value="">Bitte wählen</option>
                  {[
                    "Kroatien", "Spanien", "Italien", "Portugal", "Griechenland", "Thailand", "Indonesien", "Mexiko",
                    "Frankreich", "Türkei", "Zypern", "Ägypten", "Sri Lanka", "Vietnam", "Marokko", "Brasilien",
                    "Kap Verde", "Dominikanische Republik", "Costa Rica", "Georgien", "Malta", "Montenegro", "Albanien", "Island",
                    "Norwegen", "Schweden", "Finnland", "Estland", "Lettland", "Litauen", "Polen", "Tschechien", "Ungarn"
                  ].map((l, i) => <option key={i} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium">Ankunft</label>
                <input type="date" className="w-full border px-2 py-1" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} />
              </div>
              <div>
                <label className="block font-medium">Abreise</label>
                <input type="date" className="w-full border px-2 py-1" value={form.ende} onChange={e => setForm({ ...form, ende: e.target.value })} />
              </div>
              <div>
                <label className="block font-medium">Wie viele Tage werden Sie arbeiten?</label>
                <input type="number" className="w-full border px-2 py-1" value={form.arbeitstage} onChange={e => setForm({ ...form, arbeitstage: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="block font-medium">Sind Sie im Zielland steuerpflichtig?</label>
                <label><input type="radio" name="steuer" value="ja" checked={form.steuerpflicht} onChange={() => setForm({ ...form, steuerpflicht: true })} /> Ja</label>
                <label className="ml-4"><input type="radio" name="steuer" value="nein" checked={!form.steuerpflicht} onChange={() => setForm({ ...form, steuerpflicht: false })} /> Nein</label>
              </div>
              <div>
                <label className="block font-medium">Haben Sie im Zielland ein Bankkonto?</label>
                <label><input type="radio" name="bank" value="ja" checked={form.bankkonto} onChange={() => setForm({ ...form, bankkonto: true })} /> Ja</label>
                <label className="ml-4"><input type="radio" name="bank" value="nein" checked={!form.bankkonto} onChange={() => setForm({ ...form, bankkonto: false })} /> Nein</label>
              </div>
              <div>
                <label className="block font-medium">Wie viele Tage haben Sie in den letzten 12 Monaten im Zielland verbracht?</label>
                <input type="number" className="w-full border px-2 py-1" value={form.tageVorher} onChange={e => setForm({ ...form, tageVorher: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label><input type="checkbox" checked={form.bestaetigung} onChange={e => setForm({ ...form, bestaetigung: e.target.checked })} /> Hiermit bestätige ich die Richtigkeit meiner Angaben</label>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Absenden</button>
            </form>
          </div>
        ) : activeTab === "meine-anfragen" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Anfragen</h2>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Zielland</th>
                  <th className="p-2">Zeitraum</th>
                  <th className="p-2">Arbeitstage</th>
                  <th className="p-2">Risiko</th>
                  <th className="p-2">Genehmigung</th>
                  <th className="p-2">Buchungscode</th>
                  <th className="p-2">Dokumente</th>
                </tr>
              </thead>
              <tbody>
                {anfragen.map((a, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{a.land}</td>
                    <td className="p-2">{a.start} – {a.ende}</td>
                    <td className="p-2">{a.arbeitstage}</td>
                    <td className="p-2">{a.risikobewertung}</td>
                    <td className="p-2">{a.genehmigung}</td>
                    <td className="p-2">{a.buchungscode}</td>
                    <td className="p-2">{a.dokumente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "mein-profil" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Mein Profil</h2>
            <p className="text-gray-600">Hier können Sie Ihre persönlichen Informationen bearbeiten. (Platzhalter – Eingabefelder folgen)</p>
          </div>
        ) : activeTab === "policy" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation Policy</h2>
            <p className="text-gray-600">Ihre Unternehmensrichtlinie erlaubt bis zu 183 Arbeitstage im Ausland pro Kalenderjahr.</p>
            <p className="text-sm mt-2">Enthaltene Länder: Aruba, Afghanistan, Angola uvm.</p>
            <p className="text-xs text-red-500 mt-2">Rot markierte Länder gelten als nicht empfohlen.</p>
            <p className="mt-4 text-sm">Betriebsvereinbarung: WorkFlex - Terms & Conditions</p>
            <p className="text-sm">Datenschutz im Ausland: Data Privacy & Security</p>
            <p className="text-sm">Krankenversicherung: Insurance Policy</p>
          </div>
        ) : null}
      </main>
    </div>
  )
}
