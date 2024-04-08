from rich.table import Table

import json
import typer
from rich.console import Console
import os
from rich import print
from rich.console import Console
import pymongo
import asyncio
from playwright.async_api import async_playwright
import gradio as gr
from pymed import PubMed
from Bio.Entrez import efetch, read
from crossref.restful import Works
from time import sleep
from rich.progress import Progress
from rich.progress import track

class Crawlers:
    def __init__(self):
        self.client = pymongo.MongoClient("mongodb+srv://nextgem.prxatax.mongodb.net/?retryWrites=true&w=majority", username="kornilak", password="testpassdelete")
        # Get the users collection
        self.db = self.client["risk_assesment"]["pub_metadata"]
    
    def search(self, query: str, field: str):
        if field == "title":
            results = self.db.find({"title": {"$regex": query}})
        elif field == "author":
            results = self.db.find({"author.given": {"$regex": query}})
        elif field == "abstract":
            results = self.db.find({"abstract": {"$regex": query}})
        elif field == "source":
            results = self.db.find({"source": {"$regex": query}})
        elif field == "doi":
            results = self.db.find({"DOI": {"$regex": query}})
        elif field == "subject":
            results = self.db.find({"subject.": {"$regex": query}})
        else:
            return None
        return results
    
    def downloadMetadata(self, doisList=[], pubmedList=[], source="", abstract_list=[], meta_list=[], wosid_list=[], urlMap={}):
        works = Works()
        
        with Progress() as progress:
            task1 = progress.add_task(":file_folder:  [cyan]Downloading metadata...     ", total=(len(doisList) + len(pubmedList)))
            with open('test-ra.json', 'a') as the_file:
                for i in range(len(doisList)):
                    if doisList[i] is None:
                        progress.update(task1, advance=1)
                        continue

                    try:
                        db_entry = self.db.find_one({"DOI": {"$regex": doisList[i]}})
                        if db_entry is not None:
                            progress.update(task1, advance=1)
                            continue
                        metadata = works.doi(doisList[i])
                        if metadata is None:
                            continue
                        
                        if "title" not in metadata or len(metadata["title"]) == 0:
                            continue
                        if "abstract" not in metadata or len(metadata["abstract"]) == 0:
                            if len(abstract_list[i]) > 0:
                                metadata["abstract"] = abstract_list[i]
                                
                        if len(wosid_list) > 0:
                            metadata["source_url"] = "https://www.webofscience.com/wos/woscc/full-record/" + wosid_list[i]
                            
                        if doisList[i] in urlMap:
                            metadata["source_url"] = urlMap[doisList[i]]

                        metadata["title"] = metadata["title"][0]
                        metadata["source"] = source
                        self.db.insert_one(metadata)
                        # print(json.dumps(metadata, default=str))
                        the_file.write(json.dumps(metadata, default=str))
                        the_file.write("\n")
                        progress.update(task1, advance=1)
                        sleep(3)
                    except Exception as e:
                        progress.update(task1, advance=1)
                        continue

                for i in range(len(pubmedList)):
                    try:
                        handle = efetch(db='pubmed', id=pubmedList[i], rettype="Abstract", retmode='xml', email="aalamel@clemson.edu")
                        pubr = read(handle)
                        metadata = {}

                        metadata["title"] = pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["ArticleTitle"]
                        metadata["author"] = pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["AuthorList"]
                        if "Abstract" in pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]:
                            metadata["abstract"] = str(pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["Abstract"]["AbstractText"])
                            abstract = ' '.join([str(part) for part in metadata["abstract"]])
                            metadata["abstract"] = abstract
                        if len(pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["ELocationID"]) > 0:
                            metadata["doi"] = pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["ELocationID"]
                        else:
                            metadata["doi"] = ""
                        
                        metadata["pubmed_id"] = pubr["PubmedArticle"][0]["MedlineCitation"]["PMID"]
                        metadata["journal"] = pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["Journal"]["Title"]
                        metadata["year"] = pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["Journal"]["JournalIssue"]["PubDate"]["Year"]
                        if "Day" in pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["Journal"]["JournalIssue"]["PubDate"]:
                            metadata["day"] = pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["Journal"]["JournalIssue"]["PubDate"]["Day"]
                        if "Month" in pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["Journal"]["JournalIssue"]["PubDate"]:
                            metadata["month"] = pubr["PubmedArticle"][0]["MedlineCitation"]["Article"]["Journal"]["JournalIssue"]["PubDate"]["Month"]
                        
                        metadata["source"] = source
                        if pubmedList[i] in urlMap:
                            metadata["source_url"] = urlMap[pubmedList[i]]
                        else:
                            metadata["source_url"] = "https://pubmed.ncbi.nlm.nih.gov/" + pubmedList[i]
                        self.db.insert_one(metadata)

                        the_file.write(json.dumps(metadata, default=str))
                        the_file.write("\n")
                        progress.update(task1, advance=1)
                        sleep(3)
                    except Exception as e:
                        progress.update(task1, advance=1)
                        continue
                    
                progress.update(task1, advance=1)

        print("\n[green]Thanks for using the Risk Assessment CLI![/green] :smile:")
    
    def crawl(self, portal: str, query: str, query_file: str):
        if portal == "all":
            print(":spider_web:  [green]We will now crawl EMF Portal...[/green]")
            asyncio.get_event_loop().run_until_complete(self.crawl_emf())
            print(":spider_web:  [green]We will now crawl PubMed...[/green] ")
            self.crawl_pubmed(query, query_file)
            print(":spider_web:  [green]We will now crawl Web of Science...[/green] ")
            asyncio.get_event_loop().run_until_complete(self.crawl_wos(query, query_file))
        elif portal == "emf":
            print(":spider_web:  [green]We will now crawl EMF Portal...[/green]")
            asyncio.get_event_loop().run_until_complete(self.crawl_emf())
        elif portal == "pubmed":
            print(":spider_web:  [green]We will now crawl PubMed...[/green] ")
            self.crawl_pubmed(query, query_file)
        elif portal == "wos":
            print(":spider_web:  [green]We will now crawl Web of Science...[/green]")
            asyncio.get_event_loop().run_until_complete(self.crawl_wos(query, query_file))
        else:
            print("[red]Unknown portal. Choose one from ([dark_orange3]all, emf, wos, pubmed[/dark_orange3])[/red].")
    
    def crawl_pubmed(self, query = "", query_file = ""):
        if query_file != "":
            with open(query_file, "r") as f:
                seed_questions = f.readlines()
        elif query != "":
            seed_questions = [query]
        else:
            seed_questions = [
                "children + mobile + radiation",
                # "children + mobile + radiation + cancer",
                # "mobile + radiation + tumor",
                # "mobile + radiation + tumor + cancer"
            ]
        
        print("\n:magnifying_glass_tilted_right:  [cyan]Performing search queries...[/cyan]\n")
        
        dois_list = []
        abstract_list = []
        med_list = []
        for question in seed_questions:
            meta_tmp, abstract_tmp = self.search_pubmed(question, 100, True, True, True)
            med_list.extend(meta_tmp)
            # dois_list.extend(dois_tmp)
            abstract_list.extend(abstract_tmp)
            sleep(5)
            
        dois_list = list(set(dois_list))
        self.downloadMetadata(doisList=[], pubmedList=med_list, source="pubmed", abstract_list=abstract_list)
        
    def search_pubmed(self, search_term, max_results, include_pubmed_id, include_title, include_abstract):
        pubmed = PubMed(tool="MyTool", email="aalamel@clemson.edu")
        results = pubmed.query(search_term, max_results=max_results)
        dois_list = []
        abstract_list = []
        medid_list = []
        med_list = []
        for article in results:
            article_dict = article.toDict()
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
            
        return medid_list

    async def crawl_wos(self, query = "", query_file = ""):
        if query_file != "":
            with open(query_file, "r") as f:
                seed_questions = f.readlines()
        elif query != "":
            seed_questions = [query]
        else:
            seed_questions = [
                "5G",
                "mobile communication",
                "4G",
                "radiation",
                "brain cancer",
                "hypersensitivity",
                "electromagnetic",
                "magnetic field",
                "cells",
                "bio",
                "microweave",
                "field exposure",
                "RF-EMF",
                "EMF",
        
            ]

        doisList = []
        
        print("\n:magnifying_glass_tilted_right:  [cyan]Performing search queries...[/cyan]\n")
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()

            for question in seed_questions:
                # Navigate to a website
                await page.goto('https://www.webofscience.com/wos/woscc/basic-search')
                await page.wait_for_selector('input[name="search-main-box"]')
                await page.evaluate('''() => {
                    document.querySelector('#snSearchType > div.button-row > button').click();
                }''')
                await page.type('input[name="search-main-box"]', question)
                # clear existing value
                
                await page.evaluate('''() => {
                    document.querySelector('button[data-ta="run-search"]').click();
                }''')
                await page.wait_for_selector('a[data-ta="summary-record-title-link"]')
                await page.wait_for_load_state()

                for i in range(5):
                    await page.keyboard.press("End")
                    await page.evaluate('''() => {
                        return new Promise((resolve) => setTimeout(resolve, 1000));
                    }''')

                ids = await page.evaluate('''() => {
                    return Array.from(document.querySelectorAll('a[data-ta="summary-record-title-link"]')).map((anchor) => anchor.href.split('full-record/')[1]);
                }''')
                
                session = await page.evaluate('''() => {
                    return window.sessionData["BasicProperties"]["SID"];
                }''')
                                                
                bibTex = await page.evaluate('''async ({ ids, sessionKey }) => {
                    const req = await fetch("https://www.webofscience.com/api/wosnx/indic/export/saveToFile", {
                    "headers": {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/json",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "Linux",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-1p-wos-sid": `${sessionKey}`
                    },
                    "referrer": "https://www.webofscience.com/wos/woscc/summary/9b9eef76-f56d-49e6-9b88-2c5e9cf119cd-b2709e17/relevance/1(overlay:export/exbt)",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `{"ids":` + JSON.stringify(ids) + `,"displayTimesCited":"true","displayCitedRefs":"true","product":"UA","colName":"WOS","displayUsageInfo":"true","fileOpt":"othersoftware","action":"saveToBibtex","locale":"en_US","view":"summary","filters":"authorTitleSource"}`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                    });
                    return await req.text();
                }''', {"ids": ids, "sessionKey": session})

                lines = bibTex.split("\n")
                dois_tmp = []
                wos_tmp = []
                for i in range(len(lines)):
                    print(lines[i])
                    if "DOI" in lines[i]:
                        dois_tmp.append(lines[i].split('{')[1].split("}")[0])
                    if "Unique-ID" in lines[i]:
                        wos_tmp.append(lines[i].split('{')[1].split("}")[0])
                        
                doisList.extend(dois_tmp)
                sleep(5)
            await browser.close()
    
        doisList = list(set(doisList))
        self.downloadMetadata(doisList=doisList, pubmedList=[], source="wos", wosid_list=wos_tmp)
    
    async def crawl_emf(self):
        async with async_playwright() as p:
            emf_urls = []
            seed_links = [
                "https://www.emf-portal.org/en/article/overview/children-and-young-animals-epidem",
                "https://www.emf-portal.org/en/article/overview/power-line-frequencies-epidem",
                "https://www.emf-portal.org/en/article/overview/millimeter-waves",
                "https://www.emf-portal.org/en/article/overview/mobile-communications-epidem",
                "https://www.emf-portal.org/en/article/overview/static-fields-magnetic"
            ]
            browser = await p.chromium.launch(headless=False)
            page = await browser.new_page()
            print("\n:ledger: [cyan]Grabbing categories...[/cyan]")

            tmp_urls = []
            for k in range(len(seed_links)):
                await page.goto(seed_links[k])
                category_urls = await page.query_selector_all('.emfp-bar-list-cell > a')
                category_urls = ["https://www.emf-portal.org" + await url.get_attribute('href') for url in category_urls]
                
                for i in range(len(category_urls)):
                    sleep(5)
                    
                    await page.goto(category_urls[i])
                    pub_list = await page.query_selector_all('.emfp-list')
                 
                    sub_category_urls = await page.query_selector_all('.emfp-bar-list-cell > a')
                    if len(pub_list) == 0:
                        sub_category_urls = sub_category_urls[len(category_urls):]
                        tmp_urls.extend(["https://www.emf-portal.org" + await url.get_attribute('href') for url in sub_category_urls])
                    else:
                        tmp_urls.append(category_urls[i])

            category_urls = list(set(tmp_urls))
            final_category_urls = []
            for i in range(len(category_urls)):
                for l in range(3):
                    final_category_urls.append(category_urls[i].split("#")[0] + f'?pageIndex={l}&pageSize=50#' + category_urls[i].split("#")[1])
                
            tmp_urls = []
            for i in range(len(final_category_urls)):
                await page.goto(final_category_urls[i])

                tmp = await page.query_selector_all('.emfp-article-list-title')
                tmp = [await t.get_attribute('href') for t in tmp]
                tmp_urls.extend(tmp)
            emf_urls.extend(tmp_urls)
            emf_urls = list(set(emf_urls))

            doi_list = []
            medid_list = []
            url_map = {}
            
            print("")
            for i in track(range(len(emf_urls)), description=":magnifying_glass_tilted_right:  [cyan]Finding DOIs...      "):
                paper = emf_urls[i]
                await page.goto("https://www.emf-portal.org" + paper)
                try:
                    doi = await page.evaluate("""
                        async () => {
                            const externalNodes = document.querySelectorAll('.emfp-external');
                            const linkArr = Array.prototype.slice.call(externalNodes);
                            if (linkArr.filter((element) => element.innerText.includes('doi')).length > 0)
                                return linkArr.filter((element) => element.innerText.includes('doi'))[0].innerText.substring(4).trim()
                            else
                                return "";
                        }
                    """)
                    med_id = await page.evaluate("""
                        async () => {
                            const externalNodes = document.querySelectorAll('.emfp-external');
                            const linkArr = Array.prototype.slice.call(externalNodes);
                            if (linkArr.filter((element) => element.innerText.includes('PubMed')).length > 0)
                                return linkArr.filter((element) => element.innerText.includes('PubMed'))[0].href.split('pubmed/')[1];
                            else
                                return "";
                        }
                    """)
                    
                    if len(doi) > 0:
                        doi_list.append(doi)
                        url_map[doi]="https://www.emf-portal.org" + paper
                    if len(doi) == 0 and len(med_id) > 0:
                        medid_list.append(med_id)
                        url_map[med_id]="https://www.emf-portal.org" + paper
                    
                except Exception as e:
                    print("No DOI found ", paper)
                    continue

            self.downloadMetadata(doisList=doi_list, pubmedList=medid_list, source="emf", urlMap=url_map)
            await browser.close()

console = Console()
app = typer.Typer(help="[green]CLI for the NextGEM risk assessment tool.[/green]", rich_markup_mode="rich", add_completion=False)
crawlers = Crawlers()

@app.command()
def crawl(portal: str = typer.Argument(default="", help="The portal to download data from \[ [dark_orange3]emf[/dark_orange3], [dark_orange3]pubmed[/dark_orange3], [dark_orange3]wos[/dark_orange3], [dark_orange3]all[/dark_orange3] ]."), 
          query: str = typer.Option(default="", help="The query to use for publication search."),
          query_file: str = typer.Option(default="", help="The query file to use for publication search.")):
    """
    Download publications from the portal and save them in the database.
    """
    crawlers.crawl(portal, query, query_file)

@app.command()
def search(query: str = typer.Argument(help="The query to use for publication search."), field: str = typer.Argument(default="",help="The database field to apply the query at.")):
    """
    Retrieve publications from the database based on query.
    """
    results = crawlers.search(query, field)
    if results is None:
        console.print("[red]Unknown field. Choose one from ([dark_orange3]title, author, abstract, source, doi, subject[/dark_orange3])[/red].")
        return
    table = Table(title="Publications", padding=(1, 1))
    table.add_column("No", style="magenta")
    table.add_column("Title", justify="left", style="cyan", no_wrap=False)
    table.add_column("Source", justify="center",style="magenta")
    table.add_column("DOI", justify="center", style="green")

    i = 0
    for result in results:
        i += 1
        if "DOI" in result:
            table.add_row(str(i), result["title"], result["source"], result["DOI"])
    console.print(table)

if __name__ == "__main__":
    os.system('cls' if os.name == 'nt' else 'clear')
        
    console.print("""
  ____  ___ ____  _  __     _    ____ ____  _____ ____ ____  __  __ _____ _   _ _____    ____ _     ___ 
 |  _ \|_ _/ ___|| |/ /    / \  / ___/ ___|| ____/ ___/ ___||  \/  | ____| \ | |_   _|  / ___| |   |_ _|
 | |_) || |\___ \| ' /    / _ \ \___ \___ \|  _| \___ \___ \| |\/| |  _| |  \| | | |   | |   | |    | | 
 |  _ < | | ___) | . \   / ___ \ ___) |__) | |___ ___) |__) | |  | | |___| |\  | | |   | |___| |___ | | 
 |_| \_\___|____/|_|\_\ /_/   \_\____/____/|_____|____/____/|_|  |_|_____|_| \_| |_|    \____|_____|___|
                                                                                                        """, style="bold dark_orange3")
    app()
