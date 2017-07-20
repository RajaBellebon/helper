# Import the necessary package to process data in JSON format
from __future__ import print_function
import time
import sys
import fnmatch

try:
    import json
except ImportError:
    import simplejson as json

# Import the necessary methods from "twitter" library
from twitter import Twitter, OAuth, TwitterHTTPError, TwitterStream

keyword = sys.argv[1]

def twitter_search_keyword():
    # Variables that contains the user credentials to access Twitter API 
    ACCESS_TOKEN = '878489686259322880-qGuSEcedSXf78H6MQsEHulxD9ijd4uq'
    ACCESS_SECRET = 'xfaSKKPslNXUbWPrNlP4Kq1kIPKWFxb7LnNUA6J7hnH4y'
    CONSUMER_KEY = '6nctFao1pNx5l38xcdetIHH9a'
    CONSUMER_SECRET = 'ICyrWPW2lrKtk9N0garAnx6tL8lHebgYJtjK0EXPalCO0yVf9w'

    oauth = OAuth(ACCESS_TOKEN, ACCESS_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
    # keywords = raw_input("Enter your keywords: ")

    # Initiate the connection to Twitter Streaming API
    twitter_search = Twitter(auth=oauth)
    # Search
    tweets = twitter_search.search.tweets(q=keyword, lang='en', until = time.strftime("%Y-%m-%d"), count = 100)
    twitter_list = []
    val_rba = []
    val_aud = []
    for tweet in tweets['statuses']:
        try:
            twitter_list.append(tweet['text'])   
        except:
            # read in a line is not in JSON format (sometimes error occured)
            continue
    # Open the file and append lines to the existing file   
    the_file_rba = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_RBA.txt','a+')
    the_file_aud = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_AUD.txt','a+')
    if 'AUD' in keyword:
        val_aud = fnmatch.filter(twitter_list, '*upside*break*') + fnmatch.filter(twitter_list, '*buy??aud*') + fnmatch.filter(twitter_list, '*buy?aud*')  
    else:
        val_rba = fnmatch.filter(twitter_list, '*hawkish*') + fnmatch.filter(twitter_list, '*dovish*') + fnmatch.filter(twitter_list, '*on?hold*') + fnmatch.filter(twitter_list, '*cut*')+ fnmatch.filter(twitter_list, '*hike*')
    for item in val_rba:
        the_file_rba.write(json.dumps(item)+ '\n' )
        
    for item in val_aud:
        the_file_aud.write(json.dumps(item)+ '\n' )
        
    # Get the existing lines and check for duplicates tweet
    
##    for item in val:
##        the_file.write(json.dumps(item)+ '\n' )
            
    # close files       
    the_file_aud.close()
    the_file_rba.close()
    
def remove_duplicates():
    f1 = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_RBA.txt')
    f2 = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_AUD.txt')
    lines_f1 = f1.readlines()
    lines_f2 = f2.readlines()
    list(set(lines_f1))
    list(set(lines_f2))
    outfile_1 = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_RBA.txt', "w")
    outfile_2 = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_AUD.txt', "w")
    for line in list(set(lines_f1)):
        outfile_1.write(line)
    for line in list(set(lines_f2)):
        outfile_2.write(line)
    outfile_1.close()
    outfile_2.close()
     
if __name__ == "__main__":
    twitter_search_keyword()
    remove_duplicates()
