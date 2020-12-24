## Blocking IO and Non Blocking IO

* Blocking IO does not allow other tasks to be handled while the code is
'waiting' on an IO cycle. 
* Non Blocking IO allows an app to do other things while waiting.
    * Node creates an 'Event Loop' that keeps running and checking if there
    is a task awaiting processing. 
    * Adds that tasks to a 'TODO' loop. 
    * It moves things out of its own way because keeps it's threads free. 

NOTE: This allows natural async functionality to be written into Node apps,
because of its in-built task queue. 


## Module System 

`var lib = require('./lib')`

* Assigns the contents of this file and assigns it to a variable. 

`module.exports = whatever`

* Declares what should be exported when that module is exported. 

** This structure forms the dependency tree and then runs the app as it goes
through the files and loads the entire application memory. 


## What does Node's script processor do? 

1. Reads the entry file. 
2. Reads all the files connected by the dependency tree. 
3. Starts exec of sync tasks in those files
4. Starts processing the task queue (event loop) to deal with async tasks. 


## REPL - Read Eval Print Loop 

It is an interactive JS runtime. It is the node 'interpreter shell'. 
