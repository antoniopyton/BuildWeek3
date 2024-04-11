# ![Logo](https://media.discordapp.net/attachments/1206513267506282576/1226837086166843422/epicode_logo.png?ex=66263812&is=6613c312&hm=beccfb7a2f747f676277325184a4ebca36a7737173173b50643dae106aaed20f&=&format=webp&quality=lossless&width=240&height=50) PostManager  -  BuildWeek3



PostManager è un'applicazione web che consente agli utenti di visualizzare, creare, modificare, eliminare e mettere like post. Gli utenti non loggati possono solo visualizzare i post, mentre gli utenti autenticati hanno accesso completo alle funzionalità di creazione, modifica ed eliminazione. Da notare che l'utente loggato può modificare e cancellare solamente i post da lui creati.

## Prerequisiti

Assicurati di avere Node.js e npm installati sul tuo sistema.

## Installazione e utilizzo

1. Clonare il repository
2. Installare le dipendenze eseguendo `npm install`
3. Avviare l'applicazione eseguendo il comando `npm run fullstack`. Questo comando eseguirà `ng serve -o` e farà partire anche json-server-auth che metterà in osservazione il database locale **db.json**
4. Nel browser, naviga su `http://localhost:4200/` per visualizzare l'app in esecuzione e `http://localhost:4201/` per visualizzare gli endpoints del database.
5. Per creare un pacchetto di distribuzione, esegui il seguente comando: `ng build`. Il pacchetto di distribuzione verrà generato nella cartella `dist/`


## Funzionalità Principali

- **Visualizzazione dei Post**: Chiunque può tutti i post disponibili, che sia un utente loggato o meno.
- **Creazione di Post**: Gli utenti autenticati possono creare nuovi post inserendo titolo e contenuto.
- **Modifica dei Post**: Gli utenti autenticati possono modificare i propri post esistenti, aggiornando titolo e contenuto.
- **Eliminazione dei Post**: Gli utenti autenticati possono eliminare i propri post esistenti.
- **Commento ai Post**: Gli utenti autenticati possono anche commentare qualsiasi post.
- **Autenticazione Utente**: Gli utenti possono registrarsi e accedere per ottenere accesso completo alle funzionalità di gestione dei post, grazie a json-server-auth.

## Requisiti Tecnici

- **Linguaggio di Programmazione**:
  
   ![Logo](https://skillicons.dev/icons?i=html,ts,scss)

-  HTML5
- TypeScript
- SCSS

- **Framework**: È utilizzato **Angular** nella versione 16. 

  ![Logo](https://skillicons.dev/icons?i=angular)
- **Database**: I dati dei post e degli utenti sono memorizzati in **db.json**, database locale contenuto nella root
- **Autenticazione**: L'autenticazione degli utenti avviene utilizzando **JWT**


### Autori

- [**Antonio Copetti**](https://github.com/antoniopyton) 🎤
- [**Gabriele Scognamiglio**](https://github.com/GabScognamiglio) ✈️
- [**Fabio Scaramozzino**](https://github.com/Faffo96) 👽
- [**Kevin Loffredi**](https://github.com/Kevin-Lof) 🤡
- [**Massimiliano Dalla Mura**](https://github.com/MassimilianoDallaMura) 🐣
 