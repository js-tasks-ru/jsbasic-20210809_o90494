function truncate(str, maxlength) {
  let result;
	if(str.length > maxlength) {
		let strTruncated = str.slice(0, maxlength);
		result = strTruncated.replace(strTruncated[maxlength -1], '…');
	} else {
		result = str;
	}
	return result;
}
