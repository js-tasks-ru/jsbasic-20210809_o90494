function makeFriendsList(friends) {
  let list = document.createElement('UL');
  friends.forEach(element => {
    let listItem = `<li>${element.firstName} ${element.lastName}</li>`
    list.insertAdjacentHTML('beforeEnd', listItem);
  });
  return list;
}
