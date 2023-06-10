import React, {useState} from "react";
import "../views/Chart.css";

const Chart = (processedData) => {
    const dailyRankingData = processedData.processedData;

    const [currentSortOrder, setCurrentSortOrder] = useState("asc");
    const [currentSortBy, setCurrentSortBy] = useState("amount");
    const [sortedData, setSortedData] = useState(dailyRankingData);

    const headers = [
        { value: "close", title: "成交價" },
        { value: "change", title: "漲跌" },
        { value: "change_percent", title: "漲跌幅" },
        { value: "amplitude", title: "振幅" },
        { value: "open", title: "開盤" },
        { value: "high", title: "最高" },
        { value: "low", title: "最低" },
        { value: "volume", title: "成交量" },
        { value: "amount", title: "成交值" },
    ];

    const handleSort = (sortBy) => {
        const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
            setCurrentSortOrder(newSortOrder);
            setCurrentSortBy(sortBy);

        const newData = [...dailyRankingData].sort((a, b) => {
            if (currentSortOrder === "asc") {
                return  a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            };
        });

        setSortedData(newData);
    };

    const BuildContent = () => {
        const content = [];
        for (let i=0; i < sortedData.length; i++){
            let data = sortedData[i];
            content.push(
                <div className="singleContent" key={data.symbol}>
                    <div className="stock">
                        <div className="id">{data.id}</div>
                        <div className="name">{data.name}</div>
                    </div>
                    <div className="rightCol">
                        <div className="trend">
                            trend
                        </div>
                        <div className="close" style={{ color: data.change > 0 ? "#C62828" : "#2E7D32" }}>
                            {data.close}
                        </div>
                        <div className="change" style={{ color: data.change > 0 ? "#C62828" : "#2E7D32" }}>
                            {data.change > 0 ? "▲" : "▼"}
                            <span> {Math.abs(data.change)}</span>
                        </div>
                        <div className="changePercent" style={{ color: data.change > 0 ? "#C62828" : "#2E7D32" }}>
                            {data.change > 0 ? "+" : ""}
                            {data.change_percent.toFixed(2)}%
                        </div>
                        <div className="amplitude">
                            {data.amplitude.toFixed(2)}%
                        </div>
                        <div className="open">
                            {data.open.toLocaleString()}
                        </div>
                        <div className="high">
                            {data.high.toLocaleString()}
                        </div>
                        <div className="low">
                            {data.low.toLocaleString()}
                        </div>
                        <div className="vol">
                            {data.volume.toLocaleString()}
                        </div>
                        <div className="amount">
                            {data.amount}億
                        </div>
                    </div>
                </div> 
            );
        };               
        return content;
    };
    
    return (
        <div>
            <div className="chart">
                <div className="container">
                    <div className="subtitle">
                        <div 
                            className="stockName" 
                            onClick={() => handleSort("id")}
                            style={{color: currentSortBy === "id" && currentSortOrder === "desc" ? "#2E7D32" :
                                            currentSortBy === "id" && currentSortOrder === "asc" ? "#C62828" :
                                            "black"
                            }}
                        >
                            {currentSortBy === "id" && currentSortOrder === "desc" ? "股票↑" :
                                currentSortBy === "id" && currentSortOrder === "asc" ? "股票↓" :
                                "股票"
                            }
                        </div>
                        <div className="KLineTrend">
                            走勢
                        </div>
                        {headers.map((header) => (
                            <div
                                className="subtitleItem"
                                onClick={() => handleSort(header.value)}
                                style={{
                                    color:
                                    currentSortBy === header.value && currentSortOrder === "desc"
                                        ? "#2E7D32"
                                        : currentSortBy === header.value && currentSortOrder === "asc"
                                        ? "#C62828"
                                        : "black",
                                }}
                                key={header.value}
                            >
                            {currentSortBy === header.value && currentSortOrder === "desc"
                                ? `${header.title}↑`
                                : currentSortBy === header.value && currentSortOrder === "asc"
                                ? `${header.title}↓`
                                : header.title}
                            </div>
                        ))}
                    </div>
                    <div className="dailyStockRanking">
                       <BuildContent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;