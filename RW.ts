import fs from "fs";
import { Buffer } from "node:buffer";

export class RW {
   private _fd: number;
   private flag: string;
   private fileName: string;
   private _data: Buffer;
   private _stats: fs.Stats;
   private buffer: Buffer;
   constructor(buffSize: number = 0, fileName: (string | null) = null, append: boolean = false) {
	  this.flag = append ? 'a+' : 'r+'; 
	  // r+ : reading & writing; exception if file does not exist
	  // a+ : reading & appending; file created if not found
	  this.fileName = fileName;
	  this._data = null;
	  this._stats = this.readStats();
	  this._fd = this.open();
	  this.buffer = Buffer.alloc(buffSize);
   }
   readStats(): fs.Stats {
	  if(this.fileName)
		 return fs.statSync(this.fileName);
	  return null;
   }
   get exists(): boolean {
	  if(this._stats)
		 return this._stats.isFile() || this._stats.isDirectory(); 
	  return false;
   }
   open(): number {
	  if(this.exists)
		 return fs.openSync(this.fileName, this.flag);
	  return -1;
   }
   read(): number {
	  const numBytes = fs.readSync(this.fd, this.buffer);
	  this._data = this.buffer;
	  return numBytes;
   }
   get fd(): number {
	  return this._fd;
   }
   get data(): Buffer {
	  return this._data;
   }
   get stats(): fs.Stats {
	  return this._stats;
   }
}
