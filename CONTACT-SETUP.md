# Kontaktformular — Setup-Plan

## Status

Das Formular ist **UI-fertig** (2-Step-Flow, Animationen, i18n), aber sendet **keine echten E-Mails**.
Grund: `NEXT_PUBLIC_WEB3FORMS_KEY` fehlt in `.env.local`.

---

## Was aktuell passiert

```
if (!accessKey) {
  setTimeout(() => { setSending(false); setSubmitted(true); }, 1200);
  return; // ← sendet nichts, täuscht nur Erfolg vor
}
```

---

## To-Do (in Reihenfolge)

### 1. Web3Forms API-Key holen

- Gehe auf [web3forms.com](https://web3forms.com)
- Klicke **"Create your Access Key"**
- E-Mail eingeben (die, auf der Anfragen ankommen sollen)
- Key per E-Mail erhalten / direkt im Dashboard kopieren
- Kostenlos bis 250 Submissions/Monat

### 2. `.env.local` setzen

Datei aktuell enthält nur `o` — ersetzen mit:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=dein_key_hier
```

### 3. Vercel Environment Variable setzen

```bash
vercel env add NEXT_PUBLIC_WEB3FORMS_KEY
```

Oder im Vercel Dashboard:
**Project → Settings → Environment Variables → Add**
- Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Value: dein Key
- Environments: ✅ Production, ✅ Preview, ✅ Development

### 4. E-Mail-Inkonsistenz beheben

In `messages/de.json` (Zeile 158) und `messages/en.json` steht in der Fehlermeldung:

```json
"error": "Etwas ist schiefgelaufen. Schreib mir direkt an hello@henux.at"
```

Aber auf der Kontaktseite (`Contact.tsx:232`) steht `patrick.hennes27@icloud.com`.

**Entscheidung nötig:** Welche E-Mail soll die offizielle sein?
- Option A: `hello@henux.at` (professionell, zur Marke passend)
- Option B: `patrick.hennes27@icloud.com` (aktuell überall verlinkt)

Beide Dateien + `Contact.tsx:232` danach auf eine Adresse vereinheitlichen.

### 5. Lokal testen

```bash
npm run dev
# Formular ausfüllen + abschicken
# → E-Mail im Web3Forms-Dashboard prüfen
# → E-Mail in Posteingang prüfen
```

### 6. Deploy + Production-Test

```bash
vercel --prod
# Live-Formular einmal abschicken → Bestätigung prüfen
```

---

## Optional (Nice-to-have)

- **Spam-Schutz:** Web3Forms hat eingebauten CAPTCHA-Support (optional via `?captcha=1`)
- **Betreff anpassen:** Hidden input `name="subject"` hinzufügen, z. B. `Neue Anfrage von {name}`
- **E-Mail-Weiterleitung:** Im Web3Forms-Dashboard kann eine zweite Empfänger-E-Mail konfiguriert werden

---

## Zusammenfassung

| Schritt | Was | Aufwand |
|---------|-----|---------|
| 1 | Web3Forms-Key holen | 2 min |
| 2 | `.env.local` korrigieren | 30 sek |
| 3 | Vercel env var setzen | 2 min |
| 4 | E-Mail vereinheitlichen | 5 min |
| 5–6 | Testen | 5 min |
