function ucFirst(str) {
  let name;
	switch(str.length){
		case 0:
			name = '';
			break;
		default:
			name = str.replace(str[0], str[0].toLocaleUpperCase());
	}
	return name;
}

