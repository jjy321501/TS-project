namespace App {
  // AutoBind 데코레이터
  // 사용하지않는 파라미터는 _ 기호로 나중에 사용할 수 있도록 암시
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
}
