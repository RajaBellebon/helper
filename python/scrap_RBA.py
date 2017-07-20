from bs4 import BeautifulSoup
from multiprocessing import Pool
import requests
#import MontyLingua
import re
import os
import time
import itertools
import fileinput
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
import fileinput

def google_hits():
    f = open("C:/Python27/phrases.txt", "r")
    f_new = open("phrases_count.csv", "w+")
    for line in f.readlines():
        words = ["hawkish","dovish"]
        for word in words:          
            new_line = line.replace("\n", " ") + word
            url = "https://www.google.com.au/search?q=" + new_line
            r = requests.get(url)
            data = r.text
            soup = BeautifulSoup(data, "html.parser")
            value = soup.find("div", {"id": "resultStats"}).getText()
            results = re.sub("\D", "", value)     
            #print (new_line + "," + results)
            f_new.write(line.replace("\n", " ") + ", " + word + ", " +  results + " \n")
        
def google_hits_fast_selenium():
    # define driver and wait
    driver = webdriver.Chrome('C:\\Users\\raja.bellebon\\Downloads\\chromedriver_win32\\chromedriver.exe')
    wait = WebDriverWait(driver, 30)
    f = open("C:/Python27/phrases.txt", "r")
    lines = f.readlines()
    words = ["hawkish","dovish"]
    val = []
    lin = []
    driver.get("https://www.google.com.au/")
    input_text = driver.find_element_by_id("lst-ib")
    for line in lines:
        #google_search = driver.find_element_by_css_selector('[value="Google Search"]') 
        for word in words:
            input_text.send_keys('"' +line.replace("\n", " ").strip() + '"' + " AND " + word)
            time.sleep(10) 
            try:
                driver.find_element_by_css_selector('[value="Search"]').click()
            except:
                driver.find_element_by_css_selector('[value="Google Search"]').click()
            try: 
                element = wait.until(EC.presence_of_element_located((By.ID, 'resultStats')))
                time.sleep(5)
                txt = driver.find_element_by_id("resultStats").text.split("results")
                value = re.sub("\D", "", txt[0])
            except:
                value = "0"
            time.sleep(10)
            input_text.send_keys('')
            input_text.clear()
            l = line.replace("\n", " ") + ", " + word + ", " +  value + "\n"
            lin.append(l)
            time.sleep(30)
            print (l)
        time.sleep(30)
    driver.close()
    return lin    

def google_hits_refactor(line):
    words = ["hawkish","dovish"]
    val = []
    lin = []
    header = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0',}
    f_new = open("phrases_count_fast.csv", "w+")
    for word in words:
        new_line = line.replace("\n", " ").strip()
        url_bing = "https://www.bing.com/search?q="
        url_google = "https://www.google.com.au/search?q="
        url = url_google + '"' + new_line + '"' + "+AND+" + word
        before_r = time.time()          
        r = requests.get(url)
        val.append(time.time() - before_r)
        #print("---request time %s seconds ---" % (time.time() - before_r))
        data = r.text
        parsing_time = time.time()
        soup = BeautifulSoup(data, "html.parser")
        print soup
        value = soup.find("div", {"id": "resultStats"}).getText()
        #value_bing = soup.find("div", class_="sb_count").getText()
        results = re.sub("\D", "", value)
        l = line.replace("\n", " ") + ", " + word + ", " +  results + " \n"
        lin.append(l)
        f_new.write(l)
        time.sleep(60)
    f_new.close()
    return lin
    
def write_files(l):
    f_new = open("phrases_count_fast.csv", "w+")
    #merged = sum(l, [])
    merged = l
    for line in merged:
        #print line
        f_new.write(str(line))
    f_new.close()

def clean_files(path):
    #f = open(path, "r")
    f_new = open("new_file.csv", "w+")
    line = f_new.readlines()
    for line in fileinput.FileInput(path, inplace=1):
        if line.rstrip():
            f_new.write(line)    
    
def scrap_rba():
    date_url = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]
    for u in date_url:
        url = "http://www.rba.gov.au/media-releases/" + u + "/"
        #url = "http://www.rba.gov.au/media-releases/2017"
        r  = requests.get(url)
        data = r.text
        soup = BeautifulSoup(data, "html.parser")
        link_date = []
        
        for link in soup.find_all("a"):
            #if "2017/mr" in link.get("href"):
            if (u + "/mr") in link.get("href"): 
                link_date.append(link.get("href"))

        for link in link_date:
            url_article = "http://www.rba.gov.au/"
            r  = requests.get(url_article + link)
            data = r.text
            soup = BeautifulSoup(data, "html.parser")
            title_raw = soup.find("title").getText()
            title_raw = title_raw.replace("Media Releases-", "").split("|")
            if "Statement" in title_raw[0]:        
                try:
                    date = soup.time.getText()
                except:
                    date = soup.find(text = re.compile('date'))
                page = soup.find_all("p")
                para = []
                extracted_para = []
                list_exclude = ["And", "but", "though", "although", "Even though", "even as", "whether", "and", "But", "even though", "also", "therefore"]
                for p in page:
                    para.append(re.sub("[^A-Za-z0-9;,.']+", " ", p.getText().strip()))      
                # the first element is Javascript, the last two are the contact details 
                para.pop(0)
                para = para[:(len(para)-2)]
                title = re.sub("[^A-Za-z0-9]+", "_", title_raw[0])
                title_article = title.strip() + "_" +(str(date)).replace(" ", "_") + ".txt"
                filepath = os.path.join('C:/Python27/statement', title_article)
                f= open(filepath,"w+") 
                line_tokenized = []
                para_new = []
                for lin in para:
                    lin_words = lin.split()
                    resultwords  = [word for word in lin_words if word.lower() not in list_exclude]
                    res = ' '.join(resultwords)
                    para_new.append(res)       
                for line in para_new:
                    if not (line.startswith("Phone") or line.startswith("Dr")):
                        if "," in line:
                            li = line.replace("," , ".")
                            var = li.split(".")
                            for v in var:
                                line_tokenized.append(v)                 
                        else:
                             var = line.split(".")
                             for v in var:
                                line_tokenized.append(v)  
                for s in line_tokenized:
                    if s.strip() != '':
                        #print (s.strip() + ".")
                        f.write(s.strip() + ". " + "\n")
                f.close()
                
def use_parallel_thread(number_of_thread):
    f = open("C:/Python27/phrases.txt", "r")
    line = f.readlines()
    p = Pool(number_of_thread)
    write_files(p.map(google_hits_refactor, line))

if __name__ == "__main__":
    #scrap_rba()
    start_time = time.time()
    val =  google_hits_fast_selenium()
    #print val
    write_files(val)
    #clean_files("2009_backup.txt")
    print("--- %s seconds ---" % (time.time() - start_time))
