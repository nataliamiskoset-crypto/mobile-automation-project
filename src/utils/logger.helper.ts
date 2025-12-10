import { action } from "./logger";

export function LogStep(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
        action(`Executing: ${propertyKey}(${args.join(", ")})`);
        return original.apply(this, args);
    };

    return descriptor;
}
