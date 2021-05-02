import { distinctUntilChanged } from "rxjs/operators";

export function distinctUntilArrayChanged<T>()
{
    return distinctUntilChanged<T[]>((p, c) => p != null && p.length === c.length && p.every(v => c.includes(v)))
}
