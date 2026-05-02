import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface SettingsContextValue {
  dataSaver: boolean;
  setDataSaver: (v: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  dataSaver: false,
  setDataSaver: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [dataSaver, setDataSaverState] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("data-saver");
    if (saved !== null) {
      setDataSaverState(saved === "true");
    } else {
      // Check browser setting as default
      const browserSetting = typeof navigator !== 'undefined' && (navigator as any).connection?.saveData;
      setDataSaverState(!!browserSetting);
    }
  }, []);

  const setDataSaver = (v: boolean) => {
    setDataSaverState(v);
    localStorage.setItem("data-saver", v.toString());
  };

  return (
    <SettingsContext.Provider value={{ dataSaver, setDataSaver }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
