'''
    alex.mazzoni3@studio.unibo.it
    matricola: 0001077417

    Traccia 2 - Web Server Semplice
    Creare un web server semplice in Python che possa servire file statici (come HTML, CSS, immagini)
    e gestire richieste HTTP GET di base. Il server deve essere in grado di gestire più richieste
    simultaneamente e restituire risposte appropriate ai client.
'''
import sys, signal
import http.server
import socketserver

HOST = "localhost"
PORT = 8080
DIRECTORY = './frontend'

class SimpleHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self) -> None:
       return super().do_GET()

server = socketserver.ThreadingTCPServer((HOST,PORT), SimpleHTTPHandler)

server.daemon_threads = True
server.allow_reuse_address = True

def signal_handler(signal, frame):
  print( 'Exiting http server (Ctrl+C pressed)')
  try:
    if( server ):
      server.server_close()
  finally:
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

try:
  while True:
    print("Starting server on http://{}:{}".format(HOST, PORT))
    server.serve_forever()
except KeyboardInterrupt:
  pass

server.server_close()