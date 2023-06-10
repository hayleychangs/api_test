const FetchData = async (url) => {
    const apiUrl = url;
    try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    };
};

export default FetchData;