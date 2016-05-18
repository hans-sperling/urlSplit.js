# urlSplit

Splits / Extracts the current url or a given one into its partials.

## Parts of an regular web url
                                                            | request ----------------------------------------------- |
                                                            | path ------------------- |                              |
            | authorization | | domain -------------- |     | directory ---- || file - | | query ---------------- |   |
            |               | |                       |     |                ||        | |                        |   |
    https://username:password@www.subdomain.example.com:1234/folder/subfolder/index.html?search=products&sort=false#top
    |       |        |        |   |         |       |   |   |       |         |     |    |      |        |    |     |
    |       username |        |   |         |       |   |   folder  folder    |     |    |      value    |    value |
    protocol         password |   |         |       |   port                  |     |    parameter       parameter  |
                              |   |         |       1st-level-domain          |     file-extension                  fragment
                              |   |         2nd-level-domain                  filename
                              |   3rd-level-domain
                              4th-level-domain

## Methods

- getProtocol();
- getAuthorization();
- getUsername();
- getPassword();
- getDomain();
- getPort();
- getDomainList();
- getDomainLevels();
- getRequest();
- getPath();
- getPathList();
- getFile();
- getFileName();
- getFileExtension();
- getDirectory();
- getDirectoryList();
- getQuery();
- getQueryList();
- getQueryObject();
- getQueryValue(param);
- getFragment();


## Usage

```javascript
    var url = 'https://username:password@www.subdomain.example.com:1234/folder/subfolder/index.html?search=products&sort=false#top';
       
    console.log(urlSplit(url).getProtocol());          // 'https'
    console.log(urlSplit(url).getAuthorization());     // 'username:password
    console.log(urlSplit(url).getUsername());          // 'username'
    console.log(urlSplit(url).getPassword());          // 'password'
    console.log(urlSplit(url).getDomain());            // 'www.subdomain.example.com'
    console.log(urlSplit(url).getPort());              // '1234'
    console.log(urlSplit(url).getDomainList());        // ['www', 'subdomain', 'example', 'com']
    console.log(urlSplit(url).getDomainLevels());      // ['com', 'example', 'subdomain', 'www']
    console.log(urlSplit(url).getRequest());           // '/folder/subfolder/index.html?search=products&sort=false#top'
    console.log(urlSplit(url).getPath());              // '/folder/subfolder/index.html'
    console.log(urlSplit(url).getPathList());          // ['/', 'folder/', 'subfolder/', 'index.html']
    console.log(urlSplit(url).getFile());              // 'index.html'
    console.log(urlSplit(url).getFileName());          // 'index'
    console.log(urlSplit(url).getFileExtension());     // 'html'
    console.log(urlSplit(url).getDirectory());         // '/folder/subfolder/'
    console.log(urlSplit(url).getDirectoryList());     // ['/', 'folder/', 'subfolder/']
    console.log(urlSplit(url).getQuery());             // 'search=products&sort=false#top'
    console.log(urlSplit(url).getQueryList());         // ['search=products', 'sort=false']
    console.log(urlSplit(url).getQueryObject());       // { search: products, sort: false}
    console.log(urlSplit(url).getQueryValue('search'); // 'products'
    console.log(urlSplit(url).getQueryValue('sort');   // 'false'
    console.log(urlSplit(url).getFragment());          // 'top'
```
