from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
from pymed import PubMed
import json

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
        results = search_pubmed(message, 100, True, True, True)
        entries = []
        for result in results:
            pubmed_id = ""
            doi = ""
            if result["pubmed_id"]:
                pubmed_id = result["pubmed_id"].partition('\n')[0]
            if result["doi"]:
                doi = result["doi"].partition('\n')[0]
            
            entry = {"privacyLevel": "open", "pubmed_id": pubmed_id, "title" : result["title"], "abstract": result["abstract"], "keywords": result["keywords"], "publication_date": str(result["publication_date"]), "authors": result["authors"], "doi": doi}
            entries.append(entry)
        json_object = json.dumps(entries, indent = 4) 

        response_body = json_object
    else:
      response_body = "No message received in the query parameter."

    # Set response headers and send the response
    self.send_response(200)
    self.send_header("Content-type", "text/javascript")
    self.end_headers()
    self.wfile.write(response_body.encode("utf-8"))

with HTTPServer(("", PORT), Handler) as server:
  print(f"Server listening on port {PORT}")
  server.serve_forever()
