import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";

import { apiGet } from "../../../../common/utils/web";
import { UserUrlWithPort } from "../../../../app/micro-services";
import { User } from "../../../../common/types/user";

const chartSize = { width: 240, height: 240 };

export const StatsGender: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const data: User[] = await apiGet(UserUrlWithPort);
                if (!cancelled) setUsers(data);
            } catch {
                if (!cancelled) setError("Impossible de récupérer les utilisateurs.");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const chartData = useMemo(() => {
        const male = users.filter((u) => u.gender === "Monsieur").length;
        const female = users.filter((u) => u.gender === "Madame").length;
        const total = male + female;

        if (total === 0) return null;

        const pct = (n: number) => Math.round((n / total) * 100);

        return [
            { label: "Hommes", value: pct(male) },
            { label: "Femmes", value: pct(female) },
        ];
    }, [users]);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!chartData) {
        return <Alert severity="warning">Aucune statistique de genre pour le moment.</Alert>;
    }

    return (
        <Box display="flex" flexDirection="column" p={2}>
            <Typography variant="h4" gutterBottom>
                Répartition des genres
            </Typography>

            <PieChart
                series={[
                    {
                        data: chartData,
                        arcLabel: ({ value }) => `${value}%`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: "60%",
                    },
                ]}
                sx={{ [`& .${pieArcLabelClasses.root}`]: { fontWeight: "bold" } }}
                {...chartSize}
            />
        </Box>
    );
};
