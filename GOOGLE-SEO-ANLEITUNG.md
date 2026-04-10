# Google besser erkennen lassen — Anleitung für henux.at

Diese Anleitung zeigt dir Schritt für Schritt, was du **außerhalb des Codes** noch machen musst, damit deine Website in Google besser gefunden wird.

---

## 1) Google Search Console einrichten (Pflicht)

### 1.1 Property anlegen
1. Öffne: https://search.google.com/search-console
2. Klicke auf **Property hinzufügen**
3. Wähle **Domain** und trage ein: `henux.at`

### 1.2 Domain verifizieren (DNS)
1. Google zeigt dir einen **TXT-Record**.
2. Öffne deinen DNS-Provider (Hosttech).
3. Füge den TXT-Record genau so ein.
4. Zurück in Search Console: **Bestätigen**.

> Tipp: DNS-Verifikation kann einige Minuten dauern.

### 1.3 Sitemap einreichen
1. In Search Console links auf **Sitemaps**
2. Neue Sitemap einreichen: `https://henux.at/sitemap.xml`
3. Status prüfen, bis „Erfolgreich“ erscheint.

### 1.4 Wichtige Seiten indexieren
In **URL-Prüfung** nacheinander einfügen und „Indexierung beantragen“:
- `https://henux.at/en`
- `https://henux.at/de`
- `https://henux.at/es`
- `https://henux.at/de/imprint`
- `https://henux.at/de/privacy`

---

## 2) Google Business Profile (für lokale Sichtbarkeit in Graz)

1. Öffne: https://www.google.com/business/
2. Unternehmensprofil erstellen oder beanspruchen.
3. Vollständig ausfüllen:
   - Name
   - Kategorie (z. B. Webdesigner / Softwareentwickler)
   - Standort / Einzugsgebiet
   - Website: `https://henux.at`
   - Leistungen
   - Öffnungszeiten
   - Beschreibung mit Keywords (UI/UX, eHealth, Mobile Apps)
4. Verifizierung abschließen (Postkarte/Telefon/E-Mail je nach Google-Angebot).
5. Danach erste Bewertungen von echten Kunden einholen.

---

## 3) Content-Plan für Rankings

Erstelle für jede Kernleistung eine eigene Seite oder Case Study:
- UI/UX Design
- Mobile App Entwicklung
- eHealth Softwareentwicklung
- Webentwicklung / SaaS Dashboards

Pro Seite:
1. Ein Hauptkeyword
2. Klarer Seitentitel
3. 600–1200 Wörter nützlicher Inhalt
4. Interne Verlinkung auf Kontakt und relevante Projekte

---

## 4) Backlinks aufbauen (Qualität vor Menge)

Starte mit:
1. Partnern/Kooperationen (Projektseiten mit Link auf henux.at)
2. Hochschul-/Portfolio-Erwähnungen
3. Seriösen Branchenverzeichnissen
4. Gastbeiträgen oder Interviews

Ziel: regelmäßig neue, thematisch passende Links.

---

## 5) Monatliche Routine (wichtig)

Einmal pro Monat:
1. Search Console prüfen: Klicks, Impressionen, Suchbegriffe
2. Indexierungsfehler beheben
3. Seiten mit niedriger CTR optimieren (Title + Description)
4. 1–2 neue Inhalte veröffentlichen
5. 1–2 neue hochwertige Backlinks aufbauen

---

## Bereits technisch umgesetzt (im Code)

- Lokalisierte Meta-Daten (`en`, `de`, `es`)
- Canonical + hreflang-Alternates
- `robots.txt`
- `sitemap.xml`

Die Grundlage ist also da — jetzt entscheidet die konsequente Umsetzung der Punkte oben über bessere Google-Sichtbarkeit.
