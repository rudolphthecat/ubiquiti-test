import type { Metadata } from "next";
import "./globals.css";
import { Lato } from 'next/font/google'
import styles from "@/app/header.module.css";
import DeviceProvider from "@/app/device-provider";
import { concat, uniq } from 'lodash';

const lato = Lato({
    weight: ['300'],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: "Ubiquiti devices",
    description: "test assignment",
};

export interface Device {
    id: number,
    line: {
        id: string,
        name: string
    },
    product: {
        name: string,
        abbrev: string
    },
    shortnames: string[],
    images: {
        default: string
    },
    unifi?: {
        network?: {
            ethernetMaxSpeedMegabitsPerSecond?: number
        }
    }
}

export interface APIResponse {
    devices: Device[],
    version: string
}

async function getDevices() {
    let res = await fetch('https://static.ui.com/fingerprint/ui/public.json');
    let json: APIResponse = await res.json()
    return json.devices
}

export default async function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {

    try {
        const devices = await getDevices();
        const lines = uniq(devices.map(device => device.line.name));

        return (
            <html lang="en">
            <body className={lato.className}>
            <div className={styles.header}>
                <svg className={styles.logo} width="40" height="40" viewBox="0 0 40 40" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3747 10H28.1249V11.2498H29.3747V10Z" fill="#50565E" />
                    <path
                        d="M25.0015 18.7532V16.2491L25.0022 16.2498H27.5011V18.7494H30V19.5417C30 20.4575 29.9221 21.5426 29.7431 22.3948C29.6428 22.871 29.4908 23.3443 29.3126 23.7989C29.1298 24.2639 28.9194 24.7094 28.6903 25.1086C28.3915 25.6298 28.0455 26.13 27.6442 26.6003L27.6229 26.6251L27.588 26.666C27.4916 26.7791 27.3962 26.891 27.2915 27.0001C27.1694 27.1304 27.0428 27.254 26.914 27.3776C25.3145 28.9179 23.2305 29.8802 21.0514 30.1011C20.7893 30.128 20.2628 30.1558 20 30.1558C19.7364 30.155 19.2107 30.128 18.9486 30.1011C16.7695 29.8802 14.6855 28.9172 13.086 27.3776C12.9572 27.254 12.8306 27.1304 12.7085 27.0001C12.5986 26.8862 12.4994 26.7694 12.3992 26.6513L12.3988 26.6509L12.3558 26.6003C11.9545 26.13 11.6085 25.6298 11.3097 25.1086C11.0806 24.7087 10.8701 24.2639 10.6874 23.7989C10.5092 23.3443 10.3572 22.871 10.2568 22.3948C10.0779 21.5419 10 20.4575 10 19.5417V10.1565H14.9985V18.7532C14.9985 18.7532 14.9985 19.4122 15.0067 19.6278L15.0086 19.6781V19.6784C15.0191 19.9574 15.0294 20.2306 15.0584 20.5025C15.1408 21.2745 15.3115 22.0069 15.6635 22.6262C15.7653 22.8051 15.8687 22.9789 15.9922 23.1436C16.744 24.1463 17.8883 24.8989 19.3156 25.1086C19.4855 25.1333 19.8285 25.155 20 25.155C20.1715 25.155 20.5144 25.1333 20.6844 25.1086C22.1117 24.8989 23.256 24.1463 24.0078 23.1436C24.1321 22.9789 24.2347 22.8051 24.3365 22.6262C24.6885 22.0069 24.8592 21.2745 24.9416 20.5025C24.9706 20.2301 24.9809 19.9563 24.9914 19.6769L24.9933 19.6278C25.0015 19.4122 25.0015 18.7532 25.0015 18.7532Z"
                        fill="#50565E"
                    />
                    <path
                        d="M25.6253 11.8751H27.5004L27.5004 13.7494H30V16.2491H27.5004L27.5004 13.7502H25.6253V11.8751Z"
                        fill="#50565E"
                    />
                </svg>
                <div className={styles.titles}>
                    <span>Devices</span>
                    <span>Lauris Nadzins</span>
                </div>
            </div>
            <DeviceProvider data={{ devices: devices, filters: lines }} filteredDevices={devices}>
                {children}
            </DeviceProvider>
            </body>
            </html>
        );
    } catch (e) {
        return (
            <html lang="en">
            <body className={`${lato.className} error`}>
            <h2>Something went wrong!</h2>
            <a href="/">
                <h3>Refresh the page to try again</h3>
            </a>
            </body>
            </html>
        )
    }
}
