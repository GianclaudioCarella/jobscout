import json
import os
import requests
from urllib.parse import quote
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

# --- Load company config and preferences ---
# def load_json(path):
#     if not os.path.exists(path):
#         return {}
#     with open(path, "r") as f:
#         return json.load(f)

def save_json(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

companies = {
  "Spotify": {
    "job_board": "custom",
    "domain": "www.lifeatspotify.com",
    "careers_url": "https://www.lifeatspotify.com/jobs"
  },
  "Headspace": {
    "job_board": "greenhouse",
    "domain": "boards.greenhouse.io",
    "careers_url": "https://boards.greenhouse.io/hs"
  },
  "Notion": {
    "job_board": "greenhouse",
    "domain": "job-boards.greenhouse.io",
    "careers_url": "https://job-boards.greenhouse.io/notion"
  },
  "": {
    "job_board": "custom",
    "domain": "www.google.com",
    "careers_url": "https://www.google.com/about/careers/applications/"
  }
}

preferences = {
  "companySearch": {
    "companies": [""],
    "roles": ["Product Designer", "UX/UI Designer", "UX Designer", "Senior Product Designer","Senior UX/UI Designer"],
    "filters": ["remote", "senior"],
    "date": "last 7 days"
  },
  "discoverySearch": {
    "roles": ["Product Designer", "UX Designer", "UX/UI Designer", "Senior Product Designer", "Senior UX/UI Designer" ],
    "filters": ["remote", "Spain", "Barcelona"],
    "date": "last 7 days"
  }
}

def detect_known_job_board(html):
    soup = BeautifulSoup(html, "html.parser")
    links = soup.find_all("a")
    for link in links:
        href = link.get("href", "")
        if "greenhouse.io" in href:
            return ("greenhouse", href.split("/jobs")[0])
        elif "lever.co" in href:
            return ("lever", href.split("?")[0])
        elif "workday" in href:
            return ("workday", href.split("?")[0])
        elif "smartrecruiters.com" in href:
            return ("smartrecruiters", href.split("?")[0])
        elif "jobvite.com" in href:
            return ("jobvite", href.split("?")[0])
        elif "recruiting.adp.com" in href:
            return ("adp", href.split("?")[0])
    return (None, None)

def looks_like_job_page(html):
    soup = BeautifulSoup(html, "html.parser")
    keywords = ["open positions", "apply now", "job openings", "departments", "all jobs", "opportunities"]
    headings = soup.find_all(["h1", "h2", "h3"])
    job_like_titles = [h.get_text().lower() for h in headings if any(kw in h.get_text().lower() for kw in ["designer", "engineer", "marketing", "manager"])]
    body_text = soup.get_text().lower()
    matches = [kw for kw in keywords if kw in body_text]
    links = soup.find_all("a")
    job_links = [a for a in links if a.get("href") and any(x in a.get("href") for x in ["job", "career", "position", "apply"])]
    return len(matches) > 0 or len(job_links) > 5 or len(job_like_titles) > 3

def discover_job_board(company):
    print(f"🔍 Discovering careers page for {company}...")
    query = f"{company} careers"
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": API_KEY,
        "cx": SEARCH_ENGINE_ID,
        "q": query
    }
    response = requests.get(url, params=params)

    if response.status_code != 200:
        print(f"❌ Error: {response.status_code} - {response.text}")
        return {"job_board": "unknown", "domain": "unknown", "careers_url": "unknown"}

    data = response.json()
    for item in data.get("items", []):
        link = item["link"]
        try:
            page = requests.get(link, timeout=10)
            if page.status_code == 200:
                board_type, board_url = detect_known_job_board(page.text)
                if board_type and board_url:
                    domain = board_url.split("/")[2]
                    print(f"✅ Found {board_type} job board: {board_url}")
                    return {"job_board": board_type, "domain": domain, "careers_url": board_url}
                elif looks_like_job_page(page.text):
                    domain = link.split("/")[2]
                    print(f"✅ Found actual job page: {link}")
                    return {"job_board": "custom", "domain": domain, "careers_url": link}
        except Exception as e:
            print(f"⚠️ Skipped {link} due to error: {e}")

    print(f"⚠️ No valid job listings page found for {company}.")
    return {"job_board": "unknown", "domain": "unknown", "careers_url": "unknown"}

def build_query(company, company_info, prefs):
    domain = company_info["careers_url"].replace("https://", "").split("?", 1)[0]
    base = f'site:{domain} "{company}"'
    roles = " OR ".join([f'\"{role}\"' for role in prefs["companySearch"]["roles"]])
    filters = " ".join(prefs["companySearch"]["filters"])
    date_filter = get_date_filter(prefs["companySearch"].get("date", ""))
    return f'{base} ({roles}) {filters} {date_filter}'

def get_date_filter(keyword):
    today = datetime.today()
    if keyword == "today":
        return f"after:{today.strftime('%Y-%m-%d')}"
    elif keyword == "this week":
        start = today - timedelta(days=today.weekday())
        return f"after:{start.strftime('%Y-%m-%d')}"
    elif keyword == "last 7 days":
        start = today - timedelta(days=7)
        return f"after:{start.strftime('%Y-%m-%d')}"
    return ""

def build_generic_query(board_domain, prefs):
    roles = " OR ".join([f'\"{role}\"' for role in prefs["discoverySearch"]["roles"]])
    filters = " ".join(prefs["discoverySearch"]["filters"])
    date_filter = get_date_filter(prefs["discoverySearch"].get("date", ""))
    return f'site:{board_domain} ({roles}) {filters} {date_filter}'

def search_google(query):
    print(f"\n🔎 Searching: {query}\n")
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": API_KEY,
        "cx": SEARCH_ENGINE_ID,
        "q": query
    }
    response = requests.get(url, params=params)
    results = []

    if response.status_code == 200:
        data = response.json()
        for item in data.get("items", []):
            results.append({
                "title": item["title"],
                "link": item["link"]
            })
    else:
        print(f"❌ Error: {response.status_code} - {response.text}")

    return results

# --- MAIN ---
company_names = preferences.get("companySearch", {}).get("companies", [])

for name in company_names:
    if (
        name not in companies or
        companies[name]["domain"] == "unknown" or
        companies[name]["careers_url"] == "unknown"
    ):
        info = discover_job_board(name)
        companies[name] = info
        save_json(companies, "companies.json")
    else:
        print(f"✅ Using saved board for {name}")

    if companies[name]["careers_url"] == "unknown":
        print(f"⚠️ Skipping {name} — no valid careers page found.")
        continue

    query = build_query(name, companies[name], preferences)
    results = search_google(query)

    print(f"\n🎯 Jobs for {name}:")
    if results:
        for job in results:
            print(f"- {job['title']} → {job['link']}")
    else:
        print("🚫 No jobs found for this search.")
    print("\n" + "=" * 40 + "\n")

# --- GENERIC DISCOVERY SEARCH ---
# 🔧 Add more job boards here:
generic_boards = [
    "boards.greenhouse.io",
    "jobs.lever.co",
    "myworkdayjobs.com",
    "smartrecruiters.com",
    "jobvite.com",
    "recruiting.adp.com",
    "jobs.careerbuilder.com",
    "careers.microsoft.com",
    "jobs.cognizant.com",
    "jobs.sap.com",
    "jobs.intel.com",
    "careers.google.com",
    "jobs.apple.com",
    "amazon.jobs",
    "jobs.netflix.com",
    "jobs.atlassian.com"
]


print("🔍 Running discovery search across job boards...\n")
for board in generic_boards:
    query = build_generic_query(board, preferences)
    results = search_google(query)

    print(f"\n🌍 Discovery results from {board}:")
    if results:
        for job in results:
            print(f"- {job['title']} → {job['link']}")
    else:
        print("🚫 No jobs found for this board.")
    print("\n" + "=" * 40 + "\n")
