// import Image from "next/image";
import styles from "./page.module.css";
import Filters from "@/app/filters";
import List from "@/app/list";

export interface Device {
    id: number,
    line: {
        id: string,
        name: string
    },
    product: {
        name: string
    },
    shortnames: string[],
    images: {
        default: string
    }
}

export interface APIResponse {
    devices: Device[],
    version: string
}

async function getDevices() {
    let res = await fetch('https://static.ui.com/fingerprint/ui/public.json');
    let json: APIResponse = await res.json()
    // TODO: fail gracefully instead of a 404 page
    // if (json.devices) notFound()
    return json.devices
}

export default async function Home() {
    let devices = await getDevices();

    return (
        <div className={styles.page}>
            <Filters amount={devices.length} />
            <List devices={devices} />
        </div>
    );
}
