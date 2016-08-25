# urlSplit.js

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

## Demo / Example / Try it

[Click to try a demo of the latest urlSplit.js version](https://hans-sperling.github.io/urlSplit.js/)

## Initialize
```javascript

    var url = urlSplit(); // Call with current url
    
    // or
    var url = urlSplit('https://your.supersweet-domain.com/index.html?search=products');
    
    url.getQueryValue('search'); // Returns : 'products'
```


## Methods

### getQueryValue(param);
- Argument(s): `string` **param** - Parameter in the url query
- Return: `string|null` The value of the given parameter or null if the parameter doesn't exist


## Example

```javascript
    var urlString      = 'https://username:password@www.subdomain.example.com:1234/folder/subfolder/index.html?search=products&sort=false#top',
        url            = urlSplit(urlString),
        urlQueryParam1 = url.getQueryValue('search'),
        urlQueryParam2 = url.getQueryValue('sort'),
        urlQueryParam3 = url.getQueryValue('undefined');

    console.log('url: ', url);

    /* Output:
     * {
     *     protocol      : 'https',
     *     authorization : 'username:password,
     *     username      : 'username',
     *     password      : 'password',
     *     domain        : 'www.subdomain.example.com',
     *     port          : '1234',
     *     domainList    : ['www', 'subdomain', 'example', 'com'],
     *     domainLevels  : ['com', 'example', 'subdomain', 'www'],
     *     request       : '/folder/subfolder/index.html?search=products&sort=false#top',
     *     path          : '/folder/subfolder/index.html',
     *     pathList      : ['/', 'folder/', 'subfolder/', 'index.html'],
     *     file          : 'index.html',
     *     fileName      : 'index',
     *     fileExtension : 'html',
     *     directory     : '/folder/subfolder/',
     *     directoryList : ['/', 'folder/', 'subfolder/'],
     *     query         : 'search=products&sort=false#top',
     *     queryList     : ['search=products', 'sort=false'],
     *     queryObject   : { search: products, sort: false},
     *     fragment      : 'top',
     *     getQueryValue : getQueryValue(param)
     * }
     */

    console.log('urlQueryParam1: ', urlQueryParam1);

    // Output: 'products'


    console.log('urlQueryParam2: ', urlQueryParam2);

    // Output: 'false'


    console.log('urlQueryParam3: ', urlQueryParam3);

    // Output: null
```
