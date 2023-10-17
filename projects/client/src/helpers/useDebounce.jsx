import { useEffect } from "react";
import useTimeout from "./useTimeout";

function useDebounce(callback, dependencies, delay = 1000) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies], reset);
  useEffect(clear, []);
}

export default useDebounce;
