import React, {useState} from "react";
import "../views/Chart.css";
import { Box, Button, Container, Slider } from "@mui/material";


const Chart = ( { processedData, onDataChange }) => {
    const dailyRankingData = processedData;

    const [currentSortOrder, setCurrentSortOrder] = useState("asc");
    const [currentSortBy, setCurrentSortBy] = useState("amount");
    const [sortedData, setSortedData] = useState(dailyRankingData);
    const [volValue, setVolValue] = useState([20,100]);
    const [amountValue, setAmountValue] = useState([69,100]);
    const [volText, setVolText] = useState(["1000","1000萬"]);
    const [amountText, setAmountText] = useState(["10億","1000億"]);
    const [volFilterNum, setVolFilterNum] = useState([100000,10000000]);
    const [amountFilterNum, setAmountFilterNum] = useState([1,100000000000]);
    const [showPopup, setShowPopup] = useState(false);

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

    const RenderContent = () => {
        const content = [];

        if (sortedData.length === 0) {
            return (
              <div className="singleContent">
                <div className="stock">
                  <div className="noDataText">沒有符合資料</div>
                </div>
                <div className="rightCol">
                  <div className="trend">沒有符合資料</div>
                </div>
              </div>
            );
        };

        for (let i=0; i < sortedData.length; i++){
            let data = sortedData[i];
            const formattedAmount = (data.amount / 100000000).toFixed(1);
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
                        <div className="close" style={{ color: data.change > 0 ? "#C62828" : data.change < 0 ? "#2E7D32" : "#9E9E9E" }}>
                            {data.close}
                        </div>
                        <div className="change" style={{ color: data.change > 0 ? "#C62828" : data.change < 0 ? "#2E7D32" : "#9E9E9E", marginLeft: data.change === 0 ? "45px" : "30px" }}>
                            {data.change > 0 ? "▲" : data.change < 0 ? "▼" : ""}
                            <span> {Math.abs(data.change)}</span>
                        </div>
                        <div className="changePercent" style={{ color: data.change > 0 ? "#C62828" : data.change < 0 ? "#2E7D32" : "#9E9E9E", marginLeft: data.change === 0 ? "27px" : "20px"  }}>
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
                            {formattedAmount}億
                        </div>
                    </div>
                </div> 
            );
        };               
        return content;
    };

      
    const volMarks = [
        {
            value: 0,
            label: '1',
            text: "1",
            amount: 1,
        },
        {
            value: 9,
            label: '100',
            text: "100",
            amount: 100,
        },
        {
            value: 17,
            label: '',
            text: "500",
            amount: 500,
        },
        {
            value: 20,
            label: '1000',
            text: "1000",
            amount: 1000,
        },
        {
            value: 30,
            label: '',
            text: "5000",
            amount: 5000,
        },
        {
            value: 35,
            label: '1萬',
            text: "1萬",
            amount: 10000,
        },
        {
            value: 45,
            label: '',
            text: "5萬",
            amount: 50000,
        },
        {
            value: 50,
            label: '10萬',
            text: "10萬",
            amount: 100000,
        },
        {
            value: 68,
            label: '',
            text: "50萬",
            amount:500000,
        },
        {
            value: 75,
            label: '100萬',
            text: "1百萬",
            amount: 1000000,
        },
        {
            value: 100,
            label: '1000萬',
            text: "1千萬",
            amount: 10000000,
        },
    ];

    const amountMarks = [
        {
            value: 0,
            label: '1',
            text: "1",
            amount: 1,
        },
        {
            value: 26,
            label: '100萬',
            text: "1百萬",
            amount: 1000000,
        },
        {
            value: 40,
            label: '1000萬',
            text: "1千萬",
            amount: 10000000,
        },
        {
            value: 49,
            label: '',
            text: "5千萬",
            amount: 50000000,
        },
        {
            value: 53,
            label: '1億',
            text: '1億',
            amount: 100000000,
        },
        {
            value: 65,
            label: '',
            text: '5億',
            amount: 500000000,
        },
        {
            value: 69,
            label: '10億',
            text: '10億',
            amount: 1000000000,
        },
        {
            value: 80,
            label: '',
            text: '50億',
            amount: 5000000000,
        },
        {
            value: 84,
            label: '100億',
            text: '100億',
            amount: 10000000000,
        },
        {
            value: 95,
            label: '',
            text: '500億',
            amount: 50000000000,
        },
        {
            value: 100,
            label: '1000億',
            text: '1000億',
            amount: 100000000000,
        },
    ];

    const handleVolValueChange = (event, newValue) => {
        setVolValue(newValue);

        const smallValue = newValue[0];
        const bigValue = newValue[1];

        let smallVolText = "";
        let bigVolText = "";

        let smallVolFilter = "";
        let bigVolFilter = "";

        for (let i = 0; i < volMarks.length; i++) {
            const mark = volMarks[i];
            if (smallValue === mark.value) {
                smallVolText = mark.text;
                smallVolFilter = mark.amount;
            };
            if (bigValue === mark.value) {
                bigVolText = mark.text;
                bigVolFilter = mark.amount;
            };
        };

        setVolText([smallVolText, bigVolText]);
        setVolFilterNum([smallVolFilter, bigVolFilter]);
    };

    const handleAmountValueChange = (event, newValue) => {
        setAmountValue(newValue);

        const smallValue = newValue[0];
        const bigValue = newValue[1];

        let smallAmountText = "";
        let bigAmountText = "";

        let smallAmountFilter = "";
        let bigAmountFilter = "";

        for (let i = 0; i < amountMarks.length; i++) {
            const mark = amountMarks[i];
            if (smallValue === mark.value) {
                smallAmountText = mark.text;
                smallAmountFilter = mark.amount;
            };
            if (bigValue === mark.value) {
                bigAmountText = mark.text;
                bigAmountFilter = mark.amount;
            };
        };

        setAmountText([smallAmountText, bigAmountText]);
        setAmountFilterNum([smallAmountFilter, bigAmountFilter]);
    };

    const handleFilterData = () =>{
        let volGte = volFilterNum[0];
        let volLte = volFilterNum[1];
        let amountGte = amountFilterNum[0];
        let amountLte = amountFilterNum[1];

        const newApiUrl = ``;
        
        onDataChange(newApiUrl);
    };

    return (
        <div>
            <Button variant="contained" sx={{ml:2, mt: 2 }} onClick={() => setShowPopup(true)}>篩選設定</Button>
            {showPopup && (
                <div>
                    <div className="overlay" onClick={() => setShowPopup(false)} />
                        <div className="popUpContainer">
                            <Container width={450} mx="auto">
                                <p className="text">
                                    成交量 {volText[0]} - {volText[1]}張
                                </p>
                                <Box width={300} mx="auto">
                                    <Slider
                                        value={volValue}
                                        onChange={handleVolValueChange}
                                        step={null}
                                        marks={volMarks}
                                    />        
                                </Box>
                                <p className="text">
                                    成交值 {amountText[0]} - {amountText[1]}元
                                </p>
                                <Box width={300} mx="auto">
                                    <Slider
                                        value={amountValue}
                                        onChange={handleAmountValueChange}
                                        step={null}
                                        marks={amountMarks}
                                    />        
                                </Box>
                                <Button variant="contained" sx={{width: "280px", ml: 2, mt: 1 }} onClick={handleFilterData}>確認</Button>
                            </Container>
                    </div>    
                </div>
            )}
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
                       <RenderContent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;