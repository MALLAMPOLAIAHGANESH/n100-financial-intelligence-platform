import http.server
import socketserver
import os
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).resolve().parent

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving HTTP on port {PORT} (http://localhost:{PORT}/)...")
        httpd.serve_forever()
