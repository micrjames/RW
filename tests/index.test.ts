import { RW } from "../RW"

describe("Reading Files", () => {
   let rw: RW;
   let filename: string;
   describe("Without Reading", () => {
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
	  beforeAll(() => {
		 filename = __dirname + "/file.txt";
		 rw = new RW(filename);
	  });
	  test("Should exist.", () => {
		 expect(rw).not.toBeNull();
	  });
	  test.todo("Should not have a 'fd'");
	  test.todo("Should not have any 'stats'");
	  test.todo("Should not have any 'data'");
   });
});
	  /*
		  if(err === null) {
			 this._stats = stats;
			 fs.open(this.fileName, this.flag, (err, fd) => {
				if(err === null) {
				   this._fd = fd;
				} else if(err.code === 'ENONT') {
				   console.log("file does not exist");
				} else {
				   console.log("some other error: err.code");
				}
			 });
		  } else if(err.code === 'ENONT') {
			  // file does not exist
			  console.log("file does not exist");
		  } else {
			  // some other error: err.code
			  console.log("some other error: err.code");
		  }
	  */
