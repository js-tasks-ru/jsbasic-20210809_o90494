/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
 export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    let table = document.createElement('TABLE');
    this._elem = table;
    let thead = document.createElement('THEAD');
    let tbody = document.createElement('TBODY');
    this._elem.append(thead);
    this._elem.append(tbody);

    thead.innerHTML = `<tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
      </tr>`;
     for(let i = 0; i < this.rows.length; i++) {
      let tr = document.createElement('TR');
      tbody.append(tr);
      tr.innerHTML = `
        <td>${this.rows[i].name}</td>
        <td>${this.rows[i].age}</td>
        <td>${this.rows[i].salary}</td>
        <td>${this.rows[i].city}</td>
        <td><button>X</button></td>
      `; 
      let btn = tr.querySelector('BUTTON');
      btn.addEventListener('click', event => {
        event.target.closest('tr').remove();
      });        
    }
  }
  get elem() {
    return this._elem;
  }
}
