var convert = function (source) {
            var result = "";
            var host = window.location.host;
            if (host.includes("zhihu")) {
                result = zhihuTurndownService(source);
            }
            else if (host.includes("csdn")) {
                result = csdnTurndownService(source);
            }
            else if (host.includes("aliyun")) {
                result = aliyunTurndownService(source);
            }
            else if (host.includes("tencent")) {
                result = tencentTurndownService(source);
            }
            else if (host.includes("juejin")) {
                result = juejinTurndownService(source);
            }
            else if (host.includes("cnblogs")) {
                result = cnblogsTurndownService(source);
            }
            else if (host.includes("jianshu")) {
                result = jianshuTurndownService(source);
            }
            else if (host.includes("planetmath")) {
                result = planetmathTurndownService(source);
            }
            else if (host.includes("oschina")) {
                result = oschinaTurndownService(source);
            }
            else if (host.includes("segmentfault")) {
                result = segmentfaultTurndownService(source);
            }
            else if (host.includes("writebug")) {
                result = writebugTurndownService(source);
            }
            else if (host.includes("luogu")) {
                result = luoguTurndownService(source);
            }
            else if (host.includes("cxymm")) {
                result = cxymmTurndownService(source);
            }
            else if (host.includes("srcmini")) {
                result = srcminiTurndownService(source);
            }
            else if (host.includes("51cto")) {
                result = _51ctoTurndownService(source);
            }
            else if (host.includes("biancheng")) {
                result = cbianchengTurndownService(source);
            }
            else if (host.includes("infoq")) {
                result = infoqTurndownService(source);
            }
            else if (host.includes("imooc")) {
                result = imoocTurndownService(source);
            }
            else if (host.includes("sspai")) {
                result = sspaiTurndownService(source);
            }
            else if (host.includes("leetcode")) {
                result = leetcodeTurndownService(source);
            }
            else if (host.includes("baidu")) {
                result = baiduTurndownService(source);
            }
            else if (host.includes("learnku")) {
                result = learnkuTurndownService(source);
            }
            else if (host.includes("helloworld")) {
                result = helloworldTurndownService(source);
            }
            else if (host.includes("itpub")) {
                result = itpubTurndownService(source);
            }
            else {
                result = host;
            }
            return result;
        };

var defaultTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    mdContent = turndownService.turndown(tempContent);
    return mdContent;
};

var zhihuTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加公式规则
    turndownService.addRule('formula', {
        filter: function (node, options) {
            return (
                node.nodeName === 'SPAN' &&
                node.outerHTML.search("data-tex") != -1
            );
        },
        replacement: function (content, node) {
            // 注意多行公式与内联公式
            if (node.innerHTML.search("begin") != -1) {
                return '\n$$\n' + node.outerHTML.replace(/^.*?data-tex="(.*?) *?".*?$/, "$1") + '\n$$\n';
            }
            else {
                return '$' + node.outerHTML.replace(/^.*?data-tex="(.*?) *?".*?$/, "$1") + '$';
            }
        }
    });
    // 添加图片规则
    turndownService.addRule('figure', {
        filter: 'figure',
        replacement: function (content, node) {
            let description = "";
            if (node.innerHTML.search("<figcaption>") != -1) {
                description = node.innerHTML.replace(/^.*?<figcaption>(.*?)<\/figcaption>.*?$/, "$1");
            }
            return '![]('
                + node.innerHTML.replace(/^.*?src="(.*?)".*?$/, "$1") + ')  \n'
                + description;
        }
    });

    let mainTitles = htmlDoc.getElementsByClassName('Post-Title');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents1 = htmlDoc.getElementsByClassName('RichText');
    let mainContents2 = htmlDoc.getElementsByClassName('Post-RichTextContainer');
    let flag = 1;
    if (mainContents1.length === 0) {
        flag = 2;
        if (mainContents2.length === 0) {
            return mdContent;
        }
    }
    if (flag === 1) {
        tempContent = mainContents1[0].innerHTML;
    }
    else if (flag === 2) {
        tempContent = mainContents2[0].innerHTML;
    }
    else {
        return mdContent;
    }

    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var csdnTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    let mainTitles = htmlDoc.getElementsByClassName('title-article');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('article_content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;

    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var aliyunTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加代码规则
    turndownService.addRule('code', {
        filter: function (node, options) {
            return (
                node.nodeName === 'PRE'
            );
        },
        replacement: function (content, node) {
            return '\n```\n' + node.innerText + '\n```\n';
        }
    });

    let mainTitles = htmlDoc.getElementsByClassName('article-title');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('article-inner');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var tencentTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加公式规则
    turndownService.addRule('formula', {
        filter: function (node, options) {
            return (
                node.nodeName === 'SPAN'
            );
        },
        replacement: function (content, node) {
            // 注意多行公式与内联公式
            let name = node.parentNode.nodeName;
            if (name === 'FIGURE') {
                return "\n$$\n" + node.innerText + "\n$$\n";
            }
            else {
                return '$' + node.innerText + '$';
            }
        }
    });

    let mainTitles = htmlDoc.getElementsByClassName('J-articleTitle');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('J-articleContent');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var juejinTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 去除<style></style>中的内容
    turndownService.addRule('style', {
        filter: function (node, options) {
            return (
                node.nodeName === 'STYLE'
            );
        },
        replacement: function (content, node) {
            return "";
        }
    });

    // 添加数学公式规则
    turndownService.addRule('math', {
        filter: function (node, options) {
            return (
                node.nodeName === 'IMG' &&
                node['alt'].length > 0
            );
        },
        replacement: function (content, node) {
            let name = node.parentNode.nodeName;
            if (name === 'FIGURE') {
                return "\n$$\n" + node['alt'] + "\n$$\n";
            }
            else {
                return "$" + node['alt'] + "$";
            }
        }
    });

    let mainTitles = htmlDoc.getElementsByClassName('article-title');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('markdown-body');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var cnblogsTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加公式规则
    turndownService.addRule('formula1', {
        filter: function (node, options) {
            return (
                node.nodeName === 'SPAN' &&
                node.getAttribute('class') === 'math inline'
            );
        },
        replacement: function (content, node) {
            return node.innerText.replace(/\\\((.*)\\\)/, '$$$1$$');
        }
    });

    turndownService.addRule('formula2', {
        filter: function (node, options) {
            return (
                node.nodeName === 'DIV' &&
                node.getAttribute('class') === 'math display'
            );
        },
        replacement: function (content, node) {
            return node.innerText.replace(/\\\[(.*)\\\]/, '\n$$$$\n$1\n$$$$\n');
        }
    });

    let mainTitles = htmlDoc.getElementsByClassName('postTitle');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('cnblogs-markdown');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var jianshuTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加公式规则
    turndownService.addRule('formula', {
        filter: function (node, options) {
            return (
                node.nodeName === 'IMG' &&
                node.outerHTML.search("math") != -1
            );
        },
        replacement: function (content, node) {
            // 注意多行公式与内联公式
            if (node.outerHTML.search("math-inline") != -1) {
                return '$' + node.outerHTML.replace(/^.*?alt="(.*?) *?".*?$/, "$1") + '$';
            }
            if (node.outerHTML.search("math-block") != -1) {
                return '\n$$\n' + node.outerHTML.replace(/^.*?alt="(.*?) *?".*?$/, "$1") + '\n$$\n';
            }
        }
    });

    let title = "";
    let mainTitles = [];
    let tempTitles = htmlDoc.getElementsByTagName('h1');
    for (let i = 0; i < tempTitles.length; i++) {
        if (tempTitles[i].getAttribute('title').length > 0) {
            mainTitles.push(tempTitles[i]);
        }
    }
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByTagName('article');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var planetmathTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    // 加上表格会有问题
    // let gfm = turndownPluginGfm.gfm;
    // turndownService.use(gfm);

    // 添加公式规则
    turndownService.addRule('formula', {
        filter: function (node, options) {
            return (
                node.nodeName === 'math'
            );
        },
        replacement: function (content, node) {
            // 注意多行公式与内联公式
            let myplanetmathstr = node.getAttribute('alttext');
            let tempstr = "";
            if (node.getAttribute('display') === 'inline') {
                tempstr = '$' + myplanetmathstr + '$';
            }
            else if (node.getAttribute('display') === 'block') {
                tempstr = '\n$$\n' + myplanetmathstr + '\n$$\n';
            }
            else {

            }
            return tempstr;
        }
    });

    turndownService.addRule('ax', {
        filter: function (node, options) {
            return (
                node.nodeName === 'A' &&
                node.getAttribute('class') === 'nnexus_concepts'
            );
        },
        replacement: function (content, node) {
            return node.innerText;
        }
    });

    turndownService.addRule('supx', {
        filter: function (node, options) {
            return (
                node.nodeName === 'SUP' &&
                node.getAttribute('style') === 'display: none;'
            );
        },
        replacement: function (content, node) {
            return "";
        }
    });

    turndownService.addRule('imgx', {
        filter: function (node, options) {
            return (
                node.nodeName === 'IMG' &&
                node.getAttribute('alt') === 'Mathworld'
            );
        },
        replacement: function (content, node) {
            return "";
        }
    });


    let title = "";

    let mainContents = htmlDoc.getElementsByTagName('article');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var oschinaTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    let mainTitles = [];
    let title = "";
    let tempTitles = htmlDoc.getElementsByTagName('h1');
    for (let i = 0; i < tempTitles.length; i++) {
        if (tempTitles[i].getAttribute('class') === "article-box__title") {
            mainTitles.push(tempTitles[i]);
        }
    }
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var segmentfaultTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);


    let mainTitles = htmlDoc.getElementsByClassName('text-truncate-1');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByTagName('article');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var writebugTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);


    let mainTitles = htmlDoc.getElementsByClassName('title-detail');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var luoguTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);


    let mainTitles = htmlDoc.getElementsByClassName('mdui-typo-display-1-opacity');
    let title = "";
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('mdblog-article-content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var cxymmTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);


    let mainTitles = [];
    let title = "";
    let tempTitles = htmlDoc.getElementsByTagName('h2');
    for (let i = 0; i < tempTitles.length; i++) {
        if (tempTitles[i].getAttribute('style') === "line-height: 32px;") {
            mainTitles.push(tempTitles[i]);
        }
    }
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('htmledit_views');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var srcminiTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);


    let title = "";
    let mainTitles = htmlDoc.getElementsByClassName('article-title');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('article-content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var _51ctoTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加代码规则
    turndownService.addRule('pre', {
        filter: function (node, options) {
            return (
                node.nodeName === 'PRE'
            );
        },
        replacement: function (content, node) {
            return '\n```\n' + node.innerText + '\n```\n';
        }
    });

    let title = "";
    let mainTitles = htmlDoc.getElementsByClassName('article-title');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('article-content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var cbianchengTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加代码规则
    turndownService.addRule('pre', {
        filter: function (node, options) {
            return (
                node.nodeName === 'PRE'
            );
        },
        replacement: function (content, node) {
            return '\n\n```' + node.className + '\n' + node.innerText + '\n```\n\n';
        }
    });

    let title = "";
    let mainTitles = htmlDoc.getElementsByTagName('h1');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = [];
    let tempDivs = htmlDoc.getElementsByTagName('div');

    for (let i = 0; i < tempDivs.length; i++) {
        if (tempDivs[i].id === 'arc-body') {
            mainContents.push(tempDivs[i]);
        }
    }

    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var infoqTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加规则
    turndownService.addRule('removecopy', {
        filter: function (node, options) {
            return (
                node.nodeName === 'DIV' &&
                node.hasAttribute('data-codeblock-copy')
            );
        },
        replacement: function (content, node) {
            return "";
        }
    });

    let title = "";
    let mainTitles = htmlDoc.getElementsByClassName('article-title');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('article-preview');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var imoocTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加规则
    turndownService.addRule('removeshowmore', {
        filter: function (node, options) {
            return (
                node.nodeName === 'DIV' &&
                node.className === 'showMore'
            );
        },
        replacement: function (content, node) {
            return "";
        }
    });

    let title = "";
    let mainTitles = htmlDoc.getElementsByClassName('detail-title');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('detail-content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var sspaiTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    let title = "";
    let mainTitles = htmlDoc.getElementsByClassName('title');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var leetcodeTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    // 添加规则
    turndownService.addRule('pre', {
        filter: function (node, options) {
            return (
                node.nodeName === 'PRE'
            );
        },
        replacement: function (content, node) {
            return "\n```\n" + node.innerText + "\n```\n";
        }
    });

    let title = "";
    let mainTitles = htmlDoc.getElementsByClassName('css-izy0el-Title');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('css-eojhts-StyledMarkdown');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var baiduTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    let title = "";
    let mainTitles = htmlDoc.getElementsByTagName('h1');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('markdown-body');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var learnkuTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    let title = "";
    let mainTitles = htmlDoc.getElementsByTagName('h1');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('markdown-body');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var helloworldTurndownService = function (htmlContent) {
    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    let title = "";
    let mainTitles = htmlDoc.getElementsByClassName('blog-title');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('content-body');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};

var itpubTurndownService = function (htmlContent) {

    let htmlDoc = document.createElement('html');
    htmlDoc.innerHTML = htmlContent;
    let mdContent = "失败！";
    let tempContent = htmlContent;

    let turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '* * *',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        preformattedCode: false
    });

    let gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);

    let title = "";
    let mainTitles = htmlDoc.getElementsByTagName('h3');
    if (mainTitles.length === 0) {
        title = "# 无标题\n\n";
    }
    else {
        title = "# " + mainTitles[0].innerText.trim() + "\n\n";
    }

    let mainContents = htmlDoc.getElementsByClassName('content');
    if (mainContents.length === 0) {
        return mdContent;
    }

    tempContent = mainContents[0].innerHTML;
    mdContent = title + turndownService.turndown(tempContent);
    return mdContent;
};
