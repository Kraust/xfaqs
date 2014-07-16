//REVEAL SPOILERS (MOBILE)

function spoil_reveal(msgid)
{
	var msg = document.getElementById(msgid).getElementsByClassName('fspoiler');
	for(var m=0; m < msg.length; m++)
	{
		msg[m].style.color = '#fff';
		msg[m].style.backgroundColor = '#111';
	}

	var msg = document.getElementById(msgid).getElementsByTagName('s');
	for(var m=0; m < msg.length; m++)
	{
		msg[m].style.color = '#fff';
		msg[m].style.backgroundColor = '#111';
	}
}

function txtTag(tag)
{
	var currTag = document.getElementsByName(tag)[0];
	var tagStart = "<"+tag+">";
	var tagEnd = "</"+tag+">";
	var c = msgArea.selectionStart;
	var selPre = msgArea.value.substr(0,c);
	var selPost = msgArea.value.substr(msgArea.selectionEnd);
	var selTxt;

	if(c!=undefined)
	{
		selTxt = msgArea.value.substr(c,msgArea.selectionEnd-c);
	}
	if(selTxt.length<1)
	{
		if(currTag.className.indexOf('active')>0)
		{
			msgArea.value = [msgArea.value.slice(0,c),tagEnd,msgArea.value.slice(c)].join('');
			var rm = currTag.className.indexOf(' active');
			var p = c+tagEnd.length;
			currTag.className = currTag.className.substr(0,rm);
			currTag.style.color = '#000';
			setPos(msgArea,p);
		}
		else
		{
			msgArea.value = [msgArea.value.slice(0,c),tagStart,msgArea.value.slice(c)].join('');
			var p = c+tagStart.length;
			currTag.className += " active";
			currTag.style.color = '#6564ff';
			setPos(msgArea,p);
		}
	}
	else
	{
		msgArea.value = selPre+tagStart+selTxt+tagEnd+selPost;
		var p = c+tagStart.length+selTxt.length+tagEnd.length;
		setPos(msgArea,p);
	}
}

function setPos(m,p)
{
	if(m.setSelectionRange)
	{
		m.focus();
		m.setSelectionRange(p,p);
	}
	else if(m.createTextRange)
	{
		var r = m.createTextRange();
		r.collapse(true);
		r.moveEnd('character',p);
		r.moveStart('character',p);
		r.select();
	}
}

//QUICK QUOTE

function quick_quote(b,t,m)
{
	if(window.getSelection().toString().length>0)
	{
		var mb = window.getSelection().getRangeAt(0).startContainer;
		var msghi = mb.parentNode.getAttribute('name');
		if(msghi==null)
		{
			while(mb.className!='msg_body')
				mb = mb.parentNode;
			msghi = mb.getAttribute('name');
		}
		var msghitxt = window.getSelection().toString();
		if(msghi==m)
			ajax_plus("/features/quote/pick.php", "key={$xsrf_key}&hi=1&bid="+b+"&tid="+t+"&mid="+m, got_quote_hi, msghitxt);
		else
			ajax("/features/quote/pick.php", "key={$xsrf_key}&bid="+b+"&tid="+t+"&mid="+m, got_quote);
	}
	else
		ajax("/features/quote/pick.php", "key={$xsrf_key}&bid="+b+"&tid="+t+"&mid="+m, got_quote);
}

function got_quote(data)
{
	var msg = document.getElementsByName('messagetext')[0];
	var s = data.replace(/\&lt;/gi,"<").replace(/\&gt;/gi,">").replace(/\&amp;/gi,"&").replace(/\&quot;/gi,'"');
	msg.value += s;
	setPos(msg,msg.value.length);
}

function got_quote_hi(data)
{
	var msg = document.getElementsByName('messagetext')[0];
	var s = data.replace(/\&lt;/gi,"<").replace(/\&gt;/gi,">").replace(/\&amp;/gi,"&").replace(/\&quot;/gi,'"');
	msg.value += s+"\r\r";
	setPos(msg,msg.value.length);
}