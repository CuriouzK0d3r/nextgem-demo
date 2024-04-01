from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

PORT = 8000

class Handler(BaseHTTPRequestHandler):

  def do_GET(self):
    # Parse the URL path
    parsed_url = urllib.parse.urlparse(self.path)
    # Extract the query parameter (if any)
    query_dict = urllib.parse.parse_qs(parsed_url.query)
    # Get the value of the parameter named "message" (or None if not present)
    message = query_dict.get("message", [None])[0]

    # Construct the response body
    if message:
      response_body = f"Hello, you sent the message: {message}"
    else:
      response_body = "No message received in the query parameter."

    # Set response headers and send the response
    self.send_response(200)
    self.send_header("Content-type", "text/html")
    self.end_headers()
    self.wfile.write(response_body.encode("utf-8"))

with HTTPServer(("", PORT), Handler) as server:
  print(f"Server listening on port {PORT}")
  server.serve_forever()
