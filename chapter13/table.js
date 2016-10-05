/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 13
 * Build a table
 */

/**
 * Builds a table based on the data passed.
 * @param  array data
 * @return ElementNode
 */
function buildTable(data) {
  var table       = document.createElement('table');
  var tableHeader = document.createElement('tr');
  table.appendChild(tableHeader);

  var keys = Object.keys(data[0]);

  for (var i = 0; i < keys.length; i++) {
    var division = document.createElement('td');
    tableHeader.appendChild(division);

    division.appendChild(document.createTextNode(keys[i]));
  }

  for (var i = 0; i < data.length; i++) {
    var mountain = data[i];
    var row = document.createElement('tr');
    table.appendChild(row);

    for (info in mountain) {
      var division = document.createElement('td');
      division.appendChild(document.createTextNode(mountain[info]));

      if (info == 'height')
        division.style.textAlign = 'right';

      row.appendChild(division);
    }
  }

  return table;
}
