(function () {var recptc = $('recptc');var idhash = recptc.className;var showid = 'seccode_' + idhash;var onloadid = 'grecol_' + idhash;if (BROWSER.ie && BROWSER.ie < 10) {$('v' + showid).innerHTML = '您的浏览器版本过低，无法加载reCAPTCHA验证码，建议使用非IE浏览器。';} else {var data = recptc.innerText;appendscript('https://www.recaptcha.net/recaptcha/api.js?onload=grec_ol'+idhash, '', 1);var sectpl = seccheck_tpl[idhash] != '' ? seccheck_tpl[idhash].replace(/<hash>/g, 'code' + idhash).replace(/_menu/g, '_hidden') : '';var sectplcode = sectpl != '' ? sectpl.split('<sec>') : Array('<br />', ': ', '<br />', '');var string = sectplcode[0] + "人機驗證" + sectplcode[1] + '<input name="seccodehash" type="hidden" value="' + idhash + '" /><span id="checkseccodeverify_' + idhash + '" style="display:none"><img src="https://cdn.jsdelivr.net/gh/myfakecode/CDN@master/static/image/common/check_right.gif" width="16" height="16" class="vm"></span><input name="seccodeverify" id="seccodeverify_' + idhash + '" type="hidden" value="' + idhash + '" /><div class="g-recaptcha" data-sitekey="6LfrJRUgAAAAAA7uvsvYhTDCbTxXRq1wGAq2qg3b"></div><span id="' + onloadid + '"><img src="https://cdn.jsdelivr.net/gh/myfakecode/CDN@master/static/image/common/loading.gif" class="vm"></span><a class="xi2" style="margin-left:6px" href="misc.php?mod=faq"><img src="https://cdn.jsdelivr.net/gh/myfakecode/CDN@master/static/image/common/info_small.gif" class="vm" onmouseover="showTip(this)" tip="驗證碼如無法加載1、請嘗試修改本地DNS為【1.1.1.1或8.8.8.8】后重試。2、如果您使用了代理軟件，請嘗試關閉代理后重試。"></a>' + sectplcode[2] + sectplcode[3];$(showid).innerHTML = string;setTimeout(function () {$(onloadid).innerHTML = data;}, 2000);var r9=$('seccodeverify_'+idhash).form;if(r9&&!r9.hasAttribute('data-recaptcha')){r9.setAttribute('data-recaptcha',idhash);r9.addEventListener('submit',function(){setTimeout(function(){updateseccode(idhash)}, 2000)});}}window['grec_ol'+idhash] = function () {display(onloadid);}})()
