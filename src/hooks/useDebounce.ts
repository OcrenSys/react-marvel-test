import { useEffect, useState } from "react";

const useDebounce = (value: string | undefined = "", timer: number): string => {
    // Save a local copy of `value` in this state which is local to our hook
    const [state, setState] = useState<string>(value);

    useEffect(() => {
        // Set timeout to run after delay
        const handler = setTimeout(() => setState(value), timer);

        // clear the setTimeout listener on unMount
        return () => clearTimeout(handler);
    }, [value, timer]);

    return state;
};

export default useDebounce;