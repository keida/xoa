//mock promise request

export function mock() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}


