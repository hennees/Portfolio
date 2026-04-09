# henux.at → Vercel verbinden

## Was du brauchst
- Hosttech DNS-Editor für `henux.at` (du bist bereits dort)
- Vercel A-Record IP: `76.76.21.21`

---

## Schritt 1: Bestehende A-Records löschen

Du hast aktuell diese A-Records die weg müssen:

| Host | IP | Aktion |
|------|----|--------|
| `henux.at` | `185.101.158.113` | **Löschen** |
| `*.henux.at` | `185.101.158.113` | **Löschen** |

Klicke jeweils auf **Löschen** rechts daneben.

---

## Schritt 2: Neuen A-Record für Vercel hinzufügen

Klicke oben auf **"Record hinzufügen"** und füge folgendes ein:

| Feld | Wert |
|------|------|
| Typ | `A` |
| Host | `@` |
| IP Adresse | `76.76.21.21` |
| TTL | `3600` (oder Standard) |

→ **Speichern**

---

## Schritt 3: www-Subdomain (optional aber empfohlen)

Nochmal **"Record hinzufügen"**:

| Feld | Wert |
|------|------|
| Typ | `CNAME` |
| Host | `www` |
| Ziel | `cname.vercel-dns.com` |
| TTL | `3600` |

→ **Speichern**

---

## Schritt 4: Speichern & warten

Klicke unten rechts auf den **"Speichern"**-Button (pinker Button).

DNS-Propagation dauert **15–60 Minuten**.

---

## Überprüfen

Nach ~30 Minuten im Terminal:

```bash
vercel domains inspect henux.at
```

Oder einfach `https://henux.at` im Browser aufrufen.

Vercel stellt automatisch ein **SSL-Zertifikat** aus — kein extra Setup nötig.
