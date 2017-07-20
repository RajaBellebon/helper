from lxml.html import parse
parsed = parse('Factiva.htm')
doc = parsed.getroot()
cells = doc.findall('.//td')
len(cells)
fout = open('factiva-parsed.txt', 'w')
fout.write("TITLE\tSOURCE\tTIME\tDATE\tWORD COUNT\n")
fout.flush()
NA = "N/A"
T = "\t"
NL = "\n"
for (i, cell) in enumerate(cells):
  if (i<2):
    #ignore first two results, they are from the page header
    continue
  #col1: title, from <b>
  titles = cell.findall('.//b')
  if titles:
    #Two unicode chars (left/right quo) cause problems --> replace
    fout.write(titles[0].text_content().strip().replace(u"\u2018", "'").replace(u"\u2019", "'") + u"\t")
  else:
    fout.write(NA+T)
  #col2-5: from div class=leadFields, comma-separated
  fields = cell.find_class('leadFields')
  if fields:
    raw_fields = fields[0].text_content()
    field_split = raw_fields.split(',')
    # ['Reuters News', ' 13:33', ' 27 April 2016', ' 896 words', ' (English)']
    #col2: source
    fout.write(field_split[0] + T)
    #col3: time - optional
    has_time = ":" in field_split[1]
    date_col = 2
    words_col = 3
    if has_time:
      fout.write(field_split[1].strip() + T)
    else:
      #skip the time field
      fout.write(NA+T)
      date_col = 1
      words_col = 2
    #col4: date
    fout.write(field_split[date_col].strip() + T)
    #col5: number of words
    fwordss = [int(s) for s in field_split[words_col].split() if s.isdigit()] #get the integers
    if fwordss:
      fout.write(str(fwordss[0]) + NL)
    else:
      fout.write(NA+NL)
  else:
    fout.write(NA+T+NA+T+NA+T+NA+NL)
  fout.flush()
fout.close()
