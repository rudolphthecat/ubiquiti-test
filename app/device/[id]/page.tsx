"use client"

import { useRouter } from 'next/navigation'
import { useContext, useEffect } from "react";
import styles from "@/app/device/[id]/device.module.css";
import { State } from "@/app/device-provider";
import { DeviceContext } from "@/app/device-provider";
import { indexOf, find } from "lodash";
import Link from "next/link";
import { Lato } from "next/font/google";

const latoBold = Lato({
    weight: ['700'],
    subsets: ['latin']
});

export default function DeviceView({ params }: { params: { id: string } }) {
    const state = useContext<State>(DeviceContext);
    const router = useRouter();
    const devices = state.filteredDevices.length ? state.filteredDevices : state.data.devices;
    const currentDevice = find(devices, { id: params.id });
    const index = indexOf(devices, currentDevice);
    const device = devices[index];
    useEffect(() => {
        if (!device) {
            router.push("/")
        }
    }, []);

    if (!device) return null;

    const prevDevice = devices[index - 1] || devices[devices.length - 1];
    const nextDevice = devices[index + 1] || devices[0];

    return (
        <div className={styles.page}>
            <div className={styles.buttons}>
                <div>
                    {/*<Link href="/">{"<"} Back</Link>*/}
                    <a href="" onClick={(e) => {
                        e.preventDefault();
                        return router.back()
                    }}>{"<"} Back</a>
                </div>
                <div className={styles.prevnext}>
                    <Link href={`/device/${prevDevice.id}`}>{"<"}</Link>
                    <Link href={`/device/${nextDevice.id}`}>{">"}</Link>
                </div>
            </div>
            <div className={styles.data}>
                <div className={styles.device}>
                    <img
                        src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${512}&q=75`}
                        alt=""
                        width="256"
                        height="256"
                    />
                    <div className={styles.params}>
                        <h2 className={latoBold.className}>{device.product.name}</h2>
                        <h3>{device.line.name}</h3>
                        <div>
                            <span className={latoBold.className}>Product Line</span>
                            <span>{device.line.name}</span>
                        </div>
                        <div>
                            <span className={latoBold.className}>ID</span>
                            <span>{device.line.id}</span>
                        </div>
                        <div>
                            <span className={latoBold.className}>Name</span>
                            <span>{device.product.name}</span>
                        </div>
                        <div>
                            <span className={latoBold.className}>Short Name</span>
                            <span>{device.shortnames[0]}</span>
                        </div>
                        {device.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond ? <div>
                            <span className={latoBold.className}>Speed</span>
                            <span>{device.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond} Mbps</span>
                        </div> : null}
                        <a
                            className={latoBold.className}
                            href="https://static.ui.com/fingerprint/ui/public.json"
                            target="_blank"
                        >
                            See All Details as JSON
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
