/**
 * Splits / Extracts the current url or a given one into its partials.
 *
 * @param   {string|null} url - URL-String
 * @returns {Object}
 */
function urlSplit(url) {
    'use strict';

    // If no url is given the current page request will be taken.
    url = url ? url : getUrl();


    /**
     * Returns the protocol of the given url.
     *
     * @returns {string}
     */
    function getProtocol() {
        var splitDomain = url.split('://');

        return (splitDomain[1] ? splitDomain[0] : '');
    }


    /**
     * Returns the authorization of the given url.
     * A normal syntax of an authorization is {username}:{password}@example.com or only {username}@example.com
     *
     * @returns {string}
     */
    function getAuthorization() {
        var protocol = getProtocol(),
            authorization, domainSplit;

        if (protocol) {
            url = url.replace(protocol + '://', '');
        }

        domainSplit   = url.split('@');
        authorization = domainSplit[1] ? domainSplit[0] : '';

        return authorization;
    }


    /**
     * Returns the username from the authorization part of the given url.
     *
     * @returns {string}
     */
    function getUsername() {
        var authorization      = getAuthorization(),
            authorizationSplit = authorization.split(':');

            return authorizationSplit[0];
    }


    /**
     * Returns the password from the authorization part of the given url.
     *
     * @returns {string}
     */
    function getPassword() {
        var authorization      = getAuthorization(),
            authorizationSplit = authorization.split(':');

        return (authorizationSplit[1] ? authorizationSplit[1] : '');
    }


    /**
     * Returns the complete domain of the given url.
     *
     * @returns {string}
     */
    function getDomain() {
        var protocol      = getProtocol(),
            authorization = getAuthorization(),
            domain;

        if (protocol) {
            url = url.replace(protocol + '://', '');
        }

        if (authorization) {
            url = url.replace(authorization + '@', '');
        }

        // Remove request and port if exists
        domain = url.split('/')[0].split(':')[0];

        return domain;
    }


    /**
     * Returns the port of the given url.
     *
     * @returns {string}
     */
    function getPort() {
        var protocol      = getProtocol(),
            authorization = getAuthorization(),
            urlReplace    = url.replace(protocol + '://', '').replace(authorization + '@', ''),
            urlSplit      = urlReplace.split('/')[0].split(':');

        return (urlSplit[1] !== undefined ? urlSplit[1] : '');
    }


    /**
     * Returns the domain parts of the given url as array.
     *
     * @returns {Array}
     */
    function getDomainList() {
        var domain = getDomain();

        return domain.split('.');
    }


    /**
     * Returns the domain parts of the given url as array in order of their level.
     *
     * @returns {Array}
     */
    function getDomainLevels() {
        var domainList = getDomainList();

        return (domainList.slice().reverse());
    }


    /**
     * Returns the request of the given url.
     *
     * @returns {string}
     */
    function getRequest() {
        var protocol      = getProtocol(),
            authorization = getAuthorization(),
            domain        = getDomain(),
            port          = getPort(),
            request, replace;

        replace = url.replace(protocol + '://', '');
        replace = replace.replace(authorization + '@', '');
        replace = replace.replace(domain, '');
        request = replace.replace(':' + port, '');

        return request ;
    }


    /**
     * Returns the path from the request part of the given url.
     *
     * @returns {string}
     */
    function getPath() {
        var request = getRequest();

        return request.split('?')[0];
    }


    /**
     * Returns the path parts from the request part of the given url as array.
     *
     * @returns {Array}
     */
    function getPathList() {
        var path     = getPath(),
            pathList = path.split('/'),
            amount   = pathList.length,
            i;

        for (i = 0; i < amount; i++) {
            pathList[i] = pathList[i];

            if (i < amount - 1) {
                pathList[i] = pathList[i] + '/';
            }
            else {
                if (pathList[i] === '') {
                    pathList.splice(-1);
                }
                else {
                    pathList[i] = pathList[i];
                }
            }
        }

        return pathList;
    }


    /**
     * Returns the file from the request part of the given url.
     *
     * @returns {string}
     */
    function getFile() {
        var pathList = getPathList(),
            lastItem = pathList[(pathList.length - 1)],
            file, itemSplitDash, itemSplitDot;

        if (lastItem) {
            itemSplitDash = lastItem ? lastItem.split('/') : '';

            if (itemSplitDash.length > 1) {
                file = '';
            }
            else {
                itemSplitDot = lastItem.split('.');
                file         = itemSplitDot[1] ? lastItem : itemSplitDot[0];
            }
        }
        else {
            file = '';
        }

        return file;
    }


    /**
     * Returns the filename from the request part of the given url.
     *
     * @returns {string}
     */
    function getFileName() {
        var file      = getFile(),
            fileSplit = file.split('.'),
            fileName;

        if (fileSplit.length > 1) {
            fileName = fileSplit.slice(0, -1).join('.');
        }
        else {
            fileName = fileSplit[0];
        }

        return fileName;
    }


    /**
     * Returns the file extension from the request part of the given url.
     *
     * @returns {string}
     */
    function getFileExtension() {
        var file         = getFile(),
            fileName     = getFileName(),
            fileReplaced = file.replace(fileName , '');

          return (fileReplaced[0] == '.' ? fileReplaced.replace('.', '') : fileReplaced);
    }


    /**
     * Returns the directory from the request part of the given url.
     *
     * The directory is the path excluding the requested file.
     * 
     * @returns {string}
     */
    function getDirectory() {
        var directoryList = getDirectoryList();

        return (directoryList.join(''));
    }


    /**
     * Returns the directory parts from the request part of the given url as array.
     *
     * The directory parts are the path parts excluding the file.
     *
     * @returns {Array}
     */
    function getDirectoryList() {
        var pathList = getPathList(),
            file     = getFile(),
            directoryList;

        if (file) {
            directoryList = pathList.slice(0, -1);
        }
        else {
            directoryList = pathList;
        }

        return directoryList;
    }


    /**
     * Returns the query from the request part of the given url.
     *
     * The query is also known as the search part of a request.
     * 
     * @returns {string}
     */
    function getQuery() {
        var request      = getRequest(),
            requestSplit = request.split('?');

        return (requestSplit[1] !== undefined ? requestSplit[1].split('#')[0] : '');
    }


    /**
     * Returns the query parts from the request part of the given url as array.
     *
     * @returns {Array}
     */
    function getQueryList() {
        var query = getQuery();

        return (query.split('&'));
    }


    /**
     * Returns all parameters from the request part of the given url as object list.
     *
     * @returns {Object}
     */
    function getQueryObject() {
        var queryList       = getQueryList(),
            amount          = queryList.length,
            parameterObject = {},
            i, item;



        for (i = 0; i < amount; i++) {
            item = queryList[i].split('=');

            if (item[0] !== undefined && item[1] !== undefined) {
                parameterObject[item[0]] = item[1];
            }
        }

        return parameterObject;
    }


    /**
     * Returns the value of the given parameter in the given url.
     *
     * @param   {string} param
     * @returns {string}
     */
    function getQueryValue(param) {
        var parameterObject = getQueryObject(),
            value, item;

        for (item in parameterObject) {
            if (parameterObject.hasOwnProperty(item) && item == param) {
                value = parameterObject[item];
            }
        }

        return value;
    }


    /**
     * Returns the fragment from the request part of the given url.
     *
     * The fragment is also known as anchor.
     * 
     * @returns {string}
     */
    function getFragment() {
        var request      = getRequest(),
            requestSplit = request.split('#');

        return (requestSplit[1] !== undefined ? requestSplit[1] : '');
    }

    // -----------------------------------------------------------------------------------------------------------------

    /**
     * Returns the url of the current page request.
     *
     * @returns {string}
     */
    function getUrl() {
        return window.location.href;
    }


    function getAll() {
        return {
            protocol      : getProtocol(),
            authorization : getAuthorization(),
            username      : getUsername(),
            password      : getPassword(),
            domain        : getDomain(),
            port          : getPort(),
            domainList    : getDomainList(),
            domainLevels  : getDomainLevels(),
            request       : getRequest(),
            path          : getPath(),
            pathList      : getPathList(),
            file          : getFile(),
            fileName      : getFileName(),
            fileExtension : getFileExtension(),
            directory     : getDirectory(),
            directoryList : getDirectoryList(),
            query         : getQuery(),
            queryList     : getQueryList(),
            queryObject   : getQueryObject(),
            fragment      : getFragment()
        };
    }

    // -----------------------------------------------------------------------------------------------------------------

    return {
        getAll             : getAll,
        getProtocol        : getProtocol,
        getAuthorization   : getAuthorization,
        getUsername        : getUsername,
        getPassword        : getPassword,
        getDomain          : getDomain,
        getPort            : getPort,
        getDomainList      : getDomainList,
        getDomainLevels    : getDomainLevels,
        getRequest         : getRequest,
        getPath            : getPath,
        getPathList        : getPathList,
        getFile            : getFile,
        getFileName        : getFileName,
        getFileExtension   : getFileExtension,
        getDirectory       : getDirectory,
        getDirectoryList   : getDirectoryList,
        getQuery           : getQuery,
        getQueryList       : getQueryList,
        getFragment        : getFragment,
        getQueryObject     : getQueryObject,
        getQueryValue      : getQueryValue
    }
}
