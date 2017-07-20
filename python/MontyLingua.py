"""
 Module MontyLingua
 MONTY LINGUA - An end-to-end natural language processor
                for English, for the Python/Java platform
 
 Author: Hugo Liu <hugo@media.mit.edu>
 Project Page: <http://web.media.mit.edu/~hugo/montylingua>
 
 Copyright (c) 2002-2004 by Hugo Liu, MIT Media Lab
  All rights reserved.

 Non-commercial use is free, as provided in the GNU GPL
 By downloading and using MontyLingua, you agree to abide
 by the additional copyright and licensing information in
  "license.txt", included in this distribution
 
 If you use this software in your research, please 
 acknowledge MontyLingua and its author, and link to back
 to the project page http://web.media.mit.edu/~hugo/montylingua.
 Please cite montylingua in academic publications as: 
 
 Liu, Hugo (2004). MontyLingua: An end-to-end natural 
 language processor with common sense. Available 
 at: web.media.mit.edu/~hugo/montylingua.

 ************************************************
 DOCUMENTATION OVERVIEW

   About MontyLingua:
   - MontyTokenizer
     - normalizes punctuation, spacing and
       contractions, with sensitivity to abbrevs.
   - MontyTagger
     - Part-of-speech tagging using PENN TREEBANK tagset
     - enriched with "Common Sense" from the Open Mind
       Common Sense project
     - exceeds accuracy of Brill94 tbl tagger
       using default training files
   - MontyREChunker
     - chunks tagged text into verb, noun, and adjective
       chunks (VX,NX, and AX respectively)
     - incredible speed and accuracy improvement over
       previous MontyChunker
   - MontyExtractor
     - extracts verb-argument structures, phrases, and
       other semantically valuable information
       from sentences and returns sentences as "digests"
   - MontyLemmatiser
     - part-of-speech sensitive lemmatisation
     - strips plurals (geese-->goose) and
       tense (were-->be, had-->have)
     - includes regexps from Humphreys and Carroll's
       morph.lex, and UPENN's XTAG corpus
   - MontyNLGenerator
     - generates summaries
     - generates surface form sentences
     - determines and numbers NPs and tenses verbs
     - accounts for sentence_type

  WHERE MUST THE DATAFILES BE?
  - the "datafiles" include all files ending in *.MDF
  - the best solution is to create an environment variable called
    "MONTYLINGUA" and put the path to the datafiles there
  - alternatively, MontyLingua can find the datafiles if they are 
    in the operating system "PATH" variable, or in the current
    working directory
    
   API:
     The MontyLingua Python API is MontyLingua.html
     The MontyLingua Java API is JMontyLingua.html

   RUNNING:
     MontyLingua can be called from Python, Java,
     or run at the command line.
     
     A. From Python, import the MontyLingua.py file
     B. From your Java code:
       1. make sure "montylingua.jar" is
         in your class path, in addition to
         associated subdirectories and data files
       2. in your code, you need something like:

       import montylingua.JMontyLingua; // loads namespace
       public class YourClassHere {
         public static JMontyLingua j = new JMontyLingua();
         public yourFunction(String raw, String toked) {
            jisted = j.jist_predicates(raw); // an example function

       3. For a good use case example, see Sample.java.
     C. From the command line:
       1. if you have python installed and in your path:
          type "run.bat"
       2. if you have java installed and in your path:
          type "runJavaCommandline.bat"
 
  VERSION HISTORY:

   New in version 2.1 (6 Aug 2004)
     - new MontyNLGenerator component (in Beta phase)
     - includes version 2.0.1 bugfix for problem
       where java api wasn't being exposed
       
   New in version 2.0 (29 Jul 2004)
     - 2.5X speed enhancement for whole system
       2X speed enhancement for tagger component
     - rule-based chunker replaced with much faster
       and more accurate regular expression chunker
     - common sense added to MontyTagger component
       improves word-level tagger accuracy to 97%
     - updated and expanded lexicon for English
     - added a user-customizable lexicon
       CUSTOMLEXICON.MDF
     - improvements to MontyLemmatiser incorporating
       exception cases
     - html documentation added
     - speed optimizations to all code
     - improvements made to semantic extraction
     - added a morphological analyzer component,
       MontyMorph
     - expanded Java API
     
   New in version 1.3.1 (11 Nov 2003)
     - mainly bugfixes
     - datafiles can now sit in the current working directory (".")
       or in the path of either of the two environment variables 
       "MONTYLINGUA" or "PATH" 
     - presence of the '/' token in input won't crash system
 
   New in Version 1.3 (5 Nov 2003)
     - lisp-style predicate output added
     - Sample.java example file added to illustrate API
   
   New in Version 1.2 (12 Sep 2003)
     - MontyChunker rules expanded
     - MontyLingua JAVA API added
     - MontyLingua documentation added

   New in Version 1.1 (1 Sep 2003)
     - MontyTagger optimized, 2X loading and 2.5X tagging speed
     - MontyLemmatiser added to MontyLingua suite
     - MontyChunker added
     - MontyLingua command-line capability added

   New in Version 1.0 (3 Aug 2003)
     - First release
     - MontyTagger (since 15 Jan 2001) added to MontyLingua

 --please send bugs & suggestions to hugo@media.mit.edu--

"""
     
__author__  = "Hugo Liu <hugo@media.mit.edu>"
__version__ = "2.1"

import MontyTokenizer, MontyTagger, MontyLemmatiser, MontyREChunker, MontyExtractor, MontyNLGenerator

class MontyLingua:
    
    def __init__(self,trace_p=0):
        print '\n****** MontyLingua v.'+__version__+' ******'
        print '***** by hugo@media.mit.edu *****'
        self.trace_p = trace_p
        self.theMontyTokenizer = MontyTokenizer.MontyTokenizer()
        self.theMontyLemmatiser = MontyLemmatiser.MontyLemmatiser()
        self.theMontyTagger = MontyTagger.MontyTagger(trace_p,self.theMontyLemmatiser)
        self.theMontyChunker = MontyREChunker.MontyREChunker()
        self.theMontyExtractor = MontyExtractor.MontyExtractor()
        self.theMontyNLGenerator = MontyNLGenerator.MontyNLGenerator()
        print '*********************************\n'

#
#  MAIN FUNCTIONS
#
    def generate_summary(self,vsoos):
        return self.theMontyNLGenerator.generate_summary(vsoos)
            
    def generate_sentence(self,vsoo,sentence_type='declaration',tense='past',s_dtnum=('',1),o1_dtnum=('',1),o2_dtnum=('',1),o3_dtnum=('',1)):
        return self.theMontyNLGenerator.generate_sentence(vsoo,sentence_type=sentence_type,tense=tense,s_dtnum=s_dtnum,o1_dtnum=o1_dtnum,o2_dtnum=o2_dtnum,o3_dtnum=o3_dtnum)
        
    def jist_predicates(self,text):
        infos = self.jist(text)
        svoos_list = []
        for info in infos:
            svoos = info['verb_arg_structures_concise']
            svoos_list.append(svoos)
        return svoos_list
    
    def tokenize(self,sentence,expand_contractions_p=1):
        return self.theMontyTokenizer.tokenize(sentence,expand_contractions_p)

    def tag_tokenized(self,tokenized_text):
        return self.theMontyTagger.tag_tokenized(tokenized_text)

    def jist(self,text):
        sentences = self.split_sentences(text)
        tokenized = map(self.tokenize,sentences)
        tagged = map(self.tag_tokenized,tokenized)
        chunked = map(self.chunk_tagged,tagged)
        print "CHUNKED: " + string.join(chunked,'\n ')
        extracted = map(self.extract_info,chunked)
        return extracted

    def pp_info(self,extracted_infos):
        """pretty prints sentence information digests returned by jist()"""
        for i in range(len(extracted_infos)):
            keys = extracted_infos[i].keys()
            keys.sort()
            print "\n\n   SENTENCE #%s DIGEST:\n"%str(i+1)
            for key in keys:
                print (key+": ").rjust(22) + str(extracted_infos[i][key])
    
    def split_paragraphs(self,text):
        return self.theMontyTokenizer.split_paragraphs(text)

    def split_sentences(self,text):
        return self.theMontyTokenizer.split_sentences(text)

    
    def strip_tags(self,tagged_or_chunked_text):
        toks = tagged_or_chunked_text.split()
        toks = filter(lambda x:'/' in x,toks)
        toks = map(lambda x:x.split('/')[0],toks)
        return ' '.join(toks)

    def parse_pred_arg(self,pp):
        # unpp augmented predicate
        pp.strip
        toks = pp.strip()[1:-1].split()
        args = ' '.join(toks)[1:-1].split('" "')
        return args
    
    def chunk_tagged(self,tagged_text):
        return self.theMontyChunker.Process(tagged_text)
    
    def chunk_lemmatised(self,lemmatised_text):
        return self.theMontyChunker.chunk_multitag(lemmatised_text)

    def lemmatise_tagged(self,tagged_text):
        return self.theMontyLemmatiser.lemmatise_tagged_sentence(tagged_text)

                                   
    def extract_info(self,chunked_text):
        return self.theMontyExtractor.extract_info(chunked_text,self.theMontyLemmatiser.lemmatise_tagged_sentence)
    
    
# END MONTYLINGUA CLASS

#        
# COMMAND LINE PROGRAM        
#
if __name__ == "__main__":
    import sys,time
    if '/?' in sys.argv or '-?' in sys.argv:
        print """
        USAGE: >> python MontyLingua.py 
        """
        sys.exit(0)


    m = MontyLingua()

 
    # show command prompt interface
    print '\n'

    try:
        while 1:
            sentence = ''
            try:
                sentence = raw_input('> ')
            except:
                raise

            time1 = time.time()
            print '\n'
            extractions = m.jist(sentence)                          
            print m.pp_info(extractions)
            predicates_list = map(lambda a:m.parse_pred_arg(a),reduce(lambda y,z:y+z,map(lambda x:x['verb_arg_structures_concise'],extractions)))
            print predicates_list                           
            print '\nGENERATED SUMMARY:\n'+m.generate_summary(predicates_list)
                
            time2= time.time()
            print "-- monty took",str(round(time2-time1,2)),'seconds. --\n'
    except KeyboardInterrupt:
        print "\n-- monty says goodbye! --"
        sys.exit(0)
       
