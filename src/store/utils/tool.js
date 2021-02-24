import sizeof from 'object-sizeof';
//mock promise request

export function mock() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export function calculatedSize(data) {
  return sizeof(data);
}
