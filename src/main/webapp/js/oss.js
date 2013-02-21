function pageLoad() {
	$(jsfId('toolbarForm:searchInput')).focus();
}

function jsfId(id) {
	return "#" + id.replace(/:/g, "\\:");
}

function stringContains(subString, value) {
	if (subString.length >= 1) {
		if (value.indexOf(subString) != -1)
			return true;
	} else
		return false;
};

function supportedBrowser() {
	if ($.browser.webkit) {
		return true;
	} else if ($.browser.msie && $.browser.version >= 9.0) {
		return true;
	} else if ($.browser.mozilla && $.browser.version >= '10.0.0') {
		return true;
	} else {
		return false;
	}
}

var processingModalTimer;

function processingModalTimeout() {
	processingModalTimer = setTimeout(function() {
		$('#processingModalInfo').hide();
		$('#processingModalTimeout').show();
	}, 15000);
}

function clearProcessingModalTimer() {
	$('#processingModalInfo').hide();
	$('#processingModalTimeout').hide();
	clearInterval(processingModalTimer);
}

var redirectTimer;

function conversationTimeout(modal, timeout, redirectTimeout) {
	if (redirectTimer != null) {
		clearInterval(redirectTimer);
	}
	setTimeout(function() {
		showTimeoutModal(modal, redirectTimeout);
	}, timeout);
}

function sessionTimeout(modal, timeout) {
	setTimeout(function() {
		modal.show();
	}, timeout);
}

function showTimeoutModal(modal, redirectTimeout) {
	modal.show();
	redirectTimer = setTimeout(function() {
		$('#redirectHomeButton').trigger('click');
	}, redirectTimeout);
}

function replaceQueryParam(link, name, value) {
	var oldHref = link.attr('href');
	var uri = $.uri(oldHref);
	uri.replaceQueryParam(name, value);
	var newHref = uri.toString();
	link.attr('href', newHref);
}