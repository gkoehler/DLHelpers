DLHelpers
=========

A quick Node.js script to help with your initial import of movie files into Delicious Library.

To use, pipe your list of movies into this script. The output will be a tab-delimited list of proper movie titles and Amazon URLs. You can then pipe this list into a .txt file, which can be imported into Delicious Library. 

Example:

    > ls /path/to/movie/files/ | node GetAmazonLinks.js > results.txt

Then, in Delicious Library, go to File->Import from file, choose results.txt, and choose "tab-delimited." Adjust so that the first column is the Title, and the second is the Amazon URL. Once the import is finished, select all and do Command-R to refresh the thumbnails. 
