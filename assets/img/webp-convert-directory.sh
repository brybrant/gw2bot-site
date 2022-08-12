# convert all image files (jpe?g|tif|png) to .webp format in current working directory
# credit: https://gist.github.com/tabrindle/ed9f77b4e96f4c98b49b
# refer to README.md for instructions
#!/bin/bash

PARAMS=('-q 75 -m 6 -mt -af -progress')

if [ $# -ne 0 ]; then
  PARAMS=$@;
fi

cd $(pwd)

shopt -s nullglob nocaseglob extglob

for FILE in *.@(jpg|jpeg|tif|tiff|png); do 
    cwebp $PARAMS "$FILE" -o "${FILE%.*}".webp;
done