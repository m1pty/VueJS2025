const blacklist = [
    "Russia",       "Belarus",
    "Afghanistan",  "China",
    "Venezuela",    "Iran"
];

const ipAddresses = [
    "8.8.8.8",      "999.999.999.999",
    "123.45.67.89", "146.120.13.0",
    "151.2.13.1"
];

async function checkIPAddresses(ipAddresses) {
    try {
        for (const ip of ipAddresses) {
            if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ip)){
                console.log(`[ERROR] Invalid IP address format (${ip})`);
                continue;
            }

            let resp = await fetch(
                `https://json.geoiplookup.io/${ip}`
            ).then(resp => resp.json());
            
            if (!resp.success) throw new Error(resp.error);
            if (blacklist.includes(resp.country_name)){
                console.log(`Our services are not available in your country (${ip}, ${resp.country_name})`);
            } else {
                console.log(`Welcome to our website! (${ip}, ${resp.country_name})`);
            }
        }
    } catch (error) {
        console.log(`[ERROR] ${error.message}`);
    }
}

checkIPAddresses(ipAddresses);