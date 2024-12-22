const MOCK_DATA = [
    {
        "TagName": "WhyanbeelWTP.WHYLT5500_PV1",
        "Units": "%",
        "Description": "LT5500 Treated Water Reservoir Level",
        "DateTime": "2024-12-19T14:06:00.0000000Z",
        "Value": 85.0437436785017
    },
    {
        "TagName": "MossmanWTP.MOSLT5133_PV1",
        "Units": "%",
        "Description": "LT5133 Clearwell Mossman Reservoir Level",
        "DateTime": "2024-12-20T03:54:00.0000000Z",
        "Value": 94.9312545157768
    },
    {
        "TagName": "MossmanWTP.MOSLT5132_PV1",
        "Units": "%",
        "Description": "LT5132 Clearwell Port Douglas Reservoir Level",
        "DateTime": "2024-12-20T03:54:15.0000000Z",
        "Value": 92.8984355926514
    },
    {
        "TagName": "DWTP.DAILT5175_PV1",
        "Units": "%",
        "Description": "LT5175 Treated Water Reservoir Level",
        "DateTime": "2024-12-20T03:54:30.0000000Z",
        "Value": 89.1531181335449
    }
]


export async function fetchDouglasWebsiteData({
    url = 'https://www.odasa.com.au/douglas-website-data',
    mock = false,
}) {
    if (mock){
        return MOCK_DATA;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
}
