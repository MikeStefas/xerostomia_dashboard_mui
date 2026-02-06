import { useState, useEffect } from "react";
import { DemographicData } from "../../demographics/types";
import { ViewDemographicData } from "../../demographics/api/view-demographic-data";

export const useFetchDemographicData = (userID: number) => {
    const [demographicData, setDemographicData] = useState<DemographicData | null>(null);
    const [editingMode, setEditingMode] = useState(false);

    // Fetch demographic data when user changes
    useEffect(() => {
        const fetchDemographicData = async () => {
            const demographicData = await ViewDemographicData(
                userID
            );
            setDemographicData(demographicData);
        };
        fetchDemographicData();
    }, [userID]);

    return { demographicData, setDemographicData, editingMode, setEditingMode };
}