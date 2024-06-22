import {useState, useLayoutEffect, RefObject} from 'react';

export type Dimension = [width: number, height: number];

const useDimensions = <T extends HTMLElement>(targetRef: RefObject<T>): Dimension => {
    const [dimensions, setDimensions] = useState<Dimension>([1, 1]);

    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (targetRef.current) {
                setDimensions([
                    targetRef.current.offsetWidth,
                    targetRef.current.offsetHeight,
                ]);
            }
        };

        // Initial dimension update
        updateDimensions();

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setDimensions([
                    entry.contentRect.width,
                    entry.contentRect.height
                ]);
            }
        };

        const observer = new ResizeObserver(handleResize);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [targetRef]);

    return dimensions;
};

export default useDimensions;
