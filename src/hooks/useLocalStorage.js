import { useEffect, useState } from "react";

/**
 * Funciona como useState, pero guarda y recupera el valor de localStorage
 * bajo la clave indicada, para que sobreviva a recargas de página.
 */
function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(key);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch (error) {
      console.warn(`No se pudo leer "${key}" de localStorage:`, error);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valor));
    } catch (error) {
      console.warn(`No se pudo guardar "${key}" en localStorage:`, error);
    }
  }, [key, valor]);

  return [valor, setValor];
}

export default useLocalStorage;
