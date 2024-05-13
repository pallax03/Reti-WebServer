const data = [
    {
        "title": "Librerie",
        "code": [
            {"text": "|c5:import| |c2:sys|, |c2:signal|"},
            {"text": "|c5:import| |c2:http|.|c2:server|"},
            {"text": "|c5:import| |c2:socketserver|"}
        ],
        "description": "<p>Vengono importati i moduli:</p>"+
            "<ul>"+
                "<li><p><b class='c4'>sys</b> → è un modulo che gestisce l’ambiente a Runtime, lo utilizzo per terminare l’esecuzione del processo, in modo pulito.</p></li>"+
                "<li><p><b class='c4'>signal</b> → permette di gestire eventuali segnali, inviati dal processo o dal sistema operativo, lo utilizzo per intercettare la pressione di <b>‘Ctrl+C’</b>.</p></li>"+
                "<li><p><b class='c4'>http.server</b> → è un server http semplice e basico incluso nella libreria standard di Python, implementa la funzionalità di web server.</p></li>"+
                "<li><p><b class='c4'>socketserver</b> → fornisce un framework per la creazione di server, basati su socket Unix.</p></li>"+
            "</ul>"
    },
    {
        "title": "Configurazione globale del server",
        "code": [
            {"text": "|c1:HOST| = |c6:\"localhost\"|"},
            {"text": "|c1:PORT| = |c6:8080|"},
            {"text": "|c1:DIRECTORY| = |c6:\"./frontend\"|"}
        ],
        "description": "<p>Inizializzo le variabili che utilizzerò per impostare il server" +
                "con un determinato <b class='c1'>indirizzo IP</b>, in questo caso ho scelto " +
                "l’indirizzo ip <b class='c6'>localhost</b>, corrisponde infatti all’indirizzo" +
                "<b class='c6'>127.0.0.1</b>, viene automaticamente decifrato dal file hosts." +
                "L’ho impostato in ascolto nella porta <b class='c4'>8080</b>, " +
                "ma poteva essere anche scelta una qualsiasi porta, " +
                "dato che i pacchetti vengono identificati da <b class='c6'>HOST</b><b class='c0'>+</b><b class='c4'>PORTA</b></b>," +
                "è buona pratica però dare un numero di porta:" +
            "</p>" +
            "<ul>" +
            "    <li><p><b class='c4'>Porta 80</b> per  <b class='c6'>HTTP</b></p></li>" +
            "    <li><p><b class='c4'>Porta 443</b> per <b class='c6'>HTTPS</b></p></li>" +
            "    <li><p><b class='c4'>Porta 21</b> per  <b class='c6'>FTP</b></p></li>" +
            "    <li><p><b class='c4'>Porta 22</b> per  <b class='c6'>SSH</b></p></li>" +
            "    <li><p><b class='c4'>Porta 25</b> per  <b class='c6'>SMTP</b></p></li>" +
            "</ul>" +
            "<p>" +
            "    La <b class='c4'>porta 8080</b> è spesso utilizzata come alternativa alla porta 80 per il traffico HTTP. " +
            "    La variabile <b class='c5'>DIRECTORY</b> contiene il percorso assoluto della piccola porzione di File System " +
            "    <b class='c5'>che il server deve servire</b>, in essa è contenuto un semplice sito HTML + JavaScript + CSS." +
            "</p>"
    },
    {
        "title": "Creazione del gestore delle richieste",
        "code": [
            { "text": "|c1:class| |c2:SimpleHTTPHandler|(|c2:http.server.SimpleHTTPRequestHandler|):" },
            { "text": "|t|c1:def| |c3:__init__|(|c4:self|, *|c4:args|, **|c4:kwargs|):" },
            { "text": "|t|t|c2:super|().|c3:__init__|(*|c4:args|, |c4:directory|=|c1:DIRECTORY|, **|c4:kwargs|))" },
            { "text": "" },
            { "text": "|t|c1:def| |c3:do_GET|(|c4:self|)->|c1:None|:" },
            { "text": "|t|t|c5:return| |c2:super|().|c3:do_GET|()" }
        ],
        "description": "<p>Il modulo <b class='c1'>http.server</b> fornisce due gestori <b class='c5'>(handler)</b> per gestire le richieste http:</p>"+
            "<ul>"+
            "    <li><p><b class='c2'>SimpleHTTPRequestHandler</b> -> Questa classe fornisce solo la gestione delle uniche richieste <b class='c3'>‘do_GET()’</b>, utili solo ed esclusivamente per servire file statici.</p></li>"+
            "    <li><p><b class='c2'>BaseHTTPRequestHandler</b> -> Questa classe fornisce oltre alla <b class='c3'>‘do_GET()’</b>, presente nella Simple, ma anche altre richieste come la <b class='c3'>‘do_POST()’</b> o la <b class='c3'>‘do_HEAD()’</b>.</p></li>"+
            "</ul>"+
            "<p>"+
            "    Nel mio caso avevo bisogno di gestire solamente le richieste GET, per fornire file statici,"+
            "    per cui ho deciso di utilizzare la classe SimpleHTTPRequestHandler, nel mio caso ho creato"+
            "    la mia classe <b class='c2'>SimpleHTTPHandler</b> che <b class='c5'>eredita</b> la classe del modulo <b class='c1'>‘http.server.SimpleHTTPRequestHandler’</b>,"+
            "    , poiché necessito di configurare una precisa directory da serivere.</br>"+
            "    e ho modificato la funzione dunder <b class='c3'>‘__init__’</b>, che imposta la configurazione del gestore del server,"+
            "    e ho specificato la directory che ho dichiarato in <b class='c0'>Configurazione globale del server</b>."+
            "</p>"
    },
    {
        "title": "Creazione del server",
        "code": [
            { "text": "|c4:server| = |c2:socketserver.ThreadingTCPServer|((|c1:HOST|,|c1:PORT|), |c2:SimpleHTTPHandler|)" }
        ],
        "description": "<p>Crea un’istanza di un <b class='c6'>server TCP</b>,"+
            "    con l’host e la porta specificati e una classe handler utile per la gestione delle richieste del server."+
            "    La Classe <b class='c1'>ThreadingTCPServer</b> contenuta nel modulo <b class='c1'>socketserver</b> è una classe che crea un <b class='c3'>nuovo thread per ogni richiesta</b>,"+
            "    questo significa che il server è in grado di gestire più client simultaneamente."+
            "</p>"
    },
    {
        "title": "Impostazione delle proprietà del server",
        "code": [
            { "text": "|c4:server|.|c4:dademon_threads| = |c1:True|" },
            { "text": "|c4:server|.|c4:allow_reuse_address| = |c1:True|" }
        ],
        "description": "<p>Queste due <b class='c6'>impostazioni</b> consentono di:</p>"+
            "<ul>"+
            "    <li>"+
            "        <p><b class='c4'>daemon_threads</b>:"+
            "            imposta i thread del server come daemon threads,"+
            "            essi infatti non impediscono al programma principale"+
            "            di uscire se tutti gli altri thread non daemon sono terminati."+
            "        </p>"+
            "    </li>"+
            "    <li>"+
            "        <p><b class='c4'>Allow_reuse_address</b>: "+
            "            consente di riutilizzare un indirizzo che è già stato utilizzato in precedenza,"+
            "            con la presenza di questa impostazione se il server è stato appena riavviato "+
            "            <b class='c3'>non comparirà</b> un errore di <b class='c3'>‘Address already in use’</b>."+
            "        </p>"+
            "    </li>"+
            "</ul>"
    },
    {
        "title": "Gestione dei segnali per la corretta terminazione del server",
        "code": [
            { "text": "|c1:def| |c3:signal_handler|(|c4:signal|, |c4:frame|):" },
            { "text": "|t|c3:print|(|c6:\"Exiting http server (Ctrl+C pressed)\"|)" },
            { "text": "|t|c5:try|:" },
            { "text": "|t|t|c5:if| (|c4:server|):" },
            { "text": "|t|t|t|c4:server|.|c3:server_close|()" },
            { "text": "|t|c5:finally|:" },
            { "text": "|t|t||c2:sys|.|c3:exit|(0)" },
            { "text": "" },
            { "text": "|c2:signal|.|c3:signal|(|c2:signal|.|c4:SIGINT|, |c3:signal_handler|)" }
        ],
        "description": "<p>La funzione <b class='c3'>signal_handler</b> con l’utilizzo di un <b class='c5'>try/finally</b>,:"+
            "se esiste, termina il server e il processo dell’applicazione.:"+
            "Il modulo <b class='c1'>sys</b> poi si occuperà di richiamare la <b class='c3'>funzione</b> quando rileva il segnale <b class='c4'>‘signal.SIGINT’</b>,:"+
            "che corrisponde alla pressione di <b class='c6'>‘Ctrl+C’</b>.:"+
            "</p>"
    },
    {
        "title": "Avvio e chiusura del server",
        "code": [
            { "text": "|c5:try|:" },
            { "text": "|t|c5:while| |c1:True|:" },
            { "text": "|t|t|c3:print|(|c6:\"Starting server on http://{}:{}\"|.|c3:format|(|c1:HOST|, |c1:PORT|))" },
            { "text": "|t|t|c4:server|.|c3:serve_forever|()" },
            { "text": "|c5:except| |c2:KeyboardInterrupt|:" },
            { "text": "|t|c5:pass|" },
            { "text": "" },
            { "text": "|c4:server|.|c3:server_close|()" }
        ],
        "description": "<p>Avvio il server e lo faccio rimanere in esecuzione utilizzando un ciclo infinito,"+
            "gestisco la terminazione con l’istruzione <b class='c5'>try/catch</b>,"+
            "appena viene segnalato l’evento <b class='c2'>KeyboardInterrupt</b> <b class='c6'>interrompe</b> il ciclo infinito."+
            "È comunque necessario terminare il server, anche,"+
            "nei casi dove lo script esce dal <b class='c5'>‘while true’</b> che tiene attivo il server,"+
            "ma il segnale <b class='c3'>‘signal_handler’</b> non viene innescato. "+
            "</p>"
    }
];