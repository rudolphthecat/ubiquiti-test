"use client"

import { useContext } from "react";
import styles from "@/app/page.module.css";
import { DeviceContext } from "@/app/device-provider";
import { indexOf, find } from "lodash";

export default function Device({ params }: { params: { id: string } }) {
    const data = useContext(DeviceContext);
    const device = find(data, { id: params.id });
    const index = indexOf(data, device);
    console.log('index', index);
    return (
        <div className={styles.page}>
            <p>Device: {params.id}</p>
            <p>Index: {index}</p>
        </div>
    )
}
