"use client"

import styles from "./list.module.css";
import { Device } from "@/app/layout";
import { DeviceContext } from "@/app/device-provider";
import { Virtuoso } from 'react-virtuoso'
import { Lato } from 'next/font/google'
import Filters from "@/app/filters";
import { useState, useContext } from "react";
import Link from 'next/link'

export const viewTypes = {
    list: 0,
    grid: 1
}

const latoBold = Lato({
    weight: ['700'],
    subsets: ['latin']
});

type Props = {
    devices: Array<Device>
}

export default function ListComponent() {
    const [viewType, setViewType] = useState(viewTypes.list);
    const devices = useContext(DeviceContext);

    // TODO: move loader appropriately, render filters even if data is not present (or should it?)
    if (!devices.length) return <div>Loading...</div>

    return <>
        <Filters
            amount={devices.length}
            setViewType={setViewType}
            viewType={viewType}
        />
        {viewType === viewTypes.list ? <div className={styles.list}>
            <div className={`${styles.row} ${latoBold.className}`}>
                <span style={{ width: "20px", height: "20px" }} />
                <span className={styles.value}>Product line</span>
                <span className={styles.value}>Name</span>
            </div>
            <Virtuoso
                style={{ minHeight: '78.5vh' }}
                totalCount={devices.length}
                itemContent={i => {
                    const device = devices[i];
                    return (
                        <Link
                            className={`${styles.row} ${styles.data}`}
                            key={device.id}
                            href={`/device/${device.id}`}
                        >
                            <img
                                src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${640}&q=75`}
                                alt=""
                                width={20}
                                height={20}
                            />
                            <span className={styles.value}>
                                {device.line.name}
                            </span>
                            <span className={styles.value}>
                                {device.product.name}
                            </span>
                        </Link>
                    )
                }}
            />
        </div> : <div className={styles.grid}>
            {devices.map(device => (
                <Link
                    className={styles.block}
                    key={device.id}
                    href={`/device/${device.id}`}
                >
                    <div>
                        {device.line.name}
                    </div>
                    <img
                        src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${640}&q=75`}
                        alt=""
                        width={90}
                        height={90}
                    />
                    <div className={`${styles.name} ${latoBold.className}`}>
                        {device.product.name}
                    </div>
                    <div>
                        {device.product.abbrev}
                    </div>
                </Link>
            ))}
        </div>}
    </>;
}
