import React, { useState, useEffect } from "react";
import FetchData from "../queries/FetchData";
import Chart from "../views/Chart";

let processedData = [];

const BuildChart = () => {
    const jsonUrl = "";

    const [apiUrl, setApiUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleDataChange = (newApiUrl) => {
        setApiUrl(newApiUrl);
    };

    useEffect (() => {

        const dataProcess = (dailyRankData, stockNameData) => {
            const result = dailyRankData.map((item) => ({
                    id: item.symbol,
                    name: stockNameData[item.symbol],
                    close: item.close,
                    change: item.change,
                    change_percent: item.change_percent,
                    amplitude: item.amplitude,
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    volume: item.volume,
                    amount: item.amount,
            }));
            return result;
        };

        const getData = async () => {
            setIsLoading(true);
            try {
                const rankData = await FetchData(apiUrl);
                const jsonData = await FetchData(jsonUrl);
                processedData = dataProcess(rankData, jsonData);
            } catch (error) {
                console.error("failed to get data", error);
            } finally {
                setIsLoading(false);
            };
        };

        getData();

        return () => {
            getData();
        };

    }, [apiUrl]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    };

    return (
        <div>
            <Chart processedData={processedData} onDataChange={handleDataChange} />
        </div>
    )
};

export default BuildChart;