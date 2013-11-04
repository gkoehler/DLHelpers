DLHelpers
=========

A set of (very rudimentary) Node.js scripts to help with your initial import of digital media into Delicious Library.

## GetAmazonLinksForMovieFiles.js

This script takes a list of movie files (which you can gather from `ls`) and creates a text file which you can import into DL. After the import, DL will have all the covers and other metadata.

To use, pipe your list of movies into this script. The output will be a tab-delimited list of proper movie titles and Amazon URLs. You can then redirect the output from this list into a .txt file, which can be imported into Delicious Library. 

Example:

    > ls /path/to/movie/files/ | node GetAmazonLinksForMovieFiles.js > results.txt

Then, in Delicious Library, go to File->Import from file, choose results.txt, and choose "tab-delimited." Adjust so that the first column is the Title, and the second is the Amazon URL. Once the import is finished, select all and do Command-R to refresh the thumbnails and other metadata.

## GetAmazonLinksForKindleCollection.js

Use this script to read your kindle library and import it into Delicious Library.

To use, go to kindle.amazon.com in your web browser and save the web page which lists all of your books. If there are multiple pages, save them as multiple files.

Then, specify the file (or multiple files) when you run this script. Redirecting the output will give you a tab-delimited text file, which you can import into DL:

    > node GetAmazonLinksForKindleCollection.js -file=Amazon1.html -file=Amazon2.html > results.txt 

Known limitations:
    * Input files can't have spaces in the names
    * Sometimes results can be inaccurate. You'll definitely want to spot-check.
    * The scripts don't tell you if it can't find one of your titles on Amazon
    * No distinction between BluRay and DVD (or even VHS). The script uses whatever comes up first.







