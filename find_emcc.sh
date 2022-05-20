echo -e ${PATH//":"/"\n"} | xargs -I % find "%" -maxdepth 1 -name "*emcc*" 2>/dev/null | xargs -I % dirname % | xargs -I % realpath "%/.."
