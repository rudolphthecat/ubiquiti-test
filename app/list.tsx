"use client"

import styles from "./list.module.css";
import { Device } from "@/app/layout";
import { DeviceContext, State } from "@/app/device-provider";
import { Virtuoso } from 'react-virtuoso'
import { Lato } from 'next/font/google'
import Filters from "@/app/filters";
import { useState, useContext, useEffect } from "react";
import Link from 'next/link'
import { filter, forEach } from 'lodash';
import { useRouter, useSearchParams } from "next/navigation";

export const viewTypes = {
    list: 0,
    grid: 1
}

const latoBold = Lato({
    weight: ['700'],
    subsets: ['latin']
});

export default function ListComponent() {
    const [viewType, setViewType] = useState<number>(viewTypes.list);
    const [selectedLines, setSelectedLines] = useState<Array<string>>([]);
    const state = useContext<State>(DeviceContext);
    const { devices, filters } = state.data;
    const { setFilteredDevices } = state;
    const { filteredDevices } = state;
    const searchParams = useSearchParams()

    const search = searchParams.get('lines');
    const router = useRouter();

    useEffect(() => {
        setFilteredDevices(devices);
        const lines = search?.split(',');
        if (lines?.length && !selectedLines.length) {
            let validQueryParameters: string[] = [];
            lines.forEach(line => {
                if (filters.indexOf(line) !== -1) {
                    validQueryParameters.push(line);
                }
            });
            if (validQueryParameters.length) {
                setSelectedLines(validQueryParameters);
            }
        }
    }, []);

    useEffect(() => {
        let searchString = '';
        forEach(selectedLines, (line, i) => {
            searchString += line;
            if (i < selectedLines.length - 1) {
                searchString += ',';
            }
        });
        router.replace(searchString ? `/?lines=${encodeURIComponent(searchString)}` : '/');
        setFilteredDevices(selectedLines.length ? filter(devices, device => selectedLines.indexOf(device.line.name) !== -1) : devices);
    }, [selectedLines]);

    return <>
        <Filters
            amount={filteredDevices.length}
            setViewType={setViewType}
            viewType={viewType}
            selectedLines={selectedLines}
            setSelectedLines={setSelectedLines}
            lines={filters}
        />
        {viewType === viewTypes.list ? <div className={styles.list}>
            <div className={`${styles.row} ${latoBold.className}`}>
                <span style={{ width: "20px", height: "20px" }} />
                <span className={styles.value}>Product line</span>
                <span className={styles.value}>Name</span>
            </div>
            {!filteredDevices.length ? <div>Loading ...</div> :
                <Virtuoso
                    style={{ minHeight: '78.5vh' }}
                    totalCount={filteredDevices.length}
                    itemContent={i => {
                        const device = filteredDevices[i];
                        return (
                            <Link
                                className={`${styles.row} ${styles.data}`}
                                key={device.id}
                                href={`/device/${device.id}`}
                            >
                                <img
                                    src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${25}&q=75`}
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
                />}
        </div> : <div className={styles.grid}>
            {filteredDevices.map(device => (
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
                        {device.shortnames[0]}
                    </div>
                </Link>
            ))}
        </div>}
    </>;
}
