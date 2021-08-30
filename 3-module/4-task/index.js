function showSalary(users, age) {
  let str = '';
  let arrFiltered = users.filter((item) =>  item['age'] < age || item['age'] == age );
  arrFiltered.forEach((el, i) => {
    if((i + 1) == arrFiltered.length) {
      str += `${el.name}, ${el.balance}`
    } else {
      str +=`${el.name}, ${el.balance}\n`
    }
  });
  return str; 
}
