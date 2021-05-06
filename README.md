[![npm version](https://img.shields.io/npm/v/js-undo-redo.svg)](https://www.npmjs.com/package/js-undo-redo)
[![Build Status](https://github.com/vizapata/js-undo-redo/actions/workflows/node.js.yml/badge.svg)](https://github.com/vizapata/js-undo-redo/actions)

# js-undo-redo
A basic javascript library to enable undo/redo features based on Command Pattern

## Install

```
$ npm install --save js-undo-redo
```

## Basic example

The following is a basic example to update a state variable. It demonstrates how to use the three available operations: execute, undo, redo. 

```
const jsUndoRedo = require("js-undo-redo")

let stateValue = 0
const addValue = function(val){
    stateValue += val
}
const removeValue = function(val){
    stateValue -= val
}

jsUndoRedo.execute(addValue, removeValue, 5)
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 5, true, false

jsUndoRedo.undo()
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 0, false, true

jsUndoRedo.redo()
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 5, true, false

```

## Advanced example

This example demonstrates the following features:
- A new executed operation clears any undo-ed actions and they cannot be redo-ed
- You can pass lambda functions as parameters too
- You cannot undo/redo beyond the saved actions
- The `status` property can be used instead of getters (`canUndo`, `canRedo`) to integrate with reactive apps (like Vue, React, etc)

```
const jsUndoRedo = require("js-undo-redo")

let stateValue = 0
const addValue = (val) => stateValue += val
const removeValue = (val) => stateValue -= val

jsUndoRedo.execute(addValue, removeValue, 5)
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 5, true, false

jsUndoRedo.execute(removeValue, addValue, 3)
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 2, true, false

jsUndoRedo.undo()
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 5, true, true

// You can use lambda expressions as well.
jsUndoRedo.execute(
    (x) => { stateValue += 2*x },
    (x) => { stateValue -= 2*x },
    4 
)
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 13, true, false

jsUndoRedo.undo()
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 5, true, true

jsUndoRedo.redo()
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 13, true, false

jsUndoRedo.undo()
jsUndoRedo.undo()
console.log(stateValue, jsUndoRedo.canUndo, jsUndoRedo.canRedo) // 0, false, true

console.log(jsUndoRedo.status) // {canUndo: false, canRedo: true}

```

## API

The library encapsulates the logic behind the Command Pattern to keep a track of executed operations. It has the following functions/properties:

- `execute(action, reverseAction, parameter)`: Executes the normal action. Note that you must provide the reverse action. The parameters are passed to both functions when executed.
- `undo()`: Executes the reverse operation of the current action.
- `redo()`: Re-executes the normal action of the last undo-ed action.
- `status`: An object with two boolean properties that indicate in any moment if is possible to execute the undo/redo actions. `{canUndo, canRedo}`
- `canUndo`: A getter for `status.canUndo`
- `canRedo`: A getter for `status.canRedo`
