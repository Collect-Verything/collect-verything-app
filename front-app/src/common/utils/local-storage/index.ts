import { Dispatch, SetStateAction } from "react";

export function setFromLocalStorage<T>(key: string, objectSetter: Dispatch<SetStateAction<T>>): void {
    try {
        const objectFromStorage = localStorage.getItem(key);

        if (objectFromStorage) {
            const parsedObject = JSON.parse(objectFromStorage) as T;

            if (parsedObject && typeof parsedObject === "object") {
                objectSetter(parsedObject);
            } else {
                console.warn(`La valeur pour la clé "${key}" n'est pas un objet valide.`);
            }
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération ou de l'analyse des données de "${key}":`, error);
    }
}
