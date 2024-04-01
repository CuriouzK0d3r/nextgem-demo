from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
from pymed import PubMed

PORT = 8000

def search_pubmed(search_term, max_results, include_pubmed_id, include_title, include_abstract):
      pubmed = PubMed(tool="MyTool", email="aalamel@clemson.edu")
      results = pubmed.query(search_term, max_results=max_results)
      dois_list = []
      abstract_list = []
      medid_list = []
      med_list = []
      articles = []
      for article in results:
          article_dict = article.toDict()
          articles.append(article_dict)
          doi = article_dict["doi"]
          pubmed_id = ""
          if include_pubmed_id:
              pubmed_id = article_dict['pubmed_id'].partition('\n')[0]
          else:
              pubmed_id = ""
          if include_title:
              title = article_dict['title']
          else:
              title = ""
          if include_abstract:
              abstract = article_dict['abstract']
          else:
              abstract = ""
              
          # med_list.append(pubmed_id)
          abstract_list.append(abstract)

          # dois_list.append(doi)
          medid_list.append(pubmed_id)
          
      print(articles)          
      return articles
    

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
      search_pubmed(message, 100, True, True, True)
      
      response_body = "yeah"
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
