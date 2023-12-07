// AutoBind 데코레이터
// 사용하지않는 파라미터는 _ 기호로 나중에 사용할 수 있도록 암시
export function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
//# sourceMappingURL=autobind.js.map