import { RW } from "../RW"
import { BufferBuilder } from "../BufferBuilder";
import { utils } from "./utils";
import { Buffer } from "node:buffer";
import path from "path";

describe("Reading & Writing", () => {
   let rw: RW;
   let filename: string;
   describe("A Text File", () => {
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
		 test("Should be closed.", () => {
			const fd = rw.close();
			expect(fd).toBeUndefined();
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
   describe("A JSON File", () => {
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
		 let newBuffer: Buffer;
		 beforeAll(() => {
			buffSize = 149;
			const json = [{"first_name":"John","last_name":"Hancock","username":"jhancock","password":"p4sswOrd","confirm_password":"p4sswOrd","email":"jhancock@domain.com"}];
			const jsonBuffer = Buffer.from(JSON.stringify(json))
			newBuffer = Buffer.from(jsonBuffer);
			filename = path.join(__dirname, "/users/users.json");
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
			const isEqual = utils.areBuffersEqual(rw.data, newBuffer);
			expect(isEqual).toBeTruthy();
		 });
	  });
	  describe("With Writing", () => {
		 let buffSize: number;
		 let newBuffer: Buffer;
		 let json: [{
			first_name: string;
			last_name: string;
			username: string;
			password: string;
			confirm_password: string;
			email: string;
		 }];
		 let data: Buffer;
		 beforeAll(() => {
			buffSize = 149;
			json = [{"first_name":"John","last_name":"Hancock","username":"jhancock","password":"p4sswOrd","confirm_password":"p4sswOrd","email":"jhancock@domain.com"}];
			const jsonBuffer = Buffer.from(JSON.stringify(json))
			newBuffer = Buffer.from(jsonBuffer);
			filename = path.join(__dirname, "/users/users.json");
			rw = new RW(buffSize, filename);
			rw.data = Buffer.from(jsonBuffer);
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
			data = rw.data;
			const isEqual = utils.areBuffersEqual(rw.data, newBuffer);
			expect(isEqual).toBeTruthy();
		 });
		 test("Should be the object.", () => {
			const dataJSON = JSON.parse(data.toString());
			expect(dataJSON).toEqual(json);
		 });
	  });
   });
});
