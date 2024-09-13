import fs from "fs";

export class RW {
   private _fd: number;
   private flag: string;
   private fileName: string;
   private _data: string;
   private _stats: fs.Stats;
   constructor(fileName: (string | null) = null, append: boolean = false) {
	  this.flag = append ? 'a+' : 'r+'; 
	  // r+ : reading & writing; exception if file does not exist
	  // a+ : reading & appending; file created if not found
	  this.fileName = fileName;
	  this._data = null;
	  this._fd = -1;
	  this._stats = null;
   }
   readStats(): fs.Stats {
	  if(this.fileName)
		 this._stats = fs.statSync(this.fileName);
	  return this._stats;
   }
   get fd(): number {
	  return this._fd;
   }
   get data(): string {
	  return this._data;
   }
   get stats(): fs.Stats {
	  return this._stats;
   }
}
