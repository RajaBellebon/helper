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
    twitter_stream = TwitterStream(auth=oauth)
    # Stream
    # tweets_statuses = twitter_stream.statuses.sample()
    tweets_RBA = twitter_stream.statuses.filter(track='#RBA', language='en')
    print (tweets_RBA)
    twitter_list = []
    tweet_count = 100
    for tweet in tweets_RBA:     
        tweet_count -= 1
        print (json.dumps(tweet))
        # print (tweet_count)
        if tweet_count <= 0:
               break 
##        try:
##            twitter_list.append(tweet['text'])
##            if tweet_count <= 0:
##                break 
##        except:
##            # read in a line is not in JSON format (sometimes error occured)
##            continue
##    # Open the file and append lines to the existing file   
##    the_file = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_stream.txt','a+')
##    if 'AUD' in keyword:
##        val = fnmatch.filter(twitter_list, '*upside*break*') + fnmatch.filter(twitter_list, '*buy??aud*') + fnmatch.filter(twitter_list, '*buy?aud*')
##
##    else:
##        val = fnmatch.filter(twitter_list, '*hawkish*') + fnmatch.filter(twitter_list, '*dovish*')
##        
##    # Get the existing lines and check for duplicates tweet
##    
##    for item in val:
##        the_file.write(json.dumps(item)+ '\n' )
##            
##    # close file       
##    the_file.close()
    
def remove_duplicates():
    f = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_stream.txt')
    lines = f.readlines()
    list(set(lines))        
    outfile = open('C:\\Users\\raja.bellebon\\Desktop\\Tweets_data_raw_stream.txt', "w")
    for line in list(set(lines)):
        outfile.write(line)
    outfile.close()
     
if __name__ == "__main__":
    twitter_search_keyword()
    #remove_duplicates()
