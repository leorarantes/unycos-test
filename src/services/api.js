import axios from "axios";

const apiUrl = process.env.UNYCOS_API_URL;

function getConfig(key) {
    return {
        headers: {
            "x-mejor-key": key,
        },
    };
}

export async function getSliderInfo(apiKey) {
    const config = getConfig(apiKey);
    return await axios.get(apiUrl, config);
};

export function getUserInfo(token) {
    return {
        data: {
            name: "Teste",
            notifications: ["notification"]
        }
    };
};

export default {
    getSliderInfo,
    getUserInfo
}