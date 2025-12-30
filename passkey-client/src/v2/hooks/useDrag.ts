/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
  Copied from https://codesandbox.io/p/sandbox/draggable-div-element-react-hook-56xrm
*/
// @ts-nocheck

import { useCallback, useEffect, useRef, useState } from "react";

export const useDrag = ({
  ref,
  calculateFor = "topLeft",
  boundLimit = "topLeft",
}: {
  ref: React.RefObject<any>;
  calculateFor?: "topLeft" | "bottomRight";
  boundLimit?: "topLeft" | "free" | "allCorners";
}) => {
  const [dragInfo, setDragInfo] = useState<
    | {
        startX: number;
        startY: number;
        top: number;
        left: number;
        width: number;
        height: number;
      }
    | undefined
  >(undefined);
  const [finalPosition, setFinalPosition] = useState<
    | {
        x: number;
        y: number;
      }
    | undefined
  >(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const updateFinalPosition = useCallback(
    (width: number, height: number, x: number, y: number) => {
      if (calculateFor === "bottomRight") {
        setFinalPosition({
          x: Math.max(
            Math.min(
              window.innerWidth - width,
              window.innerWidth - (x + width)
            ),
            0
          ),
          y: Math.max(
            Math.min(
              window.innerHeight - height,
              window.innerHeight - (y + height)
            ),
            0
          ),
        });

        return;
      }

      setFinalPosition({
        x:
          boundLimit === "free"
            ? x
            : boundLimit === "topLeft"
            ? Math.min(Math.max(0, x))
            : Math.min(Math.max(0, x), window.innerWidth - width),
        y:
          boundLimit === "free"
            ? y
            : boundLimit === "topLeft"
            ? Math.min(Math.max(0, y))
            : Math.min(Math.max(0, y), window.innerHeight - height),
      });
    },
    [calculateFor, boundLimit]
  );

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      const { current: draggableElement } = ref;

      if (!draggableElement) {
        return;
      }

      const { top, left, width, height } =
        draggableElement.getBoundingClientRect();

      setIsDragging(true);
      isDraggingRef.current = true;
      setDragInfo({
        startX: clientX,
        startY: clientY,
        top,
        left,
        width,
        height,
      });
    },
    [ref]
  );

  const handleMouseUp = (evt: MouseEvent) => {
    if (isDraggingRef.current) {
      evt.preventDefault();
    }
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  const handleMouseDown = (
    evt: MouseEvent | React.MouseEvent<HTMLDivElement>
  ) => {
    const target = evt.target as HTMLElement;

    const isInteractiveElement = target.closest(
      'button, a, input, select, textarea, [role="button"], [tabindex]'
    );

    if (isInteractiveElement) {
      return;
    }

    evt.preventDefault();
    const { clientX, clientY } = evt;
    startDrag(clientX, clientY);
  };

  const handleTouchStart = (
    evt: TouchEvent | React.TouchEvent<HTMLDivElement>
  ) => {
    const target = evt.target as HTMLElement;
    const { current: draggableElement } = ref;

    if (!draggableElement) {
      return;
    }

    const windowHeader = draggableElement.querySelector(".window-header");
    const isInWindowHeader = windowHeader && windowHeader.contains(target);

    if (!isInWindowHeader) {
      return;
    }

    const isInteractiveElement = target.closest(
      'button, a, input, select, textarea, [role="button"], [tabindex]'
    );

    if (isInteractiveElement) {
      return;
    }

    evt.preventDefault();
    const touch = evt.touches[0];
    if (touch) {
      startDrag(touch.clientX, touch.clientY);
    }
  };

  const handleMouseMove = useCallback(
    (evt: MouseEvent) => {
      const { current: draggableElement } = ref;

      if (!isDragging || !draggableElement) return;

      evt.preventDefault();

      const { clientX, clientY } = evt;

      const position = {
        x: dragInfo?.startX - clientX,
        y: dragInfo?.startY - clientY,
      };

      const { top, left, width, height } = dragInfo ?? {};

      updateFinalPosition(width, height, left - position.x, top - position.y);
    },
    [isDragging, dragInfo, ref, updateFinalPosition]
  );

  const handleTouchMove = useCallback(
    (evt: TouchEvent) => {
      if (!isDraggingRef.current) {
        return;
      }

      const { current: draggableElement } = ref;
      if (!draggableElement) return;

      evt.preventDefault();

      const touch = evt.touches[0];
      if (!touch) return;

      const { clientX, clientY } = touch;

      const position = {
        x: dragInfo?.startX - clientX,
        y: dragInfo?.startY - clientY,
      };

      const { top, left, width, height } = dragInfo ?? {};

      updateFinalPosition(width, height, left - position.x, top - position.y);
    },
    [dragInfo, ref, updateFinalPosition]
  );

  const handleTouchCancel = (evt: TouchEvent) => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  const handleTouchEnd = useCallback((evt: TouchEvent) => {
    if (isDraggingRef.current) {
      evt.preventDefault();
    }
    setIsDragging(false);
    isDraggingRef.current = false;
  }, []);

  const recalculate = (width: number, height: number) => {
    const { current: draggableElement } = ref;
    const {
      top,
      left,
      width: boundingWidth,
      height: boundingHeight,
    } = draggableElement.getBoundingClientRect();

    updateFinalPosition(
      width ?? boundingWidth,
      height ?? boundingHeight,
      left,
      top
    );
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    document.addEventListener("touchcancel", handleTouchCancel, {
      passive: false,
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [handleMouseMove, handleTouchMove, handleTouchEnd, handleTouchCancel]);

  return {
    position: finalPosition,
    handleMouseDown,
    handleTouchStart,
    recalculate,
  };
};
