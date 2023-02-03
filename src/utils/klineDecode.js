import dayjs from 'dayjs';
import NP from 'number-precision';
/**使用https请求K线图数据的加密方法 */
export function intToBin(str) {
  let arraybuffer = new ArrayBuffer(4);
  let strView = new Int8Array(arraybuffer);
  for (let i = 3; i >= 0; i--) {
    strView[i] = (str >> (8 * i)) & 0xff;
  }
  return strView;
}

export function stringToBin(str, len) {
  let byte = new Uint8Array(len);
  let strArr = str.split('');
  for (let i = 0; i < len; i++) {
    if (i > strArr.length - 1) {
      byte[i] = 0;
    } else {
      byte[i] = strArr[i].charCodeAt();
    }
  }
  return byte;
}

export function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
export function base64ToFloat32(blob) {
  const fLen = blob.length / Float32Array.BYTES_PER_ELEMENT; // How many floats can be made, but be even
  const dView = new DataView(new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT)); // ArrayBuffer/DataView to convert 4 bytes into 1 float.
  const fAry = new Float32Array(fLen); // Final Output at the correct size
  let p = 0; // Position
  for (let j = 0; j < fLen; j++) {
    p = j * 4;
    dView.setUint8(0, blob.charCodeAt(p));
    dView.setUint8(1, blob.charCodeAt(p + 1));
    dView.setUint8(2, blob.charCodeAt(p + 2));
    dView.setUint8(3, blob.charCodeAt(p + 3));
    fAry[j] = dView.getFloat32(0, true);
  }
  return fAry;
}

export function base64ToInt(blob) {
  const fLen = blob.length / Int32Array.BYTES_PER_ELEMENT; // How many floats can be made, but be even
  const dView = new DataView(new ArrayBuffer(Int32Array.BYTES_PER_ELEMENT)); // ArrayBuffer/DataView to convert 4 bytes into 1 float.
  const fAry = new Int32Array(fLen); // Final Output at the correct size
  let p = 0; // Position
  for (let j = 0; j < fLen; j++) {
    p = j * 4;
    dView.setInt8(0, blob.charCodeAt(p));
    dView.setInt8(1, blob.charCodeAt(p + 1));
    dView.setInt8(2, blob.charCodeAt(p + 2));
    dView.setInt8(3, blob.charCodeAt(p + 3));
    fAry[j] = dView.getInt32(0, true);
  }
  return fAry;
}

//更新最后一条K线
export function updateBar(socketData, currentSymbol) {
  let newLastBar;
  // console.log(currentSymbol);
  const { precision, lastBar } = currentSymbol;
  if (!lastBar) return;
  let resolution = currentSymbol.resolution;
  let rounded = socketData.t;
  if (!isNaN(resolution) || resolution.includes('D')) {
    if (resolution.includes('D')) {
      resolution = 1440;
    }
    let coeff = resolution * 60;
    rounded = Math.floor(socketData.t / coeff) * coeff;
  } else if (resolution.includes('W')) {
    rounded =
      dayjs(socketData.t * 1000)
        .day(0)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .valueOf() / 1000;
  } else if (resolution.includes('M')) {
    rounded =
      dayjs(socketData.t * 1000)
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .valueOf() / 1000;
  }
  let lastBarSec = lastBar.time / 1000;
  if (rounded > lastBarSec) {
    // console.log('新建')
    newLastBar = {
      time: rounded * 1000,
      open: NP.round(socketData.b, precision),
      high: NP.round(socketData.b, precision),
      low: NP.round(socketData.b, precision),
      close: NP.round(socketData.b, precision),
    };
  } else {
    newLastBar = {
      time: lastBar.time,
      open: lastBar.open,
      high: NP.round(Math.max(lastBar.high, socketData.b), precision),
      low: NP.round(Math.min(lastBar.low, socketData.b), precision),
      close: NP.round(socketData.b, precision),
    };
  }
  // console.log('close',typeof(newLastBar.close),newLastBar.close)
  return newLastBar;
}
