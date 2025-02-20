import React, {useEffect, useState} from "react";
import {apiGet} from "../../common/utils/web";
import {useSelector} from "react-redux";
import {SolutionSubscription} from "./type";

// Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

export const ConfigProducts = () => {
    const user = useSelector((store: any) => store.authenticate);
    const [listSolutions, setListSolutions] = useState<SolutionSubscription[]>([]);

    useEffect(() => {
        apiGet(`3004/subscription/${user.id_stripe}`).then(setListSolutions)
    }, []);

    if (listSolutions.length === 0) return <p>ConfigProducts page</p>;

    return (
        <>
            <p>Ici</p>
            {listSolutions.map((sub) =>
               ( <p key={sub.id}> id : {sub.id}</p>)
            )}
        </>
    )
};
