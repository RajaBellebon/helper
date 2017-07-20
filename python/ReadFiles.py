#Utility to clean the old files in any project

import os
import time
import datetime

##user_input_filepath = raw_input("could you type your path to your project:")

def modification_date(path):
    t = os.path.getmtime(path)      
    return datetime.datetime.fromtimestamp(t).strftime('%Y')

def readNumberOfFolderAndFiles(user_input_filepath):

##   number_of_files = len([item for item in os.listdir(directory) if os.path.isfile(os.path.join(directory, item))])
##   number_of_folder = 
##   print number_of_folder
##   print number_of_files
    files = folders = i = 0
    dic = {}   
    filenameTime = []
    for _, dirnames, filenames in os.walk(user_input_filepath):
        
      # ^ this idiom means "we won't be using this value"
        files += len(filenames)
        folders += len(dirnames)   
    dirnames = os.listdir(user_input_filepath)      
    for fo in dirnames:        
            path = os.path.abspath(user_input_filepath + '\\' + fo)
            if path <> 'C:\domain-desktop\Domain\Domain.sln':
                file1 = os.listdir(path)
                for f in file1:
                    tup1 = ()
                    last_modified_date = modification_date(path)
                    tup1 = (path,f,last_modified_date)
                    if tup1[2] <> '2016':
                        print tup1
##                    filenameTime.append(tup1)
##                    print tup1
##                i += 1
##                print i
        
   
##    print "{:,} files, {:,} folders".format(files, folders)
   
