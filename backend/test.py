import requests

response = requests.post(
    "http://localhost:8000/factcheck",
    json={"url": "https://www.usatoday.com/videos/news/2025/06/21/us-enters-israeli-iran-conflict/84303741007/"}
)

print(response.status_code)
print(response.json())
