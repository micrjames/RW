# RW
A class wrapper for Readable and Writable code.

## Table Of Contents
* [General Info](#general-info)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)

## General Info
Written as part of another project to write and read JSON files (as well as plain text files).

## Technologies Used
I'm only using plain, vanilla Typescript with the *Node.js* libraries *Buffer* and *fs*.

## Features
* Read the *stats* of the file that has been read.
* Check whether the file *exists*.
* *Open* the file and get a *file descriptor*.
* Use the *file descriptor* and *read* the data from the file into a *buffer*.
* Use the *file descriptor* to write data from a *buffer* into a file.

## Setup
Import the *RW* class into your project.

## Usage
Declare an instance of the class and a filename, which we will open.
```
let rw: RW;
let filename: string;
```
Then, we must instantiate the class, and specify the *filename* through its fully qualified *path*. We must always specify the buffer size, here, *buffSize*, which is typed as a *number*.
```
filename = path.join(__dirname, "/file_read.txt");
rw = new RW(buffSize, filename);
```
Above, in the class constructor, we have opened the file given by the filename. We receive the file descriptor, *fd*. It is an identifier used to specify with which we'd like to worth. The *fd* is used internally to read and write the data to/from the file that has been opened.
```
rw.read();
```
Using the *read* method, we have obtained the *data*, which is *Buffer-typed*. Then, we can use this *data* as we see fit.
```
const buffer = rw.data;
```
By use of the *toString* method of the *Buffer* class we can have access to the contents of the *buffer*.
As for writing data to a file, we have the *write* method to do so. Below, we write our string, *text*, to a *Buffer-typed* variable, buffer. Then, we must write that buffer to the setter *data*. Now, in a similar fashion to the *read* method, we, then, write the data to the file passed to the class constructor.
```
const buffer = Buffer.from(text);
rw.data = buffer;
rw.write();
```
In addition to these necessary methods, we can also read the *stats* of the file, a fs.Stats type, and whether it *exists*, which returns a boolean value.
```
rw.exists
rw.stats
```
The *stats* object holds many important pieces of information about the file such as its size. More information can be found [here](https://nodejs.org/api/fs.html#class-fsstats).
Once we have sufficiently used the *file descriptor*, we can remove it from those available to us. We do this through the *close* method.
```
rw.close();
```

## Project Status
As this code is intended to be a part of a project in itself, this project is still in progress and will be until that project is completed. 

## Room for Improvement
The areas where there may be some room for improvement are those where features may be added and the properties may be accessed differently.

## Contact
Feel free to contact me @michaelrjamesjr on twitter.
