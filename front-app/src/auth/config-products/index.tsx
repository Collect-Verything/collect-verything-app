import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SolutionSubscription } from "./type";
import { getUserListSolutionSub } from "./request"; // Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

// Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

export const ConfigProducts = () => {
    const user = useSelector((store: any) => store.authenticate);
    const [listSolutions, setListSolutions] = useState<SolutionSubscription[]>([]);

    useEffect(() => {
        getUserListSolutionSub(user.id_stripe).then(setListSolutions);
    }, []);

    if (listSolutions.length === 0) return <p>ConfigProducts page</p>;

    return (
        <>
            <p>Ici</p>
            {listSolutions.map((sub) => (
                <p key={sub.id}> id : {sub.id}</p>
            ))}
        </>
    );
};
