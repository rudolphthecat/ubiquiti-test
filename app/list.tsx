"use client"

import styles from "./list.module.css";
import { Device } from "@/app/page";
import { Virtuoso } from 'react-virtuoso'

type Props = {
    devices: Array<Device>
}

export default async function List({ devices }: Props) {
    console.log(devices);
    if (!devices.length) return <div>Loading...</div>

    return (
        <div className={styles.list}>
            <Virtuoso
                style={{ height: '800px' }}
                totalCount={devices.length}
                itemContent={i => <div key={devices[i].id}>
                    {i}
                    <img
                        src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${devices[i].id}%2Fdefault%2F${devices[i].images.default}.png&w=${640}&q=75`}
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>
                    {devices[i].line.name}
                </span>
                    <span>
                    {devices[i].product.name}
                </span>
                </div>}
            />
            {/*
            {devices.map(device => <div key={device.id}>
                <img
                    src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${640}&q=75`}
                    alt=""
                    width={20}
                    height={20}
                />
                <span>
                    {device.line.name}
                </span>
                <span>
                    {device.product.name}
                </span>
            </div>)}
            */}
        </div>
    );
}
