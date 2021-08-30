function camelize(str) {
  let arr = str.split('');
  for(i = 0; i < arr.length; i++) {
    if(arr[i] == "-") {
      arr.splice(i, 1);
      arr.splice(i, 1, arr[i].toUpperCase());
    }
  } 
  str = arr.join('');
  return str; 
}
