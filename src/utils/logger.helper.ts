import { action } from "./logger";

export function LogStep(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        action(`Executing: ${propertyKey} (${args.join(", ")})`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}
