import auth from "@/store/mobx/auth";
import { reaction } from "mobx";
import { useEffect, useState } from "react";

export default function useLoadStores() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cleanup = reaction(
      () => auth.isHydrated,
      (isHydrated) => {
        setLoaded(isHydrated);
      },
      { fireImmediately: true }
    );

    return cleanup();
  }, []);

  return loaded;
}
