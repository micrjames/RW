export const utils = {
   areBuffersEqual: (buffer1: Buffer, buffer2: Buffer) => Buffer.compare(buffer1, buffer2) === 0,
   newlineBuffer: Buffer.from('\n')
};
