import { useEffect, useState } from "react";
import { apiGet } from "../../../common/utils/web";
import { DeliveryUrlWithPort } from "../../../app/micro-services";

export const DelvieryPage = () => {
    const [ret, setRet] = useState<string>();

    useEffect(() => {
        apiGet(`${DeliveryUrlWithPort}`).then(setRet);
    }, []);

    return (
        <>
            <p>delivery page</p>
            {ret && <p>{ret}</p>}
        </>
    );
};
