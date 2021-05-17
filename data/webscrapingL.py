import requests
from bs4 import BeautifulSoup
import pandas as pd



data = {'Date': [], 'Name': [], 'Publisher': [], 'Est. Counts': []}
df = pd.DataFrame(data)
r = requests.get('https://www.comichron.com/monthlycomicssales/2020.html')
bs = BeautifulSoup(r.content,'html.parser')
text = bs.find('tbody')
a = text.find('a')
name = a.text
tr = text.find_all('tr')
for i in tr[:50]:
    name = i.find('a').text
    tds = i.find_all('td')
    date = tds[4].text
    publisher = tds[5].text
    counts = tds[6].text
    new_row = {'Date': date, 'Name': name, 'Publisher': publisher, 'Est. Counts': counts}
    df = df.append(new_row, ignore_index=True)

df.to_csv('sales2020.csv')