import { RW } from "../RW"
import { BufferBuilder } from "../BufferBuilder";
import { utils } from "./utils";
import { Buffer } from "node:buffer";
import path from "path";

describe("Reading & Writing  Files", () => {
   let rw: RW;
   let filename: string;
   describe("Without Reading or Writing", () => {
	  beforeAll(() => {
		 rw = new RW();
	  });
	  test("Should exist.", () => {
		 expect(rw).not.toBeNull();
	  });
	  test("Should not have a 'fd'", () => {
		 expect(rw.fd).toBe(-1);
	  });
	  test("Should not have any 'stats'", () => {
		 expect(rw.stats).toBeNull();
	  });
	  test("Should not have any 'data'", () => {
		 expect(rw.data).toBeNull();
	  });
   });
   describe("With Reading", () => {
	  let buffSize: number;
	  let newBuffer: BufferBuilder;
	  beforeAll(() => {
		 buffSize = 100;
		 newBuffer = new BufferBuilder(buffSize);
		 newBuffer.append(Buffer.from("Hello, World!")).append(utils.newlineBuffer);
		 filename = path.join(__dirname, "/file_read.txt");
		 rw = new RW(buffSize, filename);
		 rw.read();
	  });
	  test("Should exist.", () => {
		 expect(rw).not.toBeNull();
	  });
	  test("Should have a file that exists.", () => {
		 expect(rw.exists).toBeTruthy();
	  });
	  test("Should have a 'fd'", () => {
		 expect(rw.fd).not.toBe(-1);
	  });
	  test("Should have 'stats'", () => {
		 expect(rw.stats).not.toBeNull();
	  });
	  test("Should have 'data'", () => {
		 newBuffer.build();
		 const isEqual = utils.areBuffersEqual(rw.data, newBuffer.buffer);
		 expect(isEqual).toBeTruthy();
	  });
   });
   describe("With Writing", () => {
	  let buffSize: number;
	  let newBuffer: BufferBuilder;
	  beforeAll(() => {
		 buffSize = 100;
		 newBuffer = new BufferBuilder(buffSize);
		 newBuffer.append(Buffer.from("Hello, World!!!"));
		 filename = path.join(__dirname, "/file_write.txt");
		 rw = new RW(buffSize, filename);
		 rw.data = Buffer.from("Hello, World!!!");
		 rw.write();
	  });
	  test("Should exist.", () => {
		 expect(rw).not.toBeNull();
	  });
	  test("Should have a file that exists.", () => {
		 expect(rw.exists).toBeTruthy();
	  });
	  test("Should have a 'fd'", () => {
		 expect(rw.fd).not.toBe(-1);
	  });
	  test("Should have 'stats'", () => {
		 expect(rw.stats).not.toBeNull();
	  });
	  test("Should have 'data'", () => {
		 rw.read();
		 newBuffer.build();
		 const isEqual = utils.areBuffersEqual(rw.data, newBuffer.buffer);
		 expect(isEqual).toBeTruthy();
	  });
   });
});
