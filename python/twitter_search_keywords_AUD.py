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

#keyword = sys.argv[1]

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
    tweets = twitter_search.search.tweets(q='AUD', lang='en', until = time.strftime("%Y-%m-%d"), count = 100)
    #tweets_reserve = twitter_search.search.tweets(q='reserve bank', lang='en', until = time.strftime("%Y-%m-%d"), count = 100)
    twitter_list_raw = []
    twitter_list = []
    for tweet in tweets['statuses']:
        try:
            twitter_list_raw.append(tweet['text'])   
        except:
            # read in a line is not in JSON format (sometimes error occured)
            continue
##    for tweet in tweets_reserve['statuses']:
##        try:
##            twitter_list_raw.append(tweet['text'])   
##        except:
##            # read in a line is not in JSON format (sometimes error occured)
##            continue
    # Open the file and append lines to the existing file   
    the_file = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_AUD.txt','a+')
    # liste_words = ['*hawk*', '*tightening*', '*Hawkish*', '*Hike*', '*Tight*', '*Upgrade*', '*Raise*', '*rise*','*Increase*','*Boost*','*strenghten*','*Dovish*','*Cut*','*Downgrade*','*Ease*','*easing*','*Lower*','*Decease*','*loose*','*on hold*','*unchanged*','*neutral*', '*no change*', '*dove*','*lower*','*higher rates*','*lower rates*' ]
    liste_words = ['*AUD*']
    for word in liste_words:
        twitter_list = fnmatch.filter(twitter_list_raw, word)
        
    # Get the existing lines and check for duplicates tweet
   
    for item in twitter_list_raw:
        if item not in ('vape' or '#Vape' or 'Vape' or '#VAPE' or 'VAPE'):
            the_file.write(json.dumps(item)+ '\n' )
            
    # close file       
    the_file.close()
    
def remove_duplicates():
    f = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_AUD.txt')
    lines = f.readlines()
    list(set(lines))        
    outfile = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_AUD.txt', "w")
    for line in list(set(lines)):
        outfile.write(line)
    outfile.close()
     
if __name__ == "__main__":
    twitter_search_keyword()
    remove_duplicates()
