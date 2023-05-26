// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      /////////////////////////////////////////////////////
      //reduce the row to singular value
        //if that value is greater than 1: you gotta problem bro, return true
        //else return false

      let potentialConflicts = rowIndex.reduce((acc, curr) => acc + curr);

      return (potentialConflicts > 1 ? true : false);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //arguing each nested array to hasRowConflict
        //if ER is true, return true


      //relabel attributes for easier access
      const rows = this.attributes;
      //loop over all first N keys, arguing their values to hasRowConflictsAt
      for (let i = 0; i < rows.n-1; i++) {
        let index = i.toString();
        if (this.hasRowConflictAt(rows[index])) return true;
      }

        //if true is returned, we can return true;
        //otherswise return false
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(currentColumn) {
      let potentialConflicts = currentColumn.reduce((acc, curr) => acc + curr);
      return (potentialConflicts > 1 ? true : false);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      for (let c = 0; c < this.attributes.n-1; c++) {
        const column = [];

        for (let r = 0; r < this.attributes.n-1; r++) {
          column.push(this.attributes[r][c]);
        }
        if (this.hasColConflictAt(column)) return true;
      }


      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      const result = [];
      // console.log('Board: ', this.attributes)
      //loop over array of rows
      for (let r = 0; r < this.attributes.n; r++) {
        //loop over columns
        for (let c = 0; c < this.attributes.n; c++) {
          //have access to coordinance
          //formula ((r+c+1)*board[r][c])
              //push this result to result array

          let checkedTile = (r-c+1) * this.attributes[r][c];
          // console.log('location is: ', this.attributes[r][c])
          if (checkedTile > 0) result.push(checkedTile);
        }
      }

      // [2, 3, 4, 6, 4, 1] => repeat of the 4, therefore true there is a conflict.
      // console.log('result is: ', result)

      if (result.length < 1) return false;
      // console.log((result.some((val, i) => result.indexOf(val) !==i)));
      return (result.some((val, i) => result.indexOf(val) !==i));
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      /////////////////////////////
      //declare result array

      //loop over array of rows
        //loop over columns
          //have access to coordinance
          //formula ((r+c+1)*board[r][c])
            //if (>0)
              //push this result to result array

      /////////////////////////////
    //   return false; // fixme
    // },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      /////////////////////////////
      //declare result array
      const result = [];
      // console.log('Board: ', this.attributes)
      //loop over array of rows
      for (let r = 0; r < this.attributes.n; r++) {
        //loop over columns
        for (let c = 0; c < this.attributes.n; c++) {
          //have access to coordinance
          //formula ((r+c+1)*board[r][c])
              //push this result to result array

          let checkedTile = (r+c+1) * this.attributes[r][c];
          // console.log('location is: ', this.attributes[r][c])
          if (checkedTile > 0) result.push(checkedTile);
        }
      }

      // [2, 3, 4, 6, 4, 1] => repeat of the 4, therefore true there is a conflict.
      // console.log('result is: ', result)

      if (result.length < 1) return false;
      // console.log((result.some((val, i) => result.indexOf(val) !==i)));
      return (result.some((val, i) => result.indexOf(val) !==i));
      /////////////////////////////
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
