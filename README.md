[![npm version](https://img.shields.io/npm/v/js-undo-redo.svg)](https://www.npmjs.com/package/js-undo-redo)
[![Build Status](https://github.com/vizapata/js-undo-redo/actions/workflows/node.js.yml/badge.svg)](https://github.com/vizapata/js-undo-redo/actions)

# js-undo-redo
A basic javascript library to enable undo/redo features based on Command Pattern

## Install

```
$ npm install --save js-undo-redo
```

## Usage

The following is a basic example to update a state variable. It demonstrates how to use the three available operations: execute, undo, redo. 

```
const jsUndoRedo = require("js-undo-redo")
// Other alternatives:
// import * as jsUndoRedo from 'js-undo-redo'
// import { Action, status, undoRedoManager } from 'js-undo-redo'

let stateValue = 0
const addValue = function(val){
    stateValue += val
}
const removeValue = function(val){
    stateValue -= val
}

jsUndoRedo.undoRedoManager.execute(new jsUndoRedo.Action(addValue, removeValue, 5))
console.log(stateValue, jsUndoRedo.status.canUndo, jsUndoRedo.status.canRedo) // 5, true, false

jsUndoRedo.undoRedoManager.execute(new jsUndoRedo.Action(removeValue, addValue, 3))
console.log(stateValue, jsUndoRedo.status.canUndo, jsUndoRedo.status.canRedo) // 2, true, false

jsUndoRedo.undoRedoManager.undo()
console.log(stateValue, jsUndoRedo.status.canUndo, jsUndoRedo.status.canRedo) // 5, true, true

// You can use lambda expressions as well. Remember add the reverse operation
jsUndoRedo.undoRedoManager.execute(new jsUndoRedo.Action(
    (x) => { stateValue += 2*x },
    (x) => { stateValue -= 2*x },
    4 
))
console.log(stateValue, jsUndoRedo.status.canUndo, jsUndoRedo.status.canRedo) // 13, true, false

jsUndoRedo.undoRedoManager.undo()
console.log(stateValue, jsUndoRedo.status.canUndo, jsUndoRedo.status.canRedo) // 5, true, true

jsUndoRedo.undoRedoManager.redo()
console.log(stateValue, jsUndoRedo.status.canUndo, jsUndoRedo.status.canRedo) // 13, true, false

jsUndoRedo.undoRedoManager.undo()
jsUndoRedo.undoRedoManager.undo()
console.log(stateValue, jsUndoRedo.status.canUndo, jsUndoRedo.status.canRedo) // 0, false, true

```

## API

The library uses the Command Pattern to keep a track on the commands executed. So each action executed must have an equivalent reverse action.

The js-undo-redo library has the following objects:

- `Action`: A class that contains the action to be executed, the reverse action and the value used as parameter to execute any of them. The execute method expects to be an instance of this.
- `status`: An object with two boolean properties that indicate in any moment if is possible to execute the undo/redo actions. `{canUndo, canRedo}`
- `undoRedoManager`: This object encapsulates the logic behind the Command Pattern keeping a track of executed operations. It has three methods:

  - `execute`: Executes the normal action. Note, the parameter must be an instance of Action.
  - `undo`: Executes the reverse operation of the current action.
  - `redo`: Re-executes the normal action of the last undo-ed action.
