import { useEffect } from "react";

/*
 * TODO : Trouver le moyen a chaque rechargement d'une page d'appliquer une recuperation du toekn qui comporte les informations du user actuellement connect
 *  Si le token est present alors l'auth slice est rechargé avec ses information ,si token non present il est redirigé sir la home page du site
 * */

const useAuthCheck = () => {
    // const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(checkToken());
    }, []);
};

export default useAuthCheck;
