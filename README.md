# polygon-download

This script can be used to download all poly.google.com assets before the sevice shuts down on June 30th.

`npm install`
`node getAssets.js`

To run multiple download jobs in parallel you can run this script from multiple docker containers and set `PAGE_START` and `PAGE_END` environment variables to specify download range for each container (0-7657).

### Using in Docker
1. Build your own image or use the existing image `quay.io/daniel_fan/polydownloader:latest `
```
docker build -t <image-name:tag> -f Dockerfile . 
```

2. Run the image with env variable `PAGE_START` and `PAGE_END`, the files will be downloaded into each directory which is sorted by page number.
```
docker run -v $(pwd):/project/models -e PAGE_START=1 -e PAGE_END=2 quay.io/daniel_fan/polydownloader:latest
```

WARNING, there seems to be an [issue with the download script](https://www.reddit.com/r/DataHoarder/comments/nuxo3g/comment/h14awir)
