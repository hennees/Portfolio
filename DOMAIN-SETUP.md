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

---

## Schritt 5: MTA-STS einrichten (Mail-TLS erzwingen)

Damit `https://mta-sts.henux.at/.well-known/mta-sts.txt` erreichbar ist:

1. In Vercel zusätzlich die Domain `mta-sts.henux.at` mit derselben Deployment verknüpfen.
2. Bei Hosttech einen CNAME setzen:

| Feld | Wert |
|------|------|
| Typ | `CNAME` |
| Host | `mta-sts` |
| Ziel | `cname.vercel-dns.com` |
| TTL | `3600` |

3. DNS TXT für Policy-Version ergänzen:

| Feld | Wert |
|------|------|
| Typ | `TXT` |
| Host | `_mta-sts` |
| Wert | `v=STSv1; id=20260410` |
| TTL | `3600` |

Die Datei `/.well-known/mta-sts.txt` liegt bereits im Repo und enthält `mode: enforce` + `max_age`.

---

## Schritt 6: DKIM & DMARC vervollständigen

### DKIM

DKIM hängt vom Mail-Provider ab (z. B. Microsoft 365, Google Workspace, Fastmail, etc.). Im DNS wird i. d. R. ein TXT-Record wie folgt angelegt:

| Feld | Wert (Beispiel) |
|------|------------------|
| Typ | `TXT` |
| Host | `selector1._domainkey` |
| Wert | `v=DKIM1; k=rsa; p=<PUBLIC_KEY_DES_PROVIDERS>` |

Verwende exakt Selector + Public Key aus deinem Mail-Provider.

### DMARC (inkl. Reporting)

Falls DMARC schon existiert, ergänze `rua=` für Reports:

| Feld | Wert (Beispiel) |
|------|------------------|
| Typ | `TXT` |
| Host | `_dmarc` |
| Wert | `v=DMARC1; p=quarantine; rua=mailto:dmarc@henux.at; fo=1; adkim=s; aspf=s` |

Hinweis: Für `rua` sollte ein funktionierendes Postfach existieren (z. B. `dmarc@henux.at`).
