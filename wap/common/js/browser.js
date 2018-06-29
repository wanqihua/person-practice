(function (win, doc, nav)
{
    /**
     * @des 浏览器判断脚本,兼容cmd规范
     */
    var ua = nav.userAgent.toLowerCase (), key =
    {
        ie : "msie",
        sf : "safari",
        tt : "tencenttraveler"
    },
    // 正则列表
    reg =
    {
        browser : "(" + key.ie + "|" + key.sf + "|firefox|chrome|opera)",
        shell : "(maxthon|360se|360chrome|theworld|se|theworld|greenbrowser|qqbrowser|lbbrowser|bidubrowser)",
        tt : "(tencenttraveler)",
        os : "(windows nt|macintosh|solaris|linux)",
        kernel : "(webkit|gecko|like gecko)"
    }, System =
    {
        "5.0" : "Win2000",
        "5.1" : "WinXP",
        "5.2" : "Win2003",
        "6.0" : "WinVista",
        "6.1" : "Win7",
        "6.2" : "Win8",
        "6.3" : "Win8.1"
    }, chrome = null, is360Chrome = null, // 360浏览器
    is360se = null, // 360级速浏览器
    // 特殊浏览器检测
    is360 = (function ()
    {
        // 高速模式
        var result = ua.indexOf ("360chrome") > -1 ? !!1 : !1, s;
        // 普通模式
        try
        {
            if (win.external && win.external.twGetRunPath)
            {
                s = win.external.twGetRunPath;
                if (s && s.indexOf ("360se") > -1)
                {
                    result = !!1;
                }
            }
        }
        catch (e)
        {
            result = !1;
        }
        return result;
    }) (),
    // 判断百度浏览器
    isBaidu = (function ()
    {
        return ua.indexOf ('bidubrowser') > -1 ? !!1 : !1;
    }) (),
    // 判断百度影音浏览器
    isBaiduPlayer = (function ()
    {
        return ua.indexOf ('biduplayer') > -1 ? !!1 : !1;
    }) (),
    // 判断爱帆avant浏览器
    isAvant = (function ()
    {
        return ua.indexOf ('爱帆') > -1 ? !!1 : !1;
    }) (), isLiebao = (function ()
    {
        return ua.indexOf ('lbbrowser') > -1 ? !!1 : !1;
    }) (),
    // 特殊检测maxthon返回版本号
    maxthonVer = function ()
    {
        try
        {
            if (/(\d+\.\d)/.test (win.external.max_version))
            {
                return parseFloat (RegExp['\x241']);
            }
        }
        catch (e)
        {
        }
    } (), browser = getBrowser (), shell = uaMatch (reg.shell), os = uaMatch (reg.os), kernel = uaMatch (reg.kernel);
     
    // ie11
    function getBrowser ()
    {
        // 检测是否是ie内核 是否是ie10 标识
        if ((!!win.ActiveXObject || "ActiveXObject" in win)
                && (ua.match (/.net clr/gi) && ua.match (/rv:(\w+\.\w+)/gi)))
        {
            return [
                    "msie", ua.match (/rv:(\w+\.\w+)/gi)[0].split (":")[1]
            ];
        }
        return uaMatch (reg.browser);
    }
     
    /**
     * 对ua字符串进行匹配处理
     * 
     * @param {string}
     *            str 要处理的字符串
     * @return {array} 返回处理后的数组
     */
    function uaMatch (str)
    {
         
        var reg = new RegExp (str + "\\b[ \\/]?([\\w\\.]*)", "i"), result = ua.match (reg);
         
        return result ? result.slice (1) : [
                "", ""
        ];
    }
     
    function detect360chrome ()
    {
        return 'track' in document.createElement ('track') && 'scoped' in document.createElement ('style');
    }
     
    function isHao123 ()
    {
        return !!(window.external && window.external.ExtGetAppPath && window.external.ExtGetAppPath ());
    }
     
    function isIpad ()
    {
        return ua.indexOf ("ipad") > -1 || ua.indexOf ("iphone") > -1;
    }
     
    function canvasSupport ()
    {
        return !!document.createElement ('canvas').getContext;
    }
    // 保存浏览器信息
    if (browser[0] === key.ie)
    {
        if (is360)
        {
            shell = [
                    "360se", ""
            ];
        }
        else if (maxthonVer)
        {
            shell = [
                    "maxthon", maxthonVer
            ];
        }
        else if (shell == ",")
        {
            shell = uaMatch (reg.tt);
        }
    }
    else if (browser[0] === key.sf)
    {
        browser[1] = uaMatch ("version") + "." + browser[1];
    }
     
    chrome = (browser[0] == "chrome") && browser[1];
     
    // 如果是chrome浏览器，进一步判断是否是360浏览器
    if (chrome)
    {
        if (detect360chrome ())
        {
            if ('v8Locale' in window)
            {
                is360Chrome = true;
            }
            else
            {
                is360se = true;
            }
        }
    }
     
    /*
     * 获取操作系统
     */
    function getSystem ()
    {
        var plat = navigator.platform, isWin = (plat == "Win32") || (plat == "Windows") || (plat == "Win64"), isMac = (plat == "Mac68K")
                || (plat == "MacPPC") || (plat == "Macintosh") || (plat == "MacIntel");
        if (isMac)
        {
            return "Mac";
        }
        var isUnix = (plat == "X11") && !isWin && !isMac;
        if (isUnix)
        {
            return "Unix";
        }
        var isLinux = (String (plat).indexOf ("Linux") > -1);
        if (isLinux)
        {
            return "Linux";
        }
        if (isWin)
        {
            return System[os[1]] || "other";
        }
        return "other";
    }
     
    // 遵循cmd规范，输出浏览器、系统等响应参数
    window.exports =
    {
        cookieEnabled : navigator.cookieEnabled,
        isStrict : (doc.compatMode == "CSS1Compat"),
        isShell : !!shell[0],
        shell : shell,
        kernel : kernel,
        platform : os,
        types : browser,
        chrome : chrome,
        system : getSystem (),
        firefox : (browser[0] == "firefox") && browser[1],
        ie : (browser[0] == "msie") && browser[1],
        opera : (browser[0] == "opera") && browser[1],
        safari : (browser[0] == "safari") && browser[1],
        maxthon : (shell[0] == "maxthon") && shell[1],
        isTT : (shell[0] == "tencenttraveler") && shell[1],
        is360 : is360,
        is360Chrome : is360Chrome, // 是否是chrome内核的360浏览器
        is360se : is360se, // 是否是chrome内核的360极速浏览器
        isBaidu : isBaidu,
        isHao123 : isHao123, // 判断hao123浏览器
        isLiebao : isLiebao,
        isSougou : (shell[0] == "se"),
        isQQ : shell[0] == "qqbrowser",
        isIpad : isIpad,
        version : '',
        noDl : isBaidu || isAvant || isBaiduPlayer, // 浏览器下载入口需排除的浏览器
        canvasSupport : canvasSupport () // 是否支持canvas
    };
    
}) (window, document, navigator);