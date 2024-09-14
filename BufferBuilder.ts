export class BufferBuilder {
   private _size: number;
   private buffers: Array<Buffer>;
   private _buffer!: Buffer;
   constructor(size: number) {
	  this._size = size;
	  this.buffers = new Array<Buffer>();
   }

   append(buff: Buffer): BufferBuilder {
	  this.buffers.push(buff);
	  this._size -= buff.length;
	  return this;
   }

   build() {
	  const zeroBuffer = Buffer.alloc(this._size);
	  this.buffers.push(zeroBuffer);
	  this._buffer =  Buffer.concat(this.buffers);
   }

   get size(): number {
	  return this._size;
   }
   get buffer(): Buffer {
	  return this._buffer;
   }
}
