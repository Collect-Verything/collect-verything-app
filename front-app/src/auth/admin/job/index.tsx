import React, { useEffect, useState } from "react";
import { User } from "../../../common/types/user";
import { getAllJobbers } from "./request";

export const Job = () => {
    const [usersJob, setUsersJob] = useState<User[]>([]);

    useEffect(() => {
        getAllJobbers().then((res) => setUsersJob(res));
    }, []);

    return (
        <>
            <p>job page</p>
            {usersJob.map((user) => user.lastname)}
        </>
    );
};
