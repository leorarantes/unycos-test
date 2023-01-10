export default function getToken() {
    const token = localStorage.getItem("unycos-test-token");
    return token;
}